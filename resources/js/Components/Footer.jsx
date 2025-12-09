import { Link } from "@inertiajs/react";

export default function Footer() {
    return (
        <footer className="bg-[#1A1A1A] pt-16 pb-12 font-sans text-gray-400">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* KOLOM 1: LOGO & DESKRIPSI (Lebar 2 kolom di layar besar biar lega) */}
                    <div className="lg:col-span-2 space-y-6 pr-8">
                        <Link
                            href="/"
                            className="font-poppins text-3xl font-bold tracking-wide text-white"
                        >
                            FreshMart
                        </Link>

                        <p className="text-sm leading-relaxed max-w-xs">
                            Pilihan terkurasi buah-buahan segar dan produk sehat
                            harian Anda.
                        </p>

                        {/* Social Media Icons */}
                        <div className="flex gap-4">
                            {/* Facebook (Hijau Bulat) */}
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-[#00B207] flex items-center justify-center text-white hover:bg-green-700 transition"
                            >
                                <svg
                                    className="w-5 h-5 fill-current"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>

                            {/* Twitter (Putih Polos) */}
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full flex items-center justify-center hover:text-white transition"
                            >
                                <svg
                                    className="w-5 h-5 fill-current"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                            </a>

                            {/* Pinterest */}
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full flex items-center justify-center hover:text-white transition"
                            >
                                <svg
                                    className="w-5 h-5 fill-current"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.399.165-1.497-.698-2.433-2.888-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.173 0 7.41 2.967 7.41 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.62 0 12.017 0z" />
                                </svg>
                            </a>

                            {/* Instagram */}
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full flex items-center justify-center hover:text-white transition"
                            >
                                <svg
                                    className="w-5 h-5 fill-current"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* KOLOM LINK: MY ACCOUNT */}
                    <div>
                        <h4 className="text-white font-medium text-base mb-2 font-poppins">
                            My Account
                        </h4>
                        {/* Garis Hijau Pendek */}
                        <div className="w-6 h-0.5 bg-[#00B207] mb-5"></div>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link
                                    href="#"
                                    className="hover:text-white transition"
                                >
                                    My Account
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="hover:text-white transition"
                                >
                                    Order History
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="hover:text-white transition"
                                >
                                    Shopping Cart
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* KOLOM LINK: HELPS */}
                    <div>
                        <h4 className="text-white font-medium text-base mb-2 font-poppins">
                            Helps
                        </h4>
                        <div className="w-6 h-0.5 bg-[#00B207] mb-5"></div>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link
                                    href="#"
                                    className="hover:text-white transition"
                                >
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="hover:text-white transition"
                                >
                                    Terms & Condition
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="hover:text-white transition"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* KOLOM LINK: PROXY */}
                    <div>
                        <h4 className="text-white font-medium text-base mb-2 font-poppins">
                            Proxy
                        </h4>
                        <div className="w-6 h-0.5 bg-[#00B207] mb-5"></div>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link
                                    href="#"
                                    className="hover:text-white transition"
                                >
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="hover:text-white transition"
                                >
                                    Shop
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="hover:text-white transition"
                                >
                                    Product
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="hover:text-white transition"
                                >
                                    Track Order
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* COPYRIGHT SECTION (Opsional, biasa ada di bawah) */}
                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
                    <p>
                        &copy; {new Date().getFullYear()} FreshMart. All Rights
                        Reserved.
                    </p>
                    {/* Bisa tambah icon pembayaran disini kalau ada */}
                </div>
            </div>
        </footer>
    );
}
