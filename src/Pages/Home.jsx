// src/pages/Home.jsx
import React from "react";
import Header from "../Component/header";
import Hero from "../Component/Home/Hero";
// بعداً بقیه کامپوننت‌ها رو import می‌کنیم
import { useState } from "react";
import ImageAboutUsVideoThumb from "@assets/ax/ups/video_cap.jpg";
import VideoAboutUsVideoThumb from "@assets/ax/ups/video_2025-02-12_21-31-39.mp4";
import cert1 from "@assets/ax/ups/2025/02/Group-863.jpg";
import cert2 from "@assets/ax/ups/2025/02/cer1.png";
import { CategoryCard } from "@/Component/Home/Category";
import ImageMain from "@assets/ax/ups/2025/02/Vector_2.png";
import SpecialOfferBox from "@/Component/Home/SpecialOfferBox";
import GridMainProductCard from "@/Component/Home/Product/GridMainProductCard";
import ArticlesCarousel from "@/Component/Home/News/ArticlesCarousel";
import ImageBackgroundContactUS from "@assets/ax/ups/2025/04/back.png";
import ImageSignContactUS from "@assets/ax/ups/2025/04/r.php-63.png";
import ContactusField from "@/Component/Home/ContactUs/ContactUsField";
import ContactUsFieldIconOnly from "@/Component/Home/ContactUs/ContactUsFieldIconOnly";
import Footer from "@/Component/Footer";
import { useLazyInView } from "@/Tools/LazyLoading";
import { FadeIn } from "@/Tools/FadeIn";
import FooterUpper from "@/Component/FooterUpper";

function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [refHero, visibleHero] = useLazyInView();
  const [ref, visible] = useLazyInView();
  const [refAboutUs, visibleAboutUs] = useLazyInView();
  const [refCategory, visibleCategory] = useLazyInView();
  const [refOffer, visibleOffer] = useLazyInView();
  const [refpopular, visiblepopular] = useLazyInView();
  const [refnews, visiblenews] = useLazyInView();

  return (
    <>
      <section
        id="Hero"
        className={`bg-linear-to-b from-[#11207A] to-[#2F3D94] `}
      >
        <Header className="z-50" />
        <hr className="mb-6 border-gray-300 dark:border-gray-700 mx-60" />
        <Hero />
      </section>
      {/* Section کارت about us */}
      <FadeIn innerRef={refAboutUs} visible={visibleAboutUs} fade="up">
        <section
          id="about-us"
          className={`
      mx-auto max-w-7xl px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20
      bg-white rounded-3xl sm:rounded-full shadow-lg shadow-gray-300/50
      lg:rounded-4xl
      mt-[-5%] sm:mt-[-8%] md:mt-[-10%]
      min-h-[40vh] sm:min-h-[50vh] md:min-h-[60vh]
      
      py-10 sm:py-12 md:py-16 lg:py-20
      transition-all duration-700 ease-out
      ${visibleAboutUs ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
    `}
        >
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16 items-start">
            {/* توضیحات درباره ما */}
            <div className="flex-1 font-['YekanBakh'] order-2 lg:order-1">
              <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#202020]">
                درباره ما
              </h1>
              <h1 className="font-semibold text-xl sm:text-2xl md:text-3xl mt-3 text-[#202020]">
                ما باغداریم، همین!
              </h1>

              <p className="text-justify mt-5 sm:mt-6 md:mt-8 text-[#606060] text-base sm:text-lg leading-relaxed">
                پسته و آجیل برای ما یادگار درختانی است که خودمان کاشتیم و با جان
                و دل بزرگ کردیم. راه طولانی‌ای رفتیم تا امروز یکی از
                باکیفیت‌ترین‌ها باشیم؛ چون از باغ تا بسته‌بندی، همه کار دست
                خودمان است و این یعنی طعم فرق می‌کند.
              </p>

              <div className="flex flex-wrap sm:flex-row gap-6 sm:gap-10 md:gap-12 items-center justify-center mt-10 sm:mt-12 md:mt-14">
                <div className="flex flex-col gap-1 min-w-[80px] text-center">
                  <h1 className="text-[#11207A] font-semibold text-3xl sm:text-4xl">
                    59
                  </h1>
                  <h2 className="text-[#BBD430] text-sm sm:text-base">
                    تعداد محصول
                  </h2>
                </div>

                <div className="hidden sm:block w-px h-14 bg-gray-300" />

                <div className="flex flex-col gap-1 min-w-[80px] text-center">
                  <h1 className="text-[#11207A] font-semibold text-3xl sm:text-4xl">
                    118
                  </h1>
                  <h2 className="text-[#BBD430] text-sm sm:text-base">
                    بازاریاب
                  </h2>
                </div>

                <div className="hidden sm:block w-px h-14 bg-gray-300" />

                <div className="flex flex-col gap-1 min-w-[80px] text-center">
                  <h1 className="text-[#11207A] font-semibold text-3xl sm:text-4xl">
                    339
                  </h1>
                  <h2 className="text-[#BBD430] text-sm sm:text-base">
                    واحد فروش
                  </h2>
                </div>
              </div>

              <div className="mt-10 sm:mt-12 md:mt-14 flex justify-start">
                <a
                  href="shop.html"
                  className="
              inline-flex items-center justify-center gap-2.5
              px-6 py-3 sm:px-7 sm:py-3.5
              text-sm sm:text-base font-medium
              text-white bg-[#11207A] hover:bg-transparent 
              hover:border-[#11207A] hover:text-[#11207A]
              border-2 border-transparent
              rounded-3xl sm:rounded-4xl
              transition-all duration-300
              shadow-md hover:shadow-lg
            "
                  dir="ltr"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 448 512"
                    fill="currentColor"
                  >
                    <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                  </svg>
                  <span>خرید حضوری به همراه دامغان گردی</span>
                </a>
              </div>
            </div>

            {/* ویدئوی درباره ما + مجوزها */}
            <div className="flex-1 flex flex-col items-center order-1 lg:order-2">
              {/* Thumbnail + مودال */}
              <div
                className="relative cursor-pointer w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto"
                onClick={() => setIsOpen(true)}
              >
                <img
                  src={ImageAboutUsVideoThumb}
                  alt="Video Thumbnail"
                  className="w-full rounded-2xl sm:rounded-3xl shadow-lg object-cover"
                />
                {/* Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="w-14 h-14 sm:w-16 sm:h-16 text-white opacity-80 drop-shadow-lg"
                    viewBox="0 0 448 512"
                    fill="currentColor"
                  >
                    <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" />
                  </svg>
                </div>
              </div>

              {/* Modal - بدون تغییر */}
              {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4">
                  <div className="relative w-full max-w-4xl">
                    <button
                      className="absolute -top-10 right-0 sm:-top-12 sm:right-2 text-white text-3xl font-bold"
                      onClick={() => setIsOpen(false)}
                    >
                      ×
                    </button>
                    <video
                      className="w-full rounded-lg shadow-2xl"
                      controls
                      autoPlay
                    >
                      <source src={VideoAboutUsVideoThumb} type="video/mp4" />
                      مرورگر شما از پخش ویدئو پشتیبانی نمی‌کند.
                    </video>
                  </div>
                </div>
              )}

              {/* مجوزها */}
              <div className="flex flex-row flex-wrap gap-6 sm:gap-8 md:gap-10 mt-10 sm:mt-12 md:mt-16 items-center justify-center">
                <h1 className="font-['YekanBakh'] text-[#11207A] text-lg sm:text-xl font-bold whitespace-nowrap">
                  مجوزها:
                </h1>
                <img
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                  src={cert1}
                  alt="مجوز ۱"
                />
                <img
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                  src={cert2}
                  alt="مجوز ۲"
                />
                <img
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                  src={cert1}
                  alt="مجوز ۳"
                />
              </div>
            </div>
          </div>
        </section>
      </FadeIn>
      {/* سکشن دسته بندی */}
      <section
        ref={refCategory}
        id="category"
        className="flex flex-col items-center mt-10 md:mt-14 px-5 sm:px-8 md:px-12 lg:px-16 bg-transparent"
      >
        <h1 className="font-bold text-myb text-xl sm:text-2xl md:text-3xl">
          دسته بندی محصولات
        </h1>

        <p className="text-xs sm:text-sm text-myg mt-2 md:mt-3">
          دستچین شده از باغهای سبز دامغان
        </p>

        {/* cat grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-7 mt-6 md:mt-8 w-full max-w-7xl">
          {/* cat cards here */}
          <CategoryCard title="گردوی داغ" description="محصول 15 باغ" />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
        </div>
      </section>
      {/* سکشن فروش ویژه */}
      <SpecialOfferBox
        ref={refOffer}
        title={"پیشنهاد شگفت انگیز"}
        description={"از باغدار بخر"}
        img={ImageMain}
      />
      {/* سکشن پرفروش ترین محصولات */}
      <section
        ref={refpopular}
        id="popular-products"
        className="
    flex flex-col items-center 
    bg-white 
    px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 
    pt-8 md:pt-10 pb-10 md:pb-12
  "
      >
        <h1
          className="
      font-extrabold text-myb 
      text-xl xs:text-2xl sm:text-2.5xl md:text-3xl 
      tracking-tight
    "
        >
          پرفروش ترین محصولات
        </h1>

        <p className="text-xs sm:text-sm text-myg mt-2 md:mt-3">
          از محصولات محبوب ما دیدن کنید
        </p>

        <div
          className="
      grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 
      md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 
      gap-4 xs:gap-5 sm:gap-6 md:gap-7 
      mt-6 md:mt-8 w-full 
      max-w-7xl mx-auto
    "
        >
          <GridMainProductCard />
          <GridMainProductCard />
          <GridMainProductCard />
          <GridMainProductCard />
          <GridMainProductCard />
          <GridMainProductCard />
          <GridMainProductCard />
          <GridMainProductCard />
          <GridMainProductCard />
          {/* اگر تعداد بیشتری نیاز دارید اینجا اضافه کنید */}
        </div>
      </section>
      {/* آموزش خرید */}

      <section
        id="tutorial"
        className="
    flex flex-col lg:flex-row 
    items-center lg:items-start 
    gap-8 lg:gap-12 xl:gap-15
    px-5 sm:px-8 md:px-12 lg:mx-60 lg:px-0
    py-10 sm:py-12 md:py-16 lg:py-20
    mt-12 sm:mt-16 lg:mt-[8%]
    bg-transparent
    min-h-[40vh] lg:min-h-50
  "
      >
        {/* ویدئو – در موبایل اول نمایش داده می‌شود */}
        <div className="w-full lg:flex-1 order-1 lg:order-2">
          <div
            className="
        relative cursor-pointer 
        rounded-2xl sm:rounded-3xl 
        overflow-hidden 
        shadow-lg hover:shadow-xl 
        transition-shadow
      "
            onClick={() => setIsOpen(true)}
          >
            <img
              src={ImageAboutUsVideoThumb}
              alt="ویدئو آموزش خرید"
              className="
          w-full h-auto 
          aspect-video 
          object-cover
        "
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/25 hover:bg-black/15 transition-colors">
              <svg
                className="
            w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 
            text-white opacity-90
          "
                viewBox="0 0 448 512"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" />
              </svg>
            </div>
          </div>

          {/* مودال ویدئو */}
          {isOpen && (
            <div
              className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 px-4"
              onClick={() => setIsOpen(false)}
            >
              <div
                className="relative w-full max-w-4xl lg:max-w-5xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="
              absolute -top-10 right-2 text-white text-3xl sm:text-4xl
              hover:text-gray-300 transition-colors
            "
                  onClick={() => setIsOpen(false)}
                >
                  ×
                </button>

                <video
                  className="w-full rounded-xl shadow-2xl"
                  controls
                  autoPlay
                >
                  <source src={VideoAboutUsVideoThumb} type="video/mp4" />
                  مرورگر شما از پخش ویدئو پشتیبانی نمی‌کند.
                </video>
              </div>
            </div>
          )}
        </div>

        {/* متن + دکمه – در موبایل بعد از ویدئو */}
        <div className="w-full lg:flex-1 order-2 lg:order-1 mt-8 lg:mt-0">
          <h1 className="font-extrabold text-[#202020] text-2xl xs:text-3xl sm:text-3.5xl lg:text-4xl leading-tight text-center lg:text-right">
            آموزش خرید از سایت
          </h1>

          <h2 className="font-semibold text-[#202020] text-lg xs:text-xl sm:text-2xl mt-2 md:mt-3 text-center lg:text-right">
            مرحله به مرحله خرید از سایت
          </h2>

          <p className="text-justify text-[#606060] text-sm xs:text-base sm:text-lg leading-relaxed mt-5 sm:mt-6 lg:mt-8 max-w-3xl mx-auto lg:mx-0">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،
            و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای
            زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و
            متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان
            رایانه ای...
          </p>

          <div className="flex justify-center lg:justify-start mt-6 sm:mt-8">
            <a
              href="shop.html"
              className="
          inline-flex items-center justify-center gap-2 sm:gap-2.5
          px-6 py-2.5 xs:px-7 xs:py-3 sm:px-8 sm:py-3.5
          text-sm sm:text-base font-medium
          text-white bg-[#11207A] 
          hover:bg-transparent hover:text-[#11207A]
          border-2 border-transparent hover:border-[#11207A]
          rounded-3xl lg:rounded-4xl
          transition-all duration-200
          shadow-sm hover:shadow
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        "
              dir="rtl"
            >
              <span>بیشتر بخوانید</span>
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                viewBox="0 0 448 512"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
            </a>
          </div>
        </div>
      </section>
      {/* سکشن بنر1 */}
      <section
        id="banners1"
        className="
    flex flex-col md:flex-row
    gap-4 sm:gap-5 md:gap-5 lg:gap-5
    mt-8 sm:mt-10 md:mt-12 lg:mt-[6%]
    px-4 sm:px-6 md:px-8 lg:px-0
    mx-4 sm:mx-6 md:mx-10 lg:mx-60
  "
      >
        <a href="http://google.com" className="block w-full md:flex-1">
          <img
            src="https://jiawaz-nuts.bantaco.ir/wp-content/uploads/2025/05/IMG_20240730_132039_730-min-768x222.jpg"
            className="
        w-full h-auto
        aspect-[3/1] md:aspect-auto
        object-cover
        rounded-2xl sm:rounded-3xl md:rounded-4xl
      "
            alt=""
          />
        </a>

        <a href="http://google.com" className="block w-full md:flex-1">
          <img
            src="https://jiawaz-nuts.bantaco.ir/wp-content/uploads/2025/05/IMG_20240730_132039_730-min-768x222.jpg"
            className="
        w-full h-auto
        aspect-[3/1] md:aspect-auto
        object-cover
        rounded-2xl sm:rounded-3xl md:rounded-4xl
      "
            alt=""
          />
        </a>
      </section>
      {/* سکشن اخبار */}
      <section
        ref={refnews}
        id="news"
        className="
    flex flex-col items-center bg-white
    px-4 pt-16
    sm:px-8
    md:px-20 md:pt-[6%]
    lg:px-40
    xl:px-60
  "
      >
        <h1 className="font-extrabold text-myb text-xl md:text-2xl">
          اخبار و مطالب
        </h1>

        <p className="text-xs md:text-sm text-myg mt-1 text-center">
          مطالب های آموزشی و معرفی محصولات
        </p>

        <ArticlesCarousel />
      </section>
      {/* سکشن فرم تماس با ما */}
      <section
        id="contactus"
        className="relative w-full bg-white mt-16 md:mt-[5%]"
      >
        {/* تصویر پس‌زمینه */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-85"
          style={{ backgroundImage: `url(${ImageBackgroundContactUS})` }}
        />

        {/* محتوای اصلی */}
        <div
          className="
      relative z-10 bg-myb
      mx-4 my-10
      md:mx-[20%]
      lg:mx-[32%]
      px-4 py-6
      rounded-3xl
      flex flex-col gap-8
      md:flex-row md:items-start
    "
        >
          {/* سمت فرم */}
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <h1 className="font-bold text-xl md:text-2xl text-white">
              مشاوره و <span className="text-[#BBD430]">ثبت سفارش</span>
            </h1>

            <p className="text-xs text-white mt-1">
              لطفا اطلاعاتتان را در فرم زیر وارد کنید.
            </p>

            <input
              type="text"
              placeholder="نام و نام خانوادگی"
              className="bg-white rounded-md w-full md:w-2xs px-4 py-2 shadow-md border border-gray-300 text-xs focus:outline-none focus:ring focus:ring-[#BBD430] focus:border-[#BBD430] transition-all"
            />

            <input
              type="tel"
              placeholder="شماره تماس"
              className="bg-white rounded-md w-full md:w-2xs px-4 py-2 shadow-md border border-gray-300 text-xs text-right focus:outline-none focus:ring focus:ring-[#BBD430] focus:border-[#BBD430] transition-all"
            />

            <button className="bg-myg rounded-md w-full md:w-2xs text-xs py-2 text-center mt-2 cursor-pointer">
              ارسال
            </button>
          </div>

          {/* سمت تماس */}
          <div className="flex flex-col items-center w-full md:flex-1 text-center ml-[15%]">
            <div className="w-13 h-13 inline-block transform rotate-315 bg-myg rounded-full transition-transform duration-300 hover:scale-110 p-4">
              <svg
                aria-hidden="true"
                className="scale-90 text-white"
                viewBox="0 0 384 512"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
              >
                <path d="M97.333 506.966c-129.874-129.874-129.681-340.252 0-469.933 5.698-5.698 14.527-6.632 21.263-2.422l64.817 40.513a17.187 17.187 0 0 1 6.849 20.958l-32.408 81.021a17.188 17.188 0 0 1-17.669 10.719l-55.81-5.58c-21.051 58.261-20.612 122.471 0 179.515l55.811-5.581a17.188 17.188 0 0 1 17.669 10.719l32.408 81.022a17.188 17.188 0 0 1-6.849 20.958l-64.817 40.513a17.19 17.19 0 0 1-21.264-2.422zM247.126 95.473c11.832 20.047 11.832 45.008 0 65.055-3.95 6.693-13.108 7.959-18.718 2.581l-5.975-5.726c-3.911-3.748-4.793-9.622-2.261-14.41a32.063 32.063 0 0 0 0-29.945c-2.533-4.788-1.65-10.662 2.261-14.41l5.975-5.726c5.61-5.378 14.768-4.112 18.718 2.581zm91.787-91.187c60.14 71.604 60.092 175.882 0 247.428-4.474 5.327-12.53 5.746-17.552.933l-5.798-5.557c-4.56-4.371-4.977-11.529-.93-16.379 49.687-59.538 49.646-145.933 0-205.422-4.047-4.85-3.631-12.008.93-16.379l5.798-5.557c5.022-4.813 13.078-4.394 17.552.933zm-45.972 44.941c36.05 46.322 36.108 111.149 0 157.546-4.39 5.641-12.697 6.251-17.856 1.304l-5.818-5.579c-4.4-4.219-4.998-11.095-1.285-15.931 26.536-34.564 26.534-82.572 0-117.134-3.713-4.836-3.115-11.711 1.285-15.931l5.818-5.579c5.159-4.947 13.466-4.337 17.856 1.304z" />
              </svg>
            </div>

            <h1 className="text-white font-bold mt-5">021-98898989</h1>

            <span className="text-[65%] text-white mt-1">
              همین حالا تماس بگیر
            </span>

            <img
              src={ImageSignContactUS}
              className="
      hidden md:block
      transform rotate-180 scale-x-[-1]
      h-20 mt-5
      mx-auto
    "
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
