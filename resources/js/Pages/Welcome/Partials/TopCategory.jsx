import SectionTitle from "./SectionTitle";

export default function TopCategory({ handleAccess }) {
    const categories = [
        {
            name: "Fresh Fruit",
            count: "125 Products",
            img: "/images/icon/FreshFruit.svg",
        },
        {
            name: "Vegetables",
            count: "140 Products",
            img: "/images/icon/Vegetables.svg",
        },
        {
            name: "Fresh Meat",
            count: "65 Products",
            img: "/images/icon/FreshMeat.svg",
        },
        {
            name: "Healthy Drink",
            count: "45 Products",
            img: "/images/icon/HealthyDrink.svg",
        },
    ];

    return (
        <section className="py-20 bg-white font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle title="Top Category" />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {categories.map((cat, index) => (
                        <div
                            key={index}
                            onClick={(e) => handleAccess(e, "/category/detail")}
                            className="bg-gray-50 rounded-xl p-6 text-center hover:bg-white hover:shadow-lg hover:border hover:border-[#00B207] hover:-translate-y-1 transition duration-300 cursor-pointer border border-transparent"
                        >
                            <div className="h-20 mb-4 flex items-center justify-center">
                                <img
                                    src={cat.img}
                                    alt={cat.name}
                                    className="h-full object-contain"
                                />
                            </div>
                            <h3 className="font-semibold text-lg text-[#1A1A1A]">
                                {cat.name}
                            </h3>
                            <p className="text-gray-400 text-xs mt-1">
                                {cat.count}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
