import React from "react";
import SectionTitle from "./SectionTitle";
import { ShoppingBag, Store } from "lucide-react"; // Tambah icon Store

export default function FeaturedProducts({ handleAccess }) {
    // Data Produk dengan Gambar Real & Nama Toko
    const products = [
        {
            name: "Green Apple",
            price: "Rp 15.000",
            img: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=300&h=300",
            rating: 4,
            store: "Toko Buah Segar",
            sale: true,
        },
        {
            name: "Fresh Mango",
            price: "Rp 28.000",
            img: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=300&h=300",
            rating: 5,
            store: "Juragan Mangga",
            sale: false,
        },
        {
            name: "Daging Sapi Segar",
            price: "Rp 120.000",
            img: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=300&h=300",
            rating: 5,
            store: "Toko Pambudi", // Sesuai request
            sale: false,
        },
        {
            name: "Fresh Pineapple",
            price: "Rp 15.000",
            img: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&q=80&w=300&h=300",
            rating: 4,
            store: "Kebun Nanas Subang",
            sale: false,
        },
        {
            name: "Pisang Cavendish",
            price: "Rp 18.000",
            img: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&q=80&w=300&h=300",
            rating: 5,
            store: "Pisang Mas",
            sale: false,
        },
        {
            name: "Jeruk Medan",
            price: "Rp 20.000",
            img: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&q=80&w=300&h=300",
            rating: 4,
            store: "Raja Jeruk",
            sale: false,
        },
        {
            name: "Selada Organik",
            price: "Rp 8.000",
            img: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&q=80&w=300&h=300",
            rating: 4,
            store: "Sayur Mayur Pak Budi",
            sale: false,
        },
        {
            name: "Tomat Merah",
            price: "Rp 10.000",
            img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=300&h=300",
            rating: 5,
            store: "Kebun Tomat Lembang",
            sale: true,
        },
    ];

    return (
        <section className="py-10 bg-white mb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Judul Center */}
                <SectionTitle title="Featured Products" />

                {/* Grid Produk */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {products.map((item, index) => (
                        <div
                            key={index}
                            className="group border border-gray-100 rounded-xl p-4 hover:border-[#00B207] hover:shadow-lg transition bg-white relative flex flex-col h-full"
                        >
                            {/* Gambar Produk */}
                            <div className="h-48 bg-gray-50 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                                <img
                                    src={item.img}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                />
                                {item.sale && (
                                    <div className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded">
                                        Sale
                                    </div>
                                )}
                            </div>

                            {/* Info Produk (Nama, Harga, Rating) */}
                            <div className="flex-grow">
                                <h3
                                    className="text-[#1A1A1A] font-medium group-hover:text-[#00B207] transition cursor-pointer text-base line-clamp-1"
                                    onClick={(e) =>
                                        handleAccess(e, "/product/detail")
                                    }
                                >
                                    {item.name}
                                </h3>
                                <p className="font-bold text-[#1A1A1A] mt-1 text-lg">
                                    {item.price}
                                </p>

                                <div className="flex mt-1 mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-3 h-3 ${
                                                i < item.rating
                                                    ? "text-[#FF8A00]"
                                                    : "text-gray-300"
                                            } fill-current`}
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>

                            {/* Footer Card: Nama Toko & Tombol Keranjang */}
                            <div className="flex justify-between items-center pt-3 border-t border-gray-100 mt-auto">
                                {/* Info Toko */}
                                <div className="flex items-center gap-2 text-gray-500">
                                    <Store className="w-4 h-4" />
                                    <span className="text-xs font-medium truncate max-w-[100px]">
                                        {item.store}
                                    </span>
                                </div>

                                {/* Tombol Keranjang Bulat (Hijau Muda ke Hijau Tua) */}
                                <button
                                    onClick={(e) =>
                                        handleAccess(e, "/cart/add")
                                    }
                                    className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#00B207] hover:text-white transition group/btn"
                                >
                                    <ShoppingBag className="w-4 h-4 group-hover/btn:scale-110 transition" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
