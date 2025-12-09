import React, { useState } from "react";
import MainLayout from "@/Layouts/MainLayout";
import SectionTitle from "../Welcome/Partials/SectionTitle"
import { Head, Link, router } from "@inertiajs/react";
import {
    Search,
    ShoppingBag,
    Store,
    ImageIcon,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

export default function Index({ products, categoryName, filters }) {
    const [searchTerm, setSearchTerm] = useState(filters.search || "");

    const handleSearch = (e) => {
        if (e.key === "Enter") {
            router.get(
                route("products.list"),
                {
                    category: filters.category,
                    search: searchTerm,
                },
                { preserveState: true }
            );
        }
    };

    const handleSearchClick = () => {
        router.get(
            route("products.list"),
            {
                category: filters.category,
                search: searchTerm,
            },
            { preserveState: true }
        );
    };

    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(number);
    };

    return (
        <MainLayout title={categoryName}>
            <Head title={categoryName} />

            <div className="bg-white py-4 border-b border-gray-100 mb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-sm text-gray-500">
                        <Link href="/" className="hover:text-[#00B207]">
                            Home
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="text-[#00B207] font-medium">
                            {categoryName}
                        </span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="text-center mb-8">
                    <SectionTitle title={categoryName} />
                </div>

                <div className="flex justify-center mb-12">
                    <div className="relative w-full max-w-xl flex items-center">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleSearch}
                            className="w-full pl-6 pr-32 py-3 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:border-[#00B207] focus:ring-1 focus:ring-[#00B207] transition-all text-sm"
                            placeholder="Search products..."
                        />
                        <button
                            onClick={handleSearchClick}
                            className="absolute right-1 top-1 bottom-1 px-8 bg-[#00B207] text-white rounded-full font-bold text-sm hover:bg-green-700 transition"
                        >
                            SEARCH
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    {products.data.length > 0 ? (
                        products.data.map((item) => (
                            <div
                                key={item.id}
                                className="group border border-gray-100 rounded-xl p-4 hover:border-[#00B207] hover:shadow-lg transition bg-white relative flex flex-col h-full"
                            >
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

                                    {item.condition === "new" && (
                                        <div className="absolute top-3 right-3 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                                            New
                                        </div>
                                    )}
                                </div>

                                <div className="flex-grow">
                                    <h3 className="text-[#1A1A1A] font-medium group-hover:text-[#00B207] transition cursor-pointer text-base line-clamp-1">
                                        {item.name}
                                    </h3>
                                    <p className="font-bold text-[#1A1A1A] mt-1 text-lg">
                                        {formatRupiah(item.price)}
                                    </p>

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

                                <div className="flex justify-between items-center pt-3 border-t border-gray-100 mt-auto">
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <Store className="w-4 h-4" />
                                        <span className="text-xs font-medium truncate max-w-[100px]">
                                            {item.store?.name || "Unknown Shop"}
                                        </span>
                                    </div>

                                    <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#00B207] hover:text-white transition group/btn">
                                        <ShoppingBag className="w-4 h-4 group-hover/btn:scale-110 transition" />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                            <div className="bg-gray-50 p-6 rounded-full mb-4">
                                <Search className="w-12 h-12 text-gray-300" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">
                                Produk Tidak Ditemukan
                            </h3>
                            <p className="text-gray-500 text-sm mt-1">
                                Coba cari dengan kata kunci lain atau pilih
                                kategori berbeda.
                            </p>
                        </div>
                    )}
                </div>

                {products.links.length > 3 && (
                    <div className="flex justify-center gap-2">
                        {products.links.map((link, index) => {
                            const isPrev = link.label.includes("Previous");
                            const isNext = link.label.includes("Next");

                            return link.url ? (
                                <Link
                                    key={index}
                                    href={link.url}
                                    className={`w-10 h-10 flex items-center justify-center rounded-full border transition font-bold text-sm ${
                                        link.active
                                            ? "bg-[#00B207] text-white border-[#00B207]"
                                            : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                                    }`}
                                >
                                    {isPrev ? (
                                        <ChevronLeft className="w-4 h-4" />
                                    ) : isNext ? (
                                        <ChevronRight className="w-4 h-4" />
                                    ) : (
                                        link.label
                                    )}
                                </Link>
                            ) : null;
                        })}
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
