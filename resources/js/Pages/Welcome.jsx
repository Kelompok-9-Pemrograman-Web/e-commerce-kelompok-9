import React from "react";
import { Head, router } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import Hero from "./Welcome/Partials/Hero";
import TopCategory from "./Welcome/Partials/TopCategory";
import FeaturedProducts from "./Welcome/Partials/FeaturedProducts"; // Komponen yang mau kita update
import Features from "./Welcome/Partials/Features";
import BannerBottom from "./Welcome/Partials/BannerBottom";

// Terima props 'featuredProducts' disini
export default function Welcome({ auth, featuredProducts }) {
    // Fungsi Satpam (Akses)
    const handleRestrictedAccess = (e, url) => {
        e.preventDefault();
        if (auth.user) {
            router.visit(url);
        } else {
            router.visit(route("login"));
        }
    };

    return (
        <MainLayout title="FreshMart - Organic Food Store">
            <Hero handleAccess={handleRestrictedAccess} />

            <TopCategory handleAccess={handleRestrictedAccess} />

            {/* Oper data produk ke komponen ini */}
            <FeaturedProducts
                products={featuredProducts}
                handleAccess={handleRestrictedAccess}
            />

            <Features />

            <BannerBottom />
        </MainLayout>
    );
}
