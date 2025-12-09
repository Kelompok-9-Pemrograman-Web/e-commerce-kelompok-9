import React from "react";
import { Head, router } from "@inertiajs/react"; // Pakai router buat redirect manual
import MainLayout from "@/Layouts/MainLayout";
import Hero from "./Welcome/Partials/Hero";
import TopCategory from "./Welcome/Partials/TopCategory";
import FeaturedProducts from "./Welcome/Partials/FeaturedProducts";
import Features from "./Welcome/Partials/Features";
import BannerBottom from "./Welcome/Partials/BannerBottom";
import "../../css/app.css";

export default function Welcome({ auth }) {
    // --- FUNGSI SATPAM ---
    // Fungsi ini bakal dipanggil sama tombol-tombol yang butuh akses login
    const handleRestrictedAccess = (e, url) => {
        e.preventDefault(); // Mencegah link bawaan jalan duluan

        if (auth.user) {
            // Kalau udah login, silakan lanjut ke URL tujuan
            router.visit(url);
        } else {
            // Kalau belum login, lempar ke halaman login
            router.visit(route("login"));
        }
    };

    return (
        <MainLayout title="FreshMart - Organic Food Store">
            {/* 1. HERO SECTION (Background Gelap Sayur) */}
            <Hero handleAccess={handleRestrictedAccess} />

            {/* 2. TOP CATEGORY (Kotak Putih Shadow Hijau) */}
            <TopCategory handleAccess={handleRestrictedAccess} />

            {/* 3. FEATURED PRODUCTS (Grid Produk) */}
            <FeaturedProducts handleAccess={handleRestrictedAccess} />

            {/* 4. FEATURES (Free Delivery, Support, dll) */}
            <Features />

            {/* 5. BANNER BAWAH (Hidup yang sehat...) */}
            <BannerBottom />
        </MainLayout>
    );
}
