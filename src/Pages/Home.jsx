// src/pages/Home.jsx
import React from 'react';
import Header from '../Component/header';
import Hero from '../Component/Home/Hero';
// بعداً بقیه کامپوننت‌ها رو import می‌کنیم
import { useState } from "react";
import ImageAboutUsVideoThumb from "@assets/ax/ups/video_cap.jpg"
import VideoAboutUsVideoThumb from "@assets/ax/ups/video_2025-02-12_21-31-39.mp4"
import cert1 from "@assets/ax/ups/2025/02/Group-863.jpg"
import cert2 from "@assets/ax/ups/2025/02/cer1.png"
import { CategoryCard } from '@/Component/Home/Category';
import ImageMain from '@assets/ax/ups/2025/02/Vector_2.png'
import SpecialOfferBox from '@/Component/Home/SpecialOfferBox';
import GridMainProductCard from '@/Component/Home/Product/GridMainProductCard';
import ArticlesCarousel from '@/Component/Home/News/ArticlesCarousel';
import ImageBackgroundContactUS from '@assets/ax/ups/2025/04/back.png';
import ImageSignContactUS from '@assets/ax/ups/2025/04/r.php-63.png';
import ContactusField from '@/Component/Home/ContactUs/ContactUsField';
import ContactUsFieldIconOnly from '@/Component/Home/ContactUs/ContactUsFieldIconOnly';
import Footer from '@/Component/Footer';
import { useLazyInView } from '@/Tools/LazyLoading';
import { FadeIn } from '@/Tools/FadeIn';
import FooterUpper from '@/Component/FooterUpper';


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
        <div dir="rtl" className="min-h-screen bg-white">

                <section id='Hero' className={`bg-linear-to-b from-[#11207A] to-[#2F3D94] `}>
                    <Header className="z-50" />
                    <hr className="mb-6 border-gray-300 dark:border-gray-700 mx-60" />
                    <Hero />
                </section>
            

            {/* Section کارت about us */}
            <FadeIn innerRef={refAboutUs} visible={visibleAboutUs} fade='up'>
                <section id="about-us"
                    className={`mx-60 flex flex-row bg-white rounded-4xl shadow-lg object-cover shadow-gray-300 gap-15
                        mt-[-10%] min-h-50 px-15 pt-[5%] pb-[2%] transition-all duration-700 ease-out
                        ${visibleAboutUs
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-10"
                        }`}>
                    {/*توضیحات درباره ما */}
                    <div className="flex-1 flex-col font-['YekanBakh'] ">
                        <h1 className='font-extrabold text-3xl text-[#202020]'> درباره ما </h1>
                        <h1 className='font-semibold text-2xl mt-2 text-[#202020]'> ما باغداریم، همین! </h1>
                        <p className='text-justify mt-6 text-[#606060]'>پسته و آجیل برای ما یادگار درختانی است که خودمان کاشتیم و با جان و دل بزرگ کردیم.
                            راه طولانی‌ای رفتیم تا امروز یکی از باکیفیت‌ترین‌ها باشیم؛ چون از باغ تا بسته‌بندی، همه کار دست خودمان است و این یعنی طعم فرق می‌کند.
                        </p>
                        <div className="flex flex-row gap-5 items-stretch  font-['YekanBakhFaNum']  justify-center mt-14">
                            <div className='flex-col gap-1'>
                                <h1 className='text-[#11207A] font-semibold text-3xl text-center'>59</h1>
                                <h2 className='text-[#BBD430]'>تعداد محصول</h2>
                            </div>
                            <div className="w-px  bg-transparent border-dashed border-b-gray-100 dark:border-b-gray-300 text-gray-200 border mx-4"></div>
                            <div className='flex-col gap-1'>
                                <h1 className='text-[#11207A] font-semibold text-3xl text-center'>118</h1>
                                <h2 className='text-[#BBD430]'>بازاریاب</h2>
                            </div>
                            <div className="w-px  bg-transparent border-dashed border-b-gray-100 dark:border-b-gray-300 text-gray-200 border mx-4"></div>
                            <div className='flex-col  gap-1'>
                                <h1 className='text-[#11207A] font-semibold text-3xl text-center'>339</h1>
                                <h2 className='text-[#BBD430]'>واحد فروش</h2>
                            </div>
                        </div>
                        <a
                            href="shop.html"
                            className="
                            inline-flex items-center justify-center gap-2.5
                            px-5 py-2.5 text-sm font-medium
                            text-[#FFFfff] bg-[#11207A] hover:bg-transparent  hover:border-[#11207A] border-0 hover:border-2 hover:text-[#11207A]
                            rounded-4xl transition-colors duration-200 
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                            shadow-sm hover:shadow
                            mt-15 mr-4
                        " dir='ltr'
                        >
                            {/* آیکون (SVG همان Elementor) */}
                            <span className="inline-flex items-center">
                                <svg
                                    aria-hidden="true"
                                    className="w-4 h-4"
                                    viewBox="0 0 448 512"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                >
                                    <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                                </svg>
                            </span>

                            <span>خرید حضوری به همراه دامغان گردی</span>
                        </a>
                    </div>

                    {/* ویدئوی درباره ما */}
                    <div className="flex-1 flex flex-col items-center justify-center">
                        {/* Thumbnail */}
                        <div
                            className="relative cursor-pointer"
                            onClick={() => setIsOpen(true)}
                        >
                            <img
                                src={ImageAboutUsVideoThumb}
                                alt="Video Thumbnail"
                                className="w-full max-w-md rounded-2xl shadow-lg"
                            />
                            {/* Play Icon */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <svg
                                    aria-hidden="true"
                                    className="w-16 h-16 text-white opacity-80"
                                    viewBox="0 0 448 512"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                            </div>
                        </div>

                        {/* Modal */}
                        {isOpen && (
                            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                                <div className="relative w-full max-w-3xl">
                                    <button
                                        className="absolute top-2 right-2 text-white text-2xl font-bold"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        &times;
                                    </button>
                                    <video
                                        className="w-full rounded-lg shadow-lg"
                                        controls
                                        autoPlay
                                    >
                                        <source src={VideoAboutUsVideoThumb} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            </div>
                        )}
                        <div className='flex flex-row gap-10 mt-15 items-center'>
                            <h1 className="font-['YekanBakh'] text-[#11207A] text-center font-bold ">مجوزها:</h1>
                            <img
                                className="w-16 h-16 "
                                src={cert1}
                            />
                            <img
                                className="w-16 h-16 "
                                src={cert2}
                            />
                            <img
                                className="w-16 h-16 "
                                src={cert1}
                            />
                        </div>
                    </div>

                </section>
            </FadeIn>
            {/* سکشن دسته بندی */}
            <section ref={refCategory} id='category' className='flex flex-col mx-60 bg-transparent items-center mt-14'>
                <h1 className="font-bold text-myb text-2xl">دسته بندی محصولات</h1>
                <p className='text-xs text-myg mt-1'>دستچین شده از باغهای سبز دامغان</p>
                {/* cat grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-3 gap-6 mt-6 w-full">
                    {/* cat cards here */}
                    <CategoryCard
                        title='گردوی داغ'
                        description='محصول 15 باغ'
                    />
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
            <section ref={refpopular} id='popular-products' className="flex flex-col items-center bg-white px-60 pt-8">
                <h1 className="font-extrabold text-myb text-2xl">پرفروش ترین محصولات</h1>
                <p className='text-xs text-myg mt-1'>از محصولات محبوب ما دیدن کنید</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5  lg:grid-cols-6 gap-3 mt-6 w-full">
                    <GridMainProductCard />
                    <GridMainProductCard />
                    <GridMainProductCard />
                    <GridMainProductCard />
                    <GridMainProductCard />
                    <GridMainProductCard />
                </div>
            </section>

            {/* آموزش خرید */}
            <section id="tutorial"
                className='mx-60 flex flex-row bg-transparent rounded-4xl object-cover  gap-15
                        mt-[8%] min-h-50
            '>
                {/*توضیحات درباره ما */}
                <div className="flex-1 flex-col font-['YekanBakh'] ">
                    <h1 className='font-extrabold text-3xl text-[#202020]'> آموزش خرید از سایت </h1>
                    <h1 className='font-semibold mt-2 text-[#202020]'> مرحله مرحله خرید از سایت </h1>
                    <p className='text-justify mt-6 text-[#606060]'>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای
                    </p>

                    <a
                        href="shop.html"
                        className="
                            inline-flex items-center justify-center gap-2.5
                            px-5 py-2.5 text-sm font-medium
                            text-[#FFFfff] bg-[#11207A] hover:bg-transparent  hover:border-[#11207A] border-0 hover:border-2 hover:text-[#11207A]
                            rounded-4xl transition-colors duration-200 
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                            shadow-sm hover:shadow
                            mt-4 
                        " dir='ltr'
                    >
                        {/* آیکون (SVG همان Elementor) */}
                        <span className="inline-flex items-center">
                            <svg
                                aria-hidden="true"
                                className="w-4 h-4"
                                viewBox="0 0 448 512"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                            >
                                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                            </svg>
                        </span>

                        <span>بیشتر بخوانید</span>
                    </a>
                </div>
                {/* ویدئوی آموزش خرید */}
                <div className="flex-1 flex flex-col items-center justify-center">
                    {/* Thumbnail */}
                    <div
                        className="relative cursor-pointer"
                        onClick={() => setIsOpen(true)}
                    >
                        <img
                            src={ImageAboutUsVideoThumb}
                            alt="Video Thumbnail"
                            className="w-full rounded-2xl shadow-lg"
                        />
                        {/* Play Icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <svg
                                aria-hidden="true"
                                className="w-16 h-16 text-white opacity-80"
                                viewBox="0 0 448 512"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"
                                    fill="currentColor"
                                ></path>
                            </svg>
                        </div>
                    </div>

                    {/* Modal */}
                    {isOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                            <div className="relative w-full max-w-3xl">
                                <button
                                    className="absolute top-2 right-2 text-white text-2xl font-bold"
                                    onClick={() => setIsOpen(false)}
                                >
                                    &times;
                                </button>
                                <video
                                    className="w-full rounded-lg shadow-lg"
                                    controls
                                    autoPlay
                                >
                                    <source src={VideoAboutUsVideoThumb} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                    )}

                </div>

            </section>

            {/* سکشن بنر1 */}
            <section id='banners1' className="flex flex-row mt-[6%] mx-60 gap-5">
                <a href='http://google.com'
                    className='flex-1 flex '
                >
                    <img
                        src='https://jiawaz-nuts.bantaco.ir/wp-content/uploads/2025/05/IMG_20240730_132039_730-min-768x222.jpg'
                        className='object-cover rounded-4xl'
                    />
                </a>
                <a href='http://google.com'
                    className='flex-1 flex'
                >
                    <img
                        src='https://jiawaz-nuts.bantaco.ir/wp-content/uploads/2025/05/IMG_20240730_132039_730-min-768x222.jpg'
                        className='flex-1 flex object-cover rounded-4xl'
                    />
                </a>


            </section>
            {/* سکشن اخبار */}
            <section ref={refnews} id='news' className="flex flex-col items-center bg-white px-60 pt-[6%]">
                <h1 className="font-extrabold text-myb text-2xl">اخبار و مطالب</h1>
                <p className='text-xs text-myg mt-1'>
                    مطالب های آموزشی و معرفی محصولات
                </p>
                <ArticlesCarousel />
            </section>

            {/* سکشن فرم تماس با ما */}
            <section
                id="contactus"
                className="relative w-full bg-white mt-[5%] "
            >
                {/* تصویر پس‌زمینه */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-85"
                    style={{ backgroundImage: `url(${ImageBackgroundContactUS})` }}
                ></div>

                {/* محتوای اصلی */}
                <div className="relative z-10 bg-myb mx-[33%] pr-6 pl-3 py-6 rounded-3xl flex flex-row items-start">
                    {/* سمت فرم */}
                    <div className='flex flex-col gap-3'>
                        <h1 className="font-bold text-2xl text-white">
                            مشاوره و <span className="text-[#BBD430]">ثبت سفارش</span>
                        </h1>
                        <p className='text-xs text-white mt-1'>
                            لطفا اطلاعاتتان را در فرم زیر وارد کنید.
                        </p>
                        <input
                            type="text"
                            placeholder="نام و نام خانوادگی"
                            className="bg-white rounded-md w-2xs px-4 py-2 shadow-md border border-gray-300 text-xs focus:outline-none focus:ring focus:ring-[#BBD430] focus:border-[#BBD430] transition-all"
                        />
                        <input
                            type="tel"
                            placeholder="شماره تماس"
                            className="bg-white rounded-md w-2xs px-4 py-2 shadow-md border border-gray-300 text-xs text-right focus:outline-none focus:ring focus:ring-[#BBD430] focus:border-[#BBD430] transition-all"
                        />
                        <button className='bg-myg rounded-md w-2xs text-xs py-2 text-center mt-2 cursor-pointer'>
                            ارسال
                        </button>
                    </div>

                    {/* سمت تماس */}
                    <div className='flex-1 flex flex-col items-center'>
                        <div className="w-13 h-13 inline-block transform rotate-315 bg-myg rounded-full transition-transform duration-300 hover:scale-110 p-4">
                            <svg
                                aria-hidden="true"
                                className="scale-90 text-white"
                                viewBox="0 0 384 512"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                            >
                                <path d="M97.333 506.966c-129.874-129.874-129.681-340.252 0-469.933 5.698-5.698 14.527-6.632 21.263-2.422l64.817 40.513a17.187 17.187 0 0 1 6.849 20.958l-32.408 81.021a17.188 17.188 0 0 1-17.669 10.719l-55.81-5.58c-21.051 58.261-20.612 122.471 0 179.515l55.811-5.581a17.188 17.188 0 0 1 17.669 10.719l32.408 81.022a17.188 17.188 0 0 1-6.849 20.958l-64.817 40.513a17.19 17.19 0 0 1-21.264-2.422zM247.126 95.473c11.832 20.047 11.832 45.008 0 65.055-3.95 6.693-13.108 7.959-18.718 2.581l-5.975-5.726c-3.911-3.748-4.793-9.622-2.261-14.41a32.063 32.063 0 0 0 0-29.945c-2.533-4.788-1.65-10.662 2.261-14.41l5.975-5.726c5.61-5.378 14.768-4.112 18.718 2.581zm91.787-91.187c60.14 71.604 60.092 175.882 0 247.428-4.474 5.327-12.53 5.746-17.552.933l-5.798-5.557c-4.56-4.371-4.977-11.529-.93-16.379 49.687-59.538 49.646-145.933 0-205.422-4.047-4.85-3.631-12.008.93-16.379l5.798-5.557c5.022-4.813 13.078-4.394 17.552.933zm-45.972 44.941c36.05 46.322 36.108 111.149 0 157.546-4.39 5.641-12.697 6.251-17.856 1.304l-5.818-5.579c-4.4-4.219-4.998-11.095-1.285-15.931 26.536-34.564 26.534-82.572 0-117.134-3.713-4.836-3.115-11.711 1.285-15.931l5.818-5.579c5.159-4.947 13.466-4.337 17.856 1.304z" /> </svg>
                        </div>
                        <h1 className='text-white font-bold mt-5'>021-98898989</h1>
                        <span className='text-[65%] text-white mt-1'>همین حالا تماس بگیر</span>
                        <img
                            src={ImageSignContactUS}
                            className='transform rotate-180 scale-x-[-1] h-20 mt-5 mr-[29%]'
                        />
                    </div>
                </div>
            </section>

            {/* سکشن بالای فوتر */}
          <FooterUpper/>
            {/* سکشن فوتر   */}
            <Footer />
        </div>
    );
}

export default HomePage;