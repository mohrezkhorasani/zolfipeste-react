import React from "react";
import HeaderStickTop from "../Component/HeaderStickTop";
import Hero from "../Component/Home/Hero";
import { useParams } from "react-router-dom";
import { AlertTop } from "@/Component/AlertTop";
import BreadCrumbParent from "@/Component/BreadCrumbParent";
import { FaSearch } from "react-icons/fa";
import ProductDetailBox from "@/Component/Product/ProductDetailBox";
import Tabs from "../Component/tabs";
import ProductFilter from "../Component/Product/ProductFilter";
import FilterDetailsSummery from "../Component/Home/Product/FilterDetailsSummery";
import FilterDetail from "../Component/Product/ProductFilterDetail";
import CommentBox from "../Component/CommentBox";
import CommentCard from "../Component/CommentCard";
import FooterUpper from "../Component/FooterUpper";
import Footer from "../Component/Footer";

export default function Product() {
  const { id } = useParams();
  const breadCrumbs = [
    { label: "خانه", href: "/" },
    { label: "محصولات", href: "/products" },
    { label: "پسته احمدآقایی", href: "/products/ahmadaghayi" },
  ];
  const comments = []
  const product = {
    name: "پسته احمدآقایی برشته دو آتشه زعفرانی",
    description: `
شاید بیراه نباشد که بگوییم در میان آجیل و مغزها، پسته جایگاهی بی‌بدیل برای ما ایرانیان دارد. و بیخود نیست که مهد پسته جهان ایران است و مرغوب‌ترین پسته‌ها در ایران یافت می‌شود. یکی از این پسته‌های جذاب و خوشمزه، پسته احمدآقایی است که ظاهری کشیده دارد و جزو پسته‌های مرغوب موجود در بازار ایران است.
`,
    priceFrom: 350000,
    priceTo: 500000,
    commentCount: 51,
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
      content: <p className="text-[#555555] text-justify text-sm">درصد خندان بودن پسته اکبری بسیار بالا است و دارای مغزی به رنگ بنفش و قهوه‌‌ای و رنگ پوست کرم استخوانی تیره است. پسته اکبری پسته‌ای با ظاهر بسیار کشیده و بزرگ است و شکل ظاهری آن مانند پسته احمدآقایی است البته این پسته نسبت به پسته احمدآقایی دارای ظاهری کشیده‌تر است. پسته اکبری برشته زعفرانی اعلی بارجیل با رنگ و طعم دوست‌داشتنی زعفرانی و برشته یکی از خوشمزه‌ترین پسته‌های اعلی و با کیفیت در بازار خشکبار می‌باشد. شما می‌توانید این پسته خندان، لوکس و مجلسی را از طریق سایت جیاواز به صورت آنلاین در بسته‌بندی‌های دلخواهتان خریداری نمایید و آن را در مخلوط انواع آجیل‌های عیدنوروز، شب یلدا، مشکل گشا و… ترکیب نمایید. این پسته خندان و مرغوب بهترین هدیه برای عزیزان و دوستان‌تان است پس در خرید آن شک نکنید.</p>,
    },
    {
      id: "settings",
      title: "توضیحات تکمیلی",
      iconClass: "icon-menu",
      content: <div className="flex flex-col gap-0">
        <hr className="w-full border-t border-gray-100" />
        <FilterDetail
          title={"وزن"}
          value={"250 گرم"}
        />
        <hr className="w-full border-t border-gray-100" />
        <FilterDetail
          title={"نوع بسته بندی"}
          value={"پاکت زیپ دار, قوطی فلزی"}
          className={"bg-gray-100"}
        />
        <hr className="w-full border-t border-gray-100 " />
        <FilterDetail
          title={"ماندگاری"}
          value={"12 ماه"}
        />

      </div>
    },
    {
      id: "reports",
      title: `نظرات (${product.commentCount})`,
      iconClass: "icon-message-square me-1",
      content: <div className="flex flex-col">
        {
          comments.length > 0 ?
            <div className="flex flex-col gap-3">
              {comments.map((c, i) => (
                <CommentCard
                  key={i}
                  name={c.name}
                  date={c.date}
                  rating={c.rating}
                  comment={c.comment}
                  avatar={c.avatar}
                />
              ))}
            </div>
            :
            <div className="p-6 text-center text-gray-500 bg-gray-50 rounded-lg">
              هنوز کامنتی ثبت نشده است.
            </div>
        }

        <CommentBox />
      </div>,
    },
  ];
  return (

    <>
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

      <div className="mx-4 sm:mx-10 md:mx-20 lg:mx-60 flex flex-col gap-2 bg-white  mt-[3%] ">
        <Tabs tabs={tabs} defaultTabId="profile" />
      </div>
    </>
  );
}
