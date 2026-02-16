
import { useEffect, useRef } from 'react';
import PicHero from '@assets/ax/hero-home.png'

export default function Hero() {


    return (
        <section className='p-6 mx-60 max-h-md' dir='rtl'>
            <div className='flex flex-col sm:flex-row gap-5 w-full'>
                <div className="flex-1 relative bg-transparent ">
                    <div className="absolute inset-40 rounded-full bg-white/15 blur-3xl scale-[1.15] opacity-60 z-1" />
                    <div className="absolute inset-8 rounded-full bg-white/25 blur-2xl opacity-50 z-1" />
                    <img
                        src={PicHero}
                        alt="کاسه پسته با هاله سفید"
                        className="relative z-10 w-full h-auto rounded-2xl object-cover scale-[0.8]"
                    />
                </div>
                <div className="text-white flex-1 bg-transparent p-5 rounded-4xl font-['YekanBakh'] mt-[6%]">
                    <div className='flex flex-row text-7xl font-black'>
                        <p className="text-[#BBD430] px-2">پسته </p> ذوالفقاری
                    </div>
                    <p className="text-white mt-10">
                        <p className='font-semibold text-2xl mb-2'> ما باغداریم، نه فقط آجیل‌فروش!</p>
                        از باغ‌های مرغوب خودمان تا بسته‌بندی نهایی در دامغان.
                    </p>
                    <div className="flex flex-row justify-start items-center gap-2 ml-auto"    >
                        <a
                            href="shop.html"
                            className="
                            inline-flex items-center justify-center gap-2.5
                            px-5 py-2.5 text-sm font-medium
                            bg-transparent hover:bg-[#BBD430] border-2 border-[#BBD430]
                            hover:text-[#11207A] text-[#BBD430]
                            rounded-4xl transition-colors duration-200 
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                            shadow-sm hover:shadow
                            mt-5 mr-4
                        " dir='ltr'
                        >
                            {/* آیکون (SVG همان Elementor) */}
                            <span className="inline-flex items-center">
                                <svg
                                    aria-hidden="true"
                                    className="w-4 h-4"  // اندازه کوچک مثل قبلی
                                    viewBox="0 0 512 512"  // viewBox استاندارد Font Awesome
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"    // رنگ از parent می‌گیره (مثل text-white یا text-gray-800)
                                >
                                    <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                                </svg>
                            </span>

                            <span>تماس با ما</span>
                        </a>
                        <a
                            href="shop.html"
                            className="
                            inline-flex items-center justify-center gap-2.5
                            px-5 py-2.5 text-sm font-medium
                            text-[#11207A] bg-[#BBD430] hover:bg-transparent  hover:border-[#BBD430] border-0 hover:border-2 hover:text-white
                            rounded-4xl transition-colors duration-200 
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                            shadow-sm hover:shadow
                            mt-5 mr-4
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

                            <span>مشاهده و سفارش</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}