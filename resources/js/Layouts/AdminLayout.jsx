import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    LayoutDashboard,
    Store,
    Wallet,
    Users,
    LogOut,
    Menu,
    X,
    CheckSquare,
} from "lucide-react";

export default function AdminLayout({ children, title }) {
    const { auth } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Menu Navigasi Sesuai Fitur Admin
    const navigation = [
        {
            name: "Dashboard",
            href: route("admin.dashboard"),
            icon: LayoutDashboard,
        },
        {
            name: "Verifikasi Toko",
            href: route("admin.stores"),
            icon: CheckSquare,
        }, // Fokus Verifikasi
        {
            name: "Penarikan Saldo",
            href: route("admin.withdrawals"),
            icon: Wallet,
        },
        { name: "Kelola Pengguna", href: route("admin.users"), icon: Users },
    ];

    // Fungsi buat Avatar Inisial (Warna Random biar keren dikit atau Statis)
    const getInitials = (name) => (name ? name.charAt(0).toUpperCase() : "A");

    return (
        <div className="min-h-screen bg-[#F4F6F5] font-sans flex text-[#1A1A1A]">
            {/* --- SIDEBAR (Fixed Kiri) --- */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#1A1A1A] text-white transition-transform duration-300 transform ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0 lg:static lg:inset-0 flex flex-col`}
            >
                {/* 1. Header Sidebar (Logo) */}
                <div className="flex items-center justify-center h-20 border-b border-gray-800">
                    <Link
                        href="/"
                        className="font-poppins text-2xl font-bold tracking-wide flex items-center gap-2"
                    >
                        <span>
                            Fresh<span className="text-[#00B207]">Mart</span>
                        </span>
                        <span className="text-[10px] uppercase bg-gray-700 text-gray-300 px-1.5 py-0.5 rounded tracking-wider">
                            Admin
                        </span>
                    </Link>
                </div>

                {/* 2. Menu Items */}
                <nav className="flex-1 mt-6 px-4 space-y-2 overflow-y-auto">
                    {navigation.map((item) => {
                        // Cek aktif berdasarkan URL
                        const isActive = route().current(
                            item.href.split("/").pop()
                        );

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                                    isActive
                                        ? "bg-[#00B207] text-white font-semibold shadow-lg shadow-green-900/30"
                                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                                }`}
                            >
                                <item.icon
                                    className={`w-5 h-5 ${
                                        isActive
                                            ? "text-white"
                                            : "text-gray-500 group-hover:text-white"
                                    }`}
                                />
                                <span className="tracking-wide text-sm">
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                {/* 3. Profile & Logout Section (Sticky Bottom) */}
                <div className="p-4 border-t border-gray-800 bg-[#1A1A1A]">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/50 mb-3">
                        {/* Avatar Inisial Gmail Style */}
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold font-poppins text-lg shadow-inner">
                            {getInitials(auth.user.name)}
                        </div>

                        {/* Info User */}
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white truncate">
                                {auth.user.name}
                            </p>
                            <p className="text-xs text-gray-400 truncate">
                                {auth.user.email}
                            </p>
                        </div>
                    </div>

                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-gray-700 text-gray-400 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/30 transition text-sm font-medium"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </Link>
                </div>
            </aside>

            {/* --- MAIN CONTENT WRAPPER --- */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden h-screen">
                {/* Mobile Header Toggle */}
                <header className="lg:hidden bg-white shadow-sm h-16 flex items-center px-4 justify-between z-40 border-b border-gray-200">
                    <span className="font-bold text-lg font-poppins">
                        Admin Panel
                    </span>
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-md"
                    >
                        {sidebarOpen ? <X /> : <Menu />}
                    </button>
                </header>

                {/* Content Scrollable Area */}
                <main className="flex-1 overflow-y-auto bg-[#F4F6F5] p-6 lg:p-10">
                    <div className="max-w-7xl mx-auto">
                        {/* Header Halaman */}
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold font-poppins text-[#1A1A1A]">
                                {title}
                            </h1>
                            {/* Breadcrumb simpel (Opsional) */}
                            <p className="text-sm text-gray-500 mt-1">
                                Admin Portal /{" "}
                                <span className="text-[#00B207]">{title}</span>
                            </p>
                        </div>

                        {children}
                    </div>
                </main>
            </div>

            {/* Overlay Mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
}
