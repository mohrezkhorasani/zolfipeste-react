// SpecialOfferBoxCard.tsx
import React from 'react';
import { Show } from 'react-iconly';

export default function SpecialOfferBoxCard({
  id = 1,
  title = "پسته فلفلی",
  payPrice = 19000,
  offPrice = 0,
  basketCount = 0,
  img,
}) {
  return (
    <div
      className="
        bg-white rounded-xl shadow-md overflow-hidden
        w-44 xs:w-48 sm:w-56 md:w-64 flex-shrink-0
        flex flex-col
      "
    >
      <a href={`/product/${id}`} className="block aspect-square bg-gray-50">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-contain p-3 sm:p-4"
        />
      </a>

      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <a href={`/product/${id}`}>
          <h3
            className="
              text-gray-800 font-semibold leading-tight
              text-xs xs:text-sm sm:text-base
              mb-2 sm:mb-3 line-clamp-2 text-right
            "
          >
            {title}
          </h3>
        </a>

        <div className="mt-auto space-y-1">
          <div className="text-right">
            <span
              className="
                font-bold text-myb
                text-base xs:text-lg sm:text-xl
              "
            >
              {payPrice.toLocaleString()}
            </span>
            <span className="text-xs xs:text-sm text-gray-600 mr-1.5">تومان</span>
          </div>

          {offPrice !== 0 && (
            <div className="text-right">
              <span className="text-xs xs:text-sm text-myg line-through">
                {offPrice.toLocaleString()}
              </span>
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-3 sm:mt-4">
          <button
            className="
              bg-blue-900 text-white 
              min-w-[38px] h-9 xs:h-10
              rounded-lg flex items-center justify-center
              hover:bg-blue-800 transition-colors
            "
          >
            <i className="iconly-Buy text-lg sm:text-xl"></i>
          </button>

          <a href={`/product/${id}`} className="flex-1">
            <button
              className="
                w-full bg-gray-100 text-gray-700
                h-9 xs:h-10
                rounded-lg text-xs xs:text-sm
                flex items-center justify-center gap-1.5
                hover:bg-[#11207A] hover:text-white
                transition-colors duration-200
              "
            >
              <Show size="small" />
              مشاهده
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}