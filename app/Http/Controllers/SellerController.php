<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Store;
use App\Models\StoreBalance;
use App\Models\Transaction;
use App\Models\WithDrawal;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class SellerController extends Controller
{
    public function dashboard()
    {
        $user = Auth::user();
        $store = Store::where('user_id', $user->id)->first();
        if (!$store) {
             return Inertia::render('Seller/Dashboard', [
                'store' => null,
                'stats' => null
            ]);
        }

        if (!$store->is_verified) {
            return Inertia::render('Seller/PendingVerification');
        }

        $totalProducts = Product::where('store_id', $store->id)->count();
        
        $pendingOrders = Transaction::where('store_id', $store->id)
            ->where('payment_status', 'paid')
            ->whereNull('tracking_number')
            ->count();

        $totalSales = Transaction::where('store_id', $store->id)
            ->where('payment_status', 'paid')
            ->sum('grand_total');
        
        return Inertia::render('Seller/Dashboard', [
            'store' => $store,
            'stats' => [
                'total_products' => $totalProducts,
                'pending_orders' => $pendingOrders,
                'total_sales' => number_format($totalSales, 0, ',', '.'),
            ]
        ]);
    }

    public function showJoinPage()
    {
        $user = Auth::user();

        if ($user->role === 'seller') return redirect()->route('seller.dashboard');
        if ($user->role === 'admin') return redirect()->route('admin.dashboard');

        $store = Store::where('user_id', $user->id)->first();
        if ($store) return redirect()->route('seller.dashboard');

        return Inertia::render('JoinSeller');
    }

    public function registerStore(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'name' => 'required|string|max:255|unique:stores,name',
            'phone' => 'required|string|max:20',
            'address' => 'required|string',
            'city' => 'required|string',
            'postal_code' => 'required|string',
            'about' => 'nullable|string',
        ]);

        DB::transaction(function () use ($request, $user) {
            Store::create([
                'user_id' => $user->id,
                'name' => $request->name,
                'slug' => Str::slug($request->name),
                'phone' => $request->phone,
                'address' => $request->address,
                'address_id' => 'ADDR-' . time() . '-' . $user->id,
                'city' => $request->city,
                'postal_code' => $request->postal_code,
                'about' => $request->about,
                'logo' => 'default.png', // <-- PERBAIKAN: Isi default logo biar gak error 1364
                'is_verified' => false,
            ]);

            $user->update(['role' => 'seller']);
        });

        return redirect()->route('seller.dashboard')->with('success', 'Pendaftaran berhasil! Tunggu verifikasi admin.');
    }

    public function editStore()
    {
        $user = Auth::user();
        $store = Store::where('user_id', $user->id)->first();

        return Inertia::render('Seller/StoreProfile', [
            'store' => $store
        ]);
    }

    public function updateStore(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'about' => 'nullable|string',
            'address' => 'required|string',
            'city' => 'required|string',
            'postal_code' => 'required|string',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', 
        ]);

        $store = Store::firstOrNew(['user_id' => $user->id]);

        $store->name = $request->name;
        $store->phone = $request->phone;
        $store->about = $request->about;
        $store->address = $request->address;
        $store->city = $request->city;
        $store->postal_code = $request->postal_code;

        if (!$store->address_id) {
            $store->address_id = 'ADDR-' . time() . '-' . $user->id; 
        }

        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('store-logos', 'public');
            $store->logo = $path;
        }

        if (!$store->exists) {
            $store->is_verified = false;
            $store->logo = 'default.png'; // Jaga-jaga kalau update pertama kali
        }

        $store->save();

        return redirect()->route('seller.store')->with('success', 'Profil toko berhasil disimpan.');
    }

    public function balance()
    {
        $user = Auth::user();
        $store = Store::where('user_id', $user->id)->first();

        if (!$store) return redirect()->route('seller.dashboard');

        $balance = StoreBalance::firstOrCreate(
            ['store_id' => $store->id],
            ['balance' => 0]
        );

        $withdrawals = WithDrawal::where('store_balance_id', $balance->id)
            ->latest()
            ->paginate(10);

        return Inertia::render('Seller/Finance', [
            'balance' => $balance->balance,
            'withdrawals' => $withdrawals
        ]);
    }

    public function withdraw(Request $request)
    {
        $user = Auth::user();
        $store = Store::where('user_id', $user->id)->first();
        $balance = StoreBalance::where('store_id', $store->id)->first();

        $request->validate([
            'amount' => 'required|numeric|min:10000',
            'bank_name' => 'required|string',
            'bank_account_number' => 'required|string',
            'bank_account_name' => 'required|string',
        ]);

        if ($request->amount > $balance->balance) {
            return back()->withErrors(['amount' => 'Saldo tidak mencukupi.']);
        }

        WithDrawal::create([
            'store_balance_id' => $balance->id,
            'amount' => $request->amount,
            'bank_name' => $request->bank_name,
            'bank_account_number' => $request->bank_account_number,
            'bank_account_name' => $request->bank_account_name,
            'status' => 'pending'
        ]);

        return back()->with('success', 'Permintaan penarikan berhasil dikirim.');
    }
}