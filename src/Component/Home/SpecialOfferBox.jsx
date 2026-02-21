// SpecialOfferBox.tsx
import React from 'react';
import SpecialOfferBoxMainCard from './Product/SpecialOfferBoxMainCard';
import SpecialOfferBoxCard from './Product/SpecialOfferBoxcard';
import image from "@assets/ax/ups/2025/05/strong-roasted-saffron-ahmad-aghaei-pistachios-barjil-376-1-300x300.webp";

const products = [
  {
    id: 1,
    name: "مغز بادام خام اقتصادی",
    price: 1100000,
    image: image,
  },
  {
    id: 2,
    name: "بادام هندی برشته پیاز جعفری",
    price: 150000,
    image: image,
    oldPrice: 180000,
  },
  {
    id: 3,
    name: "بادام هندی برشته فلفلی",
    price: 70000,
    image: image,
    oldPrice: 85000,
  }, {
    id: 3,
    name: "بادام هندی برشته فلفلی",
    price: 70000,
    image: image,
    oldPrice: 85000,
  }, {
    id: 3,
    name: "بادام هندی برشته فلفلی",
    price: 70000,
    image: image,
    oldPrice: 85000,
  }, {
    id: 3,
    name: "بادام هندی برشته فلفلی",
    price: 70000,
    image: image,
    oldPrice: 85000,
  }, {
    id: 3,
    name: "بادام هندی برشته فلفلی",
    price: 70000,
    image: image,
    oldPrice: 85000,
  }, {
    id: 3,
    name: "بادام هندی برشته فلفلی",
    price: 70000,
    image: image,
    oldPrice: 85000,
  },
  // بقیه محصولات تکراری را حذف کردم – اگر نیاز دارید نگه دارید
  // اگر واقعاً ۸–۱۰ تا کارت می‌خواهید، اینجا تکرار کنید
];

export default function SpecialOfferBox({ title, description, img, ref }) {
  return (
    <section
      ref={ref}
      id="special-offer"
      className="bg-myb py-8 md:py-12 mt-[5%]"
    >
      <div className="px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
        {/* Main card – در موبایل بالای لیست می‌آید */}
        <div className="flex flex-col items-center mb-7 md:mb-0 md:hidden">
          <SpecialOfferBoxMainCard title={title} description={description} img={img} />
        </div>

        <div className="flex flex-col md:flex-row md:items-start md:gap-7 lg:gap-10">
          {/* Main card فقط در دسکتاپ */}
          <div className="hidden md:flex md:flex-col md:items-center md:w-72 lg:w-80 flex-shrink-0">
            <SpecialOfferBoxMainCard title={title} description={description} img={img} />
          </div>

          {/* لیست کارت‌ها – افقی اسکرول در موبایل */}
          <div className="overflow-x-auto pb-4 -mx-1 px-1 scrollbar-thin scrollbar-thumb-gray-400">
            <div className="flex gap-4 sm:gap-5 md:gap-6 min-w-max">
              {products.map((product) => (
                <SpecialOfferBoxCard
                  key={product.id}
                  id={product.id}
                  title={product.name}
                  payPrice={product.price}
                  offPrice={product.oldPrice}
                  img={product.image}
                  basketCount={0}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}