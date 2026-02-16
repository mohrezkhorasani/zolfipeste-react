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



function HomePage() {
    const [isOpen, setIsOpen] = useState(false);


    return (
        <div dir="rtl" className="min-h-screen bg-gray-50">
            <section className='bg-linear-to-b from-[#11207A] to-[#2F3D94]'>
                <Header className="z-50" />
                <hr className="mb-6 border-gray-300 dark:border-gray-700 mx-60" />
                <Hero />
            </section>
            {/* Section کارت about us */}
            <section id="about-us"
                className='mx-60 flex flex-row bg-white rounded-4xl shadow-lg object-cover shadow-gray-300 gap-15
                        mt-[-10%] min-h-50 px-15 pt-[5%] pb-[2%]
            '>
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
            {/* سکشن دسته بندی */}
            <section id='category' className='flex flex-col mx-60 bg-transparent items-center mt-14'>
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
                title={"پیشنهاد شگفت انگیز"}
                description={"از باغدار بخر"}
                img={ImageMain}

            />

            {/* سکشن پرفروش ترین محصولات */}
            <section id='popular-products' className="flex flex-col items-center bg-white mx-60 mt-8">
                <h1 className="font-extrabold text-myb text-2xl">پرفروش ترین محصولات</h1>
                <p className='text-xs text-myg mt-1'>از محصولات محبوب ما دیدن کنید</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5  lg:grid-cols-6 gap-6 mt-6 w-full">
                    <GridMainProductCard />
                    <GridMainProductCard />
                    <GridMainProductCard />
                    <GridMainProductCard />
                    <GridMainProductCard />
                    <GridMainProductCard />
                </div>
            </section>
        </div>
    );
}

export default HomePage;