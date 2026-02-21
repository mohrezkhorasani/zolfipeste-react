// کامپوننت CategoryCard
import React from 'react';
import CatImg from '@assets/ax/ups/2025/02/jum1b.png';

export function CategoryCard({ 
  title = "پسته دامغان", 
  description = "محصول باغ های خودمان", 
  img = CatImg 
}) {
  return (
    <div className="
      flex flex-row items-center 
      bg-myg-200 
      px-4 py-5 xs:px-5 sm:px-6 md:px-8 
      rounded-2xl 
      gap-4 sm:gap-5 md:gap-6
    ">
      <div className="flex flex-col justify-center flex-1 min-w-0">
        <h1 className="
          text-myb 
          text-base xs:text-lg sm:text-xl md:text-2xl 
          font-bold 
          truncate
        ">
          {title}
        </h1>
        
        <p className="
          mt-1.5 sm:mt-2 md:mt-3 
          text-gray-700 
          text-[0.78rem] xs:text-xs sm:text-sm md:text-base
        ">
          {description}
        </p>
      </div>

      <div className="flex-shrink-0 flex items-center justify-center">
        <img
          src={img}
          className="
            w-20 h-20 
            xs:w-22 xs:h-22 
            sm:w-24 sm:h-24 
            md:w-28 md:h-28 
            rounded-full 
            object-cover 
            scale-105
          "
          alt={title}
        />
      </div>
    </div>
  );
}