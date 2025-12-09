import { Link } from "@inertiajs/react";

export default function Hero({ handleAccess }) {
    return (
        <section className="relative bg-[#1A1A1A] h-[600px] flex items-center overflow-hidden font-sans">
            <div className="absolute inset-0 z-0">
                <img
                    src="https://assets1.progressivegrocer.com/images/v/max_width_1440/files/s3fs-public/2024-09/257_checkout_sbk9371-3.jpg"
                    alt="Background"
                    className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-xl">
                    <span className="text-[#00B207] font-medium tracking-wide uppercase text-sm mb-2 block">
                        Welcome to FreshMart
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6 font-poppins">
                        Fresh & Healthy <br />
                        Organic Food
                    </h1>
                    <p className="text-gray-300 text-xl mb-2 font-medium">
                        Sale up to{" "}
                        <span className="text-[#E6A327] font-bold">
                            30% OFF
                        </span>
                    </p>
                    <p className="text-gray-400 text-sm mb-8">
                        Free shipping on all your order. we deliver, you enjoy
                    </p>

                    <button
                        onClick={(e) => handleAccess(e, "/#product")}
                        className="px-10 py-4 bg-[#00B207] text-white rounded-full font-bold hover:bg-green-700 transition flex items-center gap-2 group"
                    >
                        Shop now
                        <svg
                            className="w-5 h-5 group-hover:translate-x-1 transition"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}
