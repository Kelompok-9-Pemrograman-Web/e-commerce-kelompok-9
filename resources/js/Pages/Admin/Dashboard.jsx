import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import {
    Users,
    Store,
    Wallet,
    AlertCircle,
    Check,
    X,
    ClipboardList,
} from "lucide-react";

export default function Dashboard({ stats, pendingRequests }) {
    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(number);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    const statCards = [
        {
            title: "Total Pengguna",
            value: stats.total_users,
            Icon: Users,
            note: "User terdaftar",
        },
        {
            title: "Toko Terverifikasi",
            value: stats.active_stores,
            Icon: Store,
            note: "Aktif berjualan",
        },
        {
            title: "Pending Verifikasi",
            value: stats.pending_verifications,
            Icon: AlertCircle,
            note: "Butuh tindakan",
        },
        {
            title: "Total Saldo Sistem",
            value: formatRupiah(stats.total_balance),
            Icon: Wallet,
            note: "Akumulasi saldo toko",
        },
    ];

    return (
        <AdminLayout title="Dashboard Overview">
            <Head title="Admin Dashboard" />

            {/* 1. STATS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {statCards.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 flex items-start justify-between hover:-translate-y-1 transition duration-300"
                    >
                        <div>
                            <p className="text-gray-500 text-sm font-medium mb-1">
                                {item.title}
                            </p>
                            <h3 className="text-3xl font-bold text-[#1A1A1A] font-poppins">
                                {item.value}
                            </h3>
                            <span className="text-xs text-gray-500 mt-2 inline-block font-medium">
                                {item.note}
                            </span>
                        </div>
                        {/* Render Icon disini dengan item.Icon */}
                        <div
                            className={`p-3 rounded-xl text-black shadow-md flex items-center justify-center`}
                        >
                            <item.Icon className="w-6 h-6" />
                        </div>
                    </div>
                ))}
            </div>

            {/* 2. TABEL VERIFIKASI */}
            <div className="bg-white rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h3 className="font-bold text-lg text-[#1A1A1A] font-poppins">
                            Permintaan Verifikasi Terbaru
                        </h3>
                        <p className="text-sm text-gray-500">
                            {pendingRequests.length > 0
                                ? `${pendingRequests.length} toko menunggu persetujuan Anda.`
                                : "Tidak ada permintaan pending saat ini."}
                        </p>
                    </div>
                    <Link
                        href={route("admin.stores")}
                        className="text-sm font-bold text-[#00B207] hover:underline"
                    >
                        Lihat Semua
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-semibold border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">Nama Toko</th>
                                <th className="px-6 py-4">Pemilik</th>
                                <th className="px-6 py-4">Tanggal Daftar</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm">
                            {pendingRequests.length > 0 ? (
                                pendingRequests.map((req) => (
                                    <tr
                                        key={req.id}
                                        className="hover:bg-gray-50/50 transition"
                                    >
                                        <td className="px-6 py-4 font-bold text-[#1A1A1A]">
                                            {req.name}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {req.user?.name || "Unknown User"}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {formatDate(req.created_at)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-600">
                                                Pending
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition text-xs font-bold">
                                                    <Check className="w-4 h-4" />
                                                </button>
                                                <button className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition text-xs font-bold">
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                // --- REVISI EMPTY STATE BIAR RAPI ---
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="px-6 py-20 text-center"
                                    >
                                        <div className="flex flex-col items-center justify-center text-gray-400">
                                            <div className="bg-gray-50 p-4 rounded-full mb-3">
                                                <ClipboardList className="w-8 h-8 text-gray-300" />
                                            </div>
                                            <span className="text-sm font-medium">
                                                Belum ada data toko yang perlu
                                                diverifikasi.
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
