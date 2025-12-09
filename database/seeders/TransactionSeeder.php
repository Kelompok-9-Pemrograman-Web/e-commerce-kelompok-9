<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\ProductImage;
use App\Models\Store;
use App\Models\Transaction;
use App\Models\TransactionDetail;
use App\Models\User;
use App\Models\Buyer;
use App\Models\StoreBalance;
use App\Models\StoreBalanceHistory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TransactionSeeder extends Seeder
{
    public function run(): void
    {
        // 1. SIAPKAN USER (Seller & Buyer)
        $sellerUser = User::where('role', 'seller')->first();
        $buyerUser = User::where('role', 'member')->first();

        if (!$sellerUser || !$buyerUser) {
            $this->command->info('User Seller atau Buyer tidak ditemukan. Jalankan AdminUserSeeder dulu.');
            return;
        }

        // 2. SIAPKAN DATA BUYER
        $buyer = Buyer::firstOrCreate(
            ['user_id' => $buyerUser->id],
            ['phone_number' => '08123456789']
        );

        // 3. SIAPKAN TOKO SELLER
        $store = Store::firstOrCreate(
            ['user_id' => $sellerUser->id],
            [
                'name' => 'Juragan Sayur Official',
                'slug' => 'juragan-sayur-official',
                'phone' => '081299998888',
                'address' => 'Jl. Raya Bogor KM 30',
                'address_id' => 'ADDR-STORE-001',
                'city' => 'Jakarta Timur',
                'postal_code' => '13710',
                'is_verified' => true,
                'about' => 'Menjual produk segar langsung dari petani pilihan.',
            ]
        );

        // 4. SIAPKAN SALDO TOKO
        $balanceWallet = StoreBalance::firstOrCreate(
            ['store_id' => $store->id],
            ['balance' => 0]
        );

        // 5. SIAPKAN 4 KATEGORI UTAMA (Sesuai Request)
        $categoriesData = [
            [
                'name' => 'Fresh Fruit',
                'slug' => 'fresh-fruit',
                'image' => 'images/Icon/FreshFruit.svg'
            ],
            [
                'name' => 'Vegetables',
                'slug' => 'vegetables',
                'image' => 'images/Icon/Vegetables.svg'
            ],
            [
                'name' => 'Fresh Meat',
                'slug' => 'fresh-meat',
                'image' => 'images/Icon/FreshMeat.svg'
            ],
            [
                'name' => 'Health Drink',
                'slug' => 'health-drink',
                'image' => 'images/Icon/HealthyDrink.svg'
            ],
        ];

        foreach ($categoriesData as $catData) {
            ProductCategory::firstOrCreate(
                ['slug' => $catData['slug']],
                [
                    'name' => $catData['name'],
                    'image' => $catData['image'],
                    'tagline' => 'Kualitas terbaik',
                    'description' => 'Deskripsi kategori ' . $catData['name'],
                ]
            );
        }

        // 6. BUAT PRODUK DUMMY (Jika Kosong)
        // Kita cek per kategori, kalau belum ada produk di kategori itu, kita buatin.
        foreach ($categoriesData as $index => $catData) {
            $category = ProductCategory::where('slug', $catData['slug'])->first();
            
            // Cek apakah toko ini udah punya produk di kategori ini?
            $existingProduct = Product::where('store_id', $store->id)
                ->where('product_category_id', $category->id)
                ->first();

            if (!$existingProduct) {
                $prodName = $catData['name'] . ' Premium ' . ($index + 1);
                
                $product = Product::create([
                    'store_id' => $store->id,
                    'product_category_id' => $category->id,
                    'name' => $prodName,
                    'slug' => Str::slug($prodName) . '-' . Str::random(5),
                    'description' => 'Produk segar berkualitas tinggi dari kategori ' . $catData['name'],
                    'condition' => 'new',
                    'price' => ($index + 1) * 15000, // Harga variatif: 15k, 30k, 45k, 60k
                    'weight' => 500,
                    'stock' => 50,
                ]);

                // Gambar Dummy (Pastikan file ini ada atau biarkan placeholder)
                ProductImage::create([
                    'product_id' => $product->id,
                    'image' => 'products/dummy.jpg', // Nanti ganti kalau mau real
                    'is_thumbnail' => true
                ]);
            }
        }

        // Ambil semua produk yang baru dibuat/sudah ada
        $products = Product::where('store_id', $store->id)->get();

        if ($products->isEmpty()) {
            $this->command->error('Gagal membuat produk. Cek log.');
            return;
        }

        // 7. BUAT 5 TRANSAKSI DUMMY
        $this->command->info('Membuat 5 Transaksi Dummy...');
        
        for ($i = 1; $i <= 5; $i++) {
            
            $shippingCost = 12000;
            $tax = 1500;
            $subtotal = 0;
            
            // Ambil 2 produk acak untuk tiap transaksi
            $selectedProducts = $products->random(min(2, $products->count()));

            foreach ($selectedProducts as $product) {
                $subtotal += $product->price * 1; 
            }
            
            $grandTotal = $subtotal + $shippingCost + $tax;

            // A. Header Transaksi
            $transaction = Transaction::create([
                'code' => 'TRX-' . strtoupper(Str::random(8)),
                'buyer_id' => $buyer->id,
                'store_id' => $store->id,
                'address' => 'Jl. Mawar Melati No. ' . $i,
                'address_id' => 'ADDR-BUYER-' . $i,
                'city' => 'Jakarta Selatan',
                'postal_code' => '12000',
                'shipping' => 'JNE',           
                'shipping_type' => 'REG',  
                'shipping_cost' => $shippingCost,
                'tracking_number' => $i % 2 == 0 ? 'JN' . Str::random(10) : null, // Genap dikirim, Ganjil proses
                'tax' => $tax,
                'grand_total' => $grandTotal,
                'payment_status' => 'paid', // Uang masuk
                'created_at' => now()->subDays($i),
            ]);

            // B. Detail Transaksi
            foreach ($selectedProducts as $product) {
                TransactionDetail::create([
                    'transaction_id' => $transaction->id,
                    'product_id' => $product->id,
                    'qty' => 1,
                    'subtotal' => $product->price * 1, 
                ]);
            }

            // C. UPDATE SALDO SELLER (INCOME)
            $balanceWallet->increment('balance', $grandTotal);

            StoreBalanceHistory::create([
                'store_balance_id' => $balanceWallet->id,
                'type' => 'income',
                'amount' => $grandTotal,
                'reference_id' => $transaction->id,
                'reference_type' => Transaction::class,
                'remarks' => 'Penjualan #' . $transaction->code,
                'created_at' => now()->subDays($i),
            ]);
        }
        
        $this->command->info('Sukses! Transaksi, Produk, dan Kategori berhasil dibuat.');
    }
}