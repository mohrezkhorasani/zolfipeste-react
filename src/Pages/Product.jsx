import React from "react";
import HeaderStickTop from "../Component/HeaderStickTop";
import Hero from "../Component/Home/Hero";
import { useParams } from "react-router-dom";
import { AlertTop } from "@/Component/AlertTop";
import BreadCrumbParent from "@/Component/BreadCrumbParent";
import { FaSearch } from "react-icons/fa";
import ProductDetailBox from "@/Component/Product/ProductDetailBox";
import Tabs from "../Component/tabs";

export default function Product() {
  const { id } = useParams();
  const breadCrumbs = [
    { label: "خانه", href: "/" },
    { label: "محصولات", href: "/products" },
    { label: "پسته احمدآقایی", href: "/products/ahmadaghayi" },
  ];
  const product = {
    name: "پسته احمدآقایی برشته دو آتشه زعفرانی",
    description: `
شاید بیراه نباشد که بگوییم در میان آجیل و مغزها، پسته جایگاهی بی‌بدیل برای ما ایرانیان دارد. و بیخود نیست که مهد پسته جهان ایران است و مرغوب‌ترین پسته‌ها در ایران یافت می‌شود. یکی از این پسته‌های جذاب و خوشمزه، پسته احمدآقایی است که ظاهری کشیده دارد و جزو پسته‌های مرغوب موجود در بازار ایران است.
`,
    priceFrom: 350000,
    priceTo: 500000,
    discount: 20, // درصد تخفیف
    images: [
      "https://jiawaz-nuts.bantaco.ir/wp-content/uploads/2025/05/strong-roasted-saffron-ahmad-aghaei-pistachios-barjil-376-1.webp",
      "https://jiawaz-nuts.bantaco.ir/wp-content/uploads/2025/05/404-Roasted-cashews-Parsley-Onions-300x300.webp",
      "https://jiawaz-nuts.bantaco.ir/wp-content/uploads/2025/02/Vector_2.png",
      "https://jiawaz-nuts.bantaco.ir/wp-content/uploads/2025/05/high-quality-roasted-saffron-ahmad-aghaei-pistachios-barjil-169-1.webp",
    ],
  };

  const tabs = [
    {
      id: "profile",
      title: "توضیحات",
      iconClass: "icon-info me-1",
      content: <p>توضیحات</p>,
    },
    {
      id: "settings",
      title: "توضیحات تکمیلی",
      iconClass: "icon-menu me-1",
      content: <div className="flex flex-col gap-1">
        <hr className="w-full border-t border-gray-300 my-4" />
        
      </div>
    },
    {
      id: "reports",
      title: " نظرات (0) ",
      iconClass: "icon-message-square me-1",
      content: <p>لیست گزارش‌ها</p>,
    },
  ];
  return (
    <div dir="rtl" className="min-h-screen bg-white">
      <HeaderStickTop className="z-50" />

      <section
        id="alrets"
        className="px-4 sm:px-10 md:px-20 lg:px-60 mt-2 flex flex-col gap-2"
      >
        <AlertTop />
        <AlertTop
          status={400}
          text="حساب شما به دلیل درخواست های مکرر فعلا مسدود گشته است!"
          buttonText="مشاهده دلیل"
        />
      </section>

      <section id="bread-crumb" className="flex w-full px-4 md:px-60 mt-2">
        <BreadCrumbParent breadCrumbs={breadCrumbs} />
      </section>
      <ProductDetailBox product={product} />

      <div className="px-4 sm:px-10 md:px-20 lg:px-60 flex flex-col gap-2 bg-white shadow-lg mt-[3%] rounded-md">
        <Tabs tabs={tabs} defaultTabId="profile" />
      </div>
    </div>
  );
}
