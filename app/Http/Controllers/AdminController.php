<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Store;
use App\Models\StoreBalance;
use App\Models\StoreBalanceHistory;
use App\Models\WithDrawal;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class AdminController extends Controller
{
    public function dashboard()
    {
        $totalUsers = User::where('role', 'member')->count();
        $activeStores = Store::where('is_verified', true)->count();
        $pendingVerifications = Store::where('is_verified', false)->count();
        $totalSystemBalance = StoreBalance::sum('balance'); 

        $pendingRequests = Store::with('user')
            ->where('is_verified', false)
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'total_users' => $totalUsers,
                'active_stores' => $activeStores,
                'pending_verifications' => $pendingVerifications,
                'total_balance' => $totalSystemBalance,
            ],
            'pendingRequests' => $pendingRequests
        ]);
    }

    public function stores(Request $request)
    {
        $query = Store::with('user');

        if ($request->has('status')) {
            if ($request->status === 'pending') {
                $query->where('is_verified', false);
            } elseif ($request->status === 'active') {
                $query->where('is_verified', true);
            }
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhereHas('user', function($u) use ($search) {
                      $u->where('name', 'like', "%{$search}%");
                  });
            });
        }

        $stores = $query->orderBy('is_verified', 'asc')
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Stores', [
            'stores' => $stores,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function approveStore($id)
    {
        $store = Store::findOrFail($id);
        $store->update(['is_verified' => true]);

        return back()->with('success', 'Toko berhasil diverifikasi.');
    }

    public function rejectStore($id)
    {
        $store = Store::findOrFail($id);
        
        if ($store->logo) {
            Storage::disk('public')->delete($store->logo);
        }

        $store->delete();

        return back()->with('success', 'Pengajuan toko ditolak dan data dihapus.');
    }

    public function withdrawals()
    {
        $withdrawals = WithDrawal::with('storeBalance.store')
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/Withdrawals', [
            'withdrawals' => $withdrawals
        ]);
    }

    public function approveWithdrawal($id)
    {
        DB::transaction(function () use ($id) {
            $withdrawal = WithDrawal::findOrFail($id);

            if ($withdrawal->status !== 'pending') {
                return; 
            }

            $withdrawal->update(['status' => 'approved']);

            $balance = StoreBalance::findOrFail($withdrawal->store_balance_id);
            
            if ($balance->balance < $withdrawal->amount) {
                throw new \Exception("Saldo toko tidak mencukupi untuk penarikan ini.");
            }

            $balance->decrement('balance', $withdrawal->amount);

            StoreBalanceHistory::create([
                'store_balance_id' => $balance->id,
                'type' => 'withdraw',
                'amount' => $withdrawal->amount,
                'remarks' => 'Penarikan Saldo #' . $withdrawal->id . ' disetujui Admin',
                'reference_id' => $withdrawal->id,
                'reference_type' => WithDrawal::class,
            ]);
        });

        return back()->with('success', 'Permintaan penarikan telah disetujui.');
    }

    public function rejectWithdrawal($id)
    {
        $withdrawal = WithDrawal::findOrFail($id);
        
        if ($withdrawal->status === 'pending') {
            $withdrawal->update(['status' => 'rejected']);
        }

        return back()->with('success', 'Permintaan penarikan ditolak.');
    }

    public function users(Request $request)
    {
        $query = User::where('role', '!=', 'admin');

        if ($request->has('role') && in_array($request->role, ['seller', 'member'])) {
            $query->where('role', $request->role);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $users = $query->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Users', [
            'users' => $users,
            'filters' => $request->only(['search', 'role']),
        ]);
    }

    public function updateUser(Request $request, $id)
    {
        $user = User::findOrFail($id);
        
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,'.$id,
            'role' => 'required|in:member,seller',
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
        ]);

        return back()->with('success', 'Data pengguna berhasil diperbarui.');
    }

    public function destroyUser($id)
    {
        $user = User::findOrFail($id);
        
        if ($user->role === 'admin') {
            return back()->with('error', 'Tidak dapat menghapus akun Admin.');
        }

        $user->delete();

        return back(); 
    }
}