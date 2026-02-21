// GridMainProductCard.tsx – نسخه ریسپانسیو موبایل‌فرست
import React, { useEffect, useState } from 'react';
import imgCover from "@assets/ax/ups/2025/05/economic-roasted-saffron-ahmad-aghaei-pistachios-barjil-967-1-300x300.webp";

export default function GridMainProductCard({
  id = 1,
  title = "پسته اکبری خام اعلی",
  img = imgCover,
  payPrice = 51000,
  oldPrice = 110000,
  favorite = -1, // -1 = نه/نامشخص، 0 = در حال ارسال، 1 = لایک شده
}) {
  const [fav, setFav] = useState(favorite);

  useEffect(() => {
    if (fav === 0) {
      // شبیه‌سازی درخواست api
      const timer = setTimeout(() => {
        setFav(1);
      }, 1800); // سریع‌تر برای تست بهتر
      return () => clearTimeout(timer);
    }
  }, [fav]);

  return (
    <div
      className="
        bg-white rounded-xl shadow-lg border border-gray-100
        overflow-hidden flex flex-col
        hover:shadow-xl hover:border-blue-500/40
        transition-all duration-300 group
        w-full
      "
    >
      <div className="relative aspect-square bg-gray-50">
        <a href={`/product/${id}`} className="block w-full h-full">
          <img
            src={img}
            alt={title}
            className="
              w-full h-full object-contain 
              p-3 xs:p-4 sm:p-5 
              transition-all duration-400 
              group-hover:scale-105 group-hover:opacity-75
            "
          />
        </a>

        {/* overlay دکمه‌ها – فقط روی هاور */}
        <div
          className="
            absolute inset-0 bg-black/5 backdrop-blur-[2px]
            flex items-center justify-center gap-2 sm:gap-3
            opacity-0 group-hover:opacity-100 
            transition-opacity duration-300
          "
        >
          <button
            className={`
              w-8 h-8 xs:w-9 xs:h-9 rounded-full 
              bg-white/90 shadow-md flex items-center justify-center
              text-base xs:text-lg
              ${fav === 1 ? "text-red-600" : "text-[#11207A]"}
              hover:bg-[#11207A] hover:text-white 
              active:scale-95 transition-all duration-200
              disabled:opacity-50
            `}
            onClick={() => {
              if (fav === -1 || fav === 1) setFav(fav === 1 ? -1 : 0);
            }}
            disabled={fav === 0}
          >
            {fav === 0 ? (
              <div className="w-5 h-5 border-2 border-t-[#11207A] border-gray-300 rounded-full animate-spin" />
            ) : (
              <i className={`iconly-Heart ${fav === 1 ? "icbo text-danger" : ""}`} />
            )}
          </button>

          <a href={`/product/${id}`}>
            <button
              className="
                w-8 h-8 xs:w-9 xs:h-9 rounded-full 
                bg-white/90 shadow-md flex items-center justify-center
                text-[#11207A] text-base xs:text-lg
                hover:bg-[#11207A] hover:text-white 
                active:scale-95 transition-all duration-200
              "
            >
              <i className="iconly-Buy" />
            </button>
          </a>

          <a href={`/product/${id}`}>
            <button
              className="
                w-8 h-8 xs:w-9 xs:h-9 rounded-full 
                bg-white/90 shadow-md flex items-center justify-center
                text-[#11207A] text-base xs:text-lg
                hover:bg-[#11207A] hover:text-white 
                active:scale-95 transition-all duration-200
              "
            >
              <i className="iconly-Show" />
            </button>
          </a>
        </div>
      </div>

      <div className="p-3 xs:p-4 flex flex-col items-center text-center flex-1">
        <a href={`/product/${id}`}>
          <h3
            className="
              text-gray-800 font-semibold leading-tight
              text-xs xs:text-sm sm:text-base 
              mb-2 line-clamp-2 min-h-[2.6em]
            "
          >
            {title}
          </h3>
        </a>

        <div className="mt-auto space-y-1 w-full">
          <div className="flex items-baseline justify-center gap-1.5">
            <span
              className="
                font-bold text-myb 
                text-base xs:text-lg sm:text-xl
              "
            >
              {payPrice.toLocaleString()}
            </span>
            <span className="text-xs xs:text-sm text-gray-600">تومان</span>
          </div>

          {oldPrice > 0 && (
            <div className="text-center">
              <span className="text-xs xs:text-sm text-myg line-through">
                {oldPrice.toLocaleString()}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}