import { useEffect, useRef } from 'react';
import PicHero from '@assets/ax/hero-home.png'
import { useLazyInView } from '@/Tools/LazyLoading';
import FloatingImage from '@/Tools/FloatingImage';

export const fadeInClass = (visible) =>
  `transition-all duration-700 ease-out ${
    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
  }`;

export default function Hero() {
  const [ref1, visible1] = useLazyInView();
  const [ref2, visible2] = useLazyInView();
  const [ref3, visible3] = useLazyInView();

  const refFloatingImage = ref3;

  const handleMouseMove = (e) => {
    if (!refFloatingImage.current) return;

    const { left, top, width, height } =
      refFloatingImage.current.getBoundingClientRect();

    const x = (e.clientX - (left + width / 2)) / 100;
    const y = (e.clientY - (top + height / 2)) / 100;

    refFloatingImage.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const resetPosition = () => {
    if (!refFloatingImage.current) return;
    refFloatingImage.current.style.transform = "translate(0px, 0px)";
  };

  return (
    <section
      className="inline-block w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto lg:mx-60 py-[5%]"
      dir="rtl"
      onMouseMove={handleMouseMove}
      onMouseLeave={resetPosition}
    >
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-center">
        
        {/* تصویر */}
        <div className="flex-1 relative bg-transparent w-full">
          <div className="absolute inset-20 sm:inset-32 rounded-full bg-white/15 blur-3xl scale-[1.15] opacity-60 z-1" />
          <div className="absolute inset-6 sm:inset-8 rounded-full bg-white/25 blur-2xl opacity-50 z-1" />

          <img
            ref={ref3}
            src={PicHero}
            alt="کاسه پسته با هاله سفید"
            className={`
              transition-transform duration-500 ease-out will-change-transform
              relative z-10 w-full h-auto rounded-2xl object-cover
              scale-90 sm:scale-95 lg:scale-[1] 
              ${fadeInClass(visible3)}
            `}
          />
        </div>

        {/* متن */}
        <div className="text-white flex-1 bg-transparent p-4 sm:p-6 rounded-4xl font-['YekanBakh'] w-full">
          
          {/* تیتر */}
          <div
            className={`flex flex-wrap items-center text-3xl sm:text-5xl lg:text-7xl font-black ${fadeInClass(
              visible1
            )}`}
            ref={ref1}
          >
            <p className="text-[#BBD430] px-2">پسته</p>
            ذوالفقاری
          </div>

          {/* توضیح */}
          <div className={`mt-6 sm:mt-10 ${fadeInClass(visible2)}`} ref={ref2}>
            <p className="font-semibold text-lg sm:text-2xl mb-2">
              ما باغداریم، نه فقط آجیل‌فروش!
            </p>
            <p className="text-sm sm:text-base">
              از باغ‌های مرغوب خودمان تا بسته‌بندی نهایی در دامغان.
            </p>
          </div>

          {/* دکمه‌ها */}
          <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center gap-3 sm:gap-4 mt-6">
            
            {/* تماس */}
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
                w-full sm:w-auto
              "
              dir="ltr"
            >
              <span className="inline-flex items-center">
                <svg aria-hidden="true" className="w-4 h-4" viewBox="0 0 512 512" fill="currentColor">
                  <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                </svg>
              </span>
              <span>تماس با ما</span>
            </a>

            {/* سفارش */}
            <a
              href="shop.html"
              className="
                inline-flex items-center justify-center gap-2.5
                px-5 py-2.5 text-sm font-medium
                text-[#11207A] bg-[#BBD430] hover:bg-transparent
                hover:border-[#BBD430] border-0 hover:border-2 hover:text-white
                rounded-4xl transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                shadow-sm hover:shadow
                w-full sm:w-auto
              "
              dir="ltr"
            >
              <span className="inline-flex items-center">
                <svg aria-hidden="true" className="w-4 h-4" viewBox="0 0 448 512" fill="currentColor">
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
