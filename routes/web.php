<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SellerController;
use App\Http\Controllers\SellerOrderController;
use App\Http\Controllers\SellerProductController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// --- PUBLIC ROUTES ---
Route::get('/', [WelcomeController::class, 'index'])->name('welcome');
Route::get('/products', [ProductController::class, 'index'])->name('products.list');
Route::get('/product/{slug}', [ProductController::class, 'show'])->name('product.detail');


// --- AUTHENTICATED ROUTES ---
Route::middleware('auth')->group(function () {
    
    // Default Dashboard (Buyer)
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->middleware('verified')->name('dashboard');

    // Profile Management
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Buyer Features
    Route::get('/my-order', function () {
        return "Halaman My Order (Belum dibuat)";
    })->name('my-order');

    // Join Seller Feature
    Route::get('/join-seller', [SellerController::class, 'showJoinPage'])->name('join-seller');
    Route::post('/join-seller', [SellerController::class, 'registerStore'])->name('join-seller.store');


    // --- SELLER ROUTES ---
    Route::middleware('role:seller')->prefix('seller')->name('seller.')->group(function () {
        // Dashboard
        Route::get('/dashboard', [SellerController::class, 'dashboard'])->name('dashboard');
        
        // Store Profile
        Route::get('/store', [SellerController::class, 'editStore'])->name('store');
        Route::post('/store', [SellerController::class, 'updateStore'])->name('store.update');

        // Product Management
        Route::get('/products', [SellerProductController::class, 'index'])->name('products.index');
        Route::get('/products/create', [SellerProductController::class, 'create'])->name('products.create');
        Route::post('/products', [SellerProductController::class, 'store'])->name('products.store');
        Route::get('/products/{id}/edit', [SellerProductController::class, 'edit'])->name('products.edit');
        Route::post('/products/{id}', [SellerProductController::class, 'update'])->name('products.update'); // POST for update with images
        Route::delete('/products/{id}', [SellerProductController::class, 'destroy'])->name('products.destroy');
        Route::delete('/product-images/{id}', [SellerProductController::class, 'destroyImage'])->name('products.image.destroy');

        // Order Management
        Route::get('/orders', [SellerOrderController::class, 'index'])->name('orders.index');
        Route::patch('/orders/{id}/resi', [SellerOrderController::class, 'updateResi'])->name('orders.resi');
        
        // Finance
        Route::get('/balance', [SellerController::class, 'balance'])->name('balance');
        Route::post('/balance/withdraw', [SellerController::class, 'withdraw'])->name('balance.withdraw');
    });


    // --- ADMIN ROUTES ---
    Route::middleware('role:admin')->prefix('admin')->name('admin.')->group(function () {
        // Dashboard
        Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
        
        // Store Verification
        Route::get('/stores', [AdminController::class, 'stores'])->name('stores');
        Route::patch('/stores/{id}/approve', [AdminController::class, 'approveStore'])->name('stores.approve');
        Route::delete('/stores/{id}/reject', [AdminController::class, 'rejectStore'])->name('stores.reject');
        
        // Withdrawals
        Route::get('/withdrawals', [AdminController::class, 'withdrawals'])->name('withdrawals');
        Route::patch('/withdrawals/{id}/approve', [AdminController::class, 'approveWithdrawal'])->name('withdrawals.approve');
        Route::patch('/withdrawals/{id}/reject', [AdminController::class, 'rejectWithdrawal'])->name('withdrawals.reject');
        
        // User Management
        Route::get('/users', [AdminController::class, 'users'])->name('users');
        Route::put('/users/{id}', [AdminController::class, 'updateUser'])->name('users.update');
        Route::delete('/users/{id}', [AdminController::class, 'destroyUser'])->name('users.destroy');
    });
});

require __DIR__.'/auth.php';