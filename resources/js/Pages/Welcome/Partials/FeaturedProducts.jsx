import React from "react";
import SectionTitle from "./SectionTitle";
import { ShoppingBag, Store, ImageIcon } from "lucide-react";

// Terima props 'products' (data asli) dan 'handleAccess'
export default function FeaturedProducts({ products, handleAccess }) {
    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(number);
    };

    return (
        <section className="py-10 bg-white mb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Judul Center */}
                <SectionTitle title="Featured Products" />

                {/* Grid Produk */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {/* Loop Data Asli dari Database */}
                    {products.length > 0 ? (
                        products.map((item) => (
                            <div
                                key={item.id}
                                className="group border border-gray-100 rounded-xl p-4 hover:border-[#00B207] hover:shadow-lg transition bg-white relative flex flex-col h-full"
                            >
                                {/* Gambar Produk */}
                                <div className="h-48 bg-gray-50 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                                    {item.product_images &&
                                    item.product_images.length > 0 ? (
                                        <img
                                            src={`/storage/${item.product_images[0].image}`}
                                            alt={item.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                        />
                                    ) : (
                                        <ImageIcon className="w-12 h-12 text-gray-300" />
                                    )}

                                    {/* Label Kondisi (Opsional) */}
                                    {item.condition === "new" && (
                                        <div className="absolute top-3 right-3 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded">
                                            New
                                        </div>
                                    )}
                                </div>

                                {/* Info Produk */}
                                <div className="flex-grow">
                                    <h3
                                        className="text-[#1A1A1A] font-medium group-hover:text-[#00B207] transition cursor-pointer text-base line-clamp-1"
                                        onClick={(e) =>
                                            handleAccess(e, route("login"))
                                        } // Nanti diganti ke detail produk
                                    >
                                        {item.name}
                                    </h3>
                                    <p className="font-bold text-[#1A1A1A] mt-1 text-lg">
                                        {formatRupiah(item.price)}
                                    </p>

                                    {/* Rating Dummy (Karena belum ada fitur review) */}
                                    <div className="flex mt-1 mb-3">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className={`w-3 h-3 ${
                                                    i < 4
                                                        ? "text-[#FF8A00]"
                                                        : "text-gray-300"
                                                } fill-current`}
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                            </svg>
                                        ))}
                                        <span className="text-xs text-gray-400 ml-1">
                                            (0)
                                        </span>
                                    </div>
                                </div>

                                {/* Footer Card: Nama Toko & Tombol Keranjang */}
                                <div className="flex justify-between items-center pt-3 border-t border-gray-100 mt-auto">
                                    {/* Info Toko */}
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <Store className="w-4 h-4" />
                                        <span className="text-xs font-medium truncate max-w-[100px]">
                                            {item.store?.name || "Unknown Shop"}
                                        </span>
                                    </div>

                                    {/* Tombol Keranjang (Satpam Trigger) */}
                                    <button
                                        onClick={(e) =>
                                            handleAccess(e, route("login"))
                                        } // Nanti ke add to cart
                                        className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#00B207] hover:text-white transition group/btn"
                                    >
                                        <ShoppingBag className="w-4 h-4 group-hover/btn:scale-110 transition" />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-4 text-center py-10 text-gray-500">
                            Belum ada produk yang ditampilkan.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
