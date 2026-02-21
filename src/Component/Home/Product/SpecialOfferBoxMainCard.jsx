// SpecialOfferBoxMainCard.tsx
import React from 'react';

export default function SpecialOfferBoxMainCard({ title, description, img }) {
  return (
    <div className="flex flex-col items-center text-center px-2">
      <h2
        className="
          text-white font-bold
          text-xl xs:text-2xl sm:text-3xl
          mb-2 sm:mb-3
        "
      >
        {title}
      </h2>

      <p
        className="
          text-green-400 font-medium
          text-sm xs:text-base sm:text-lg
          mb-4 sm:mb-6
        "
      >
        {description}
      </p>

      <div className="w-32 h-32 xs:w-40 xs:h-40 sm:w-48 sm:h-48 md:w-56 md:h-56">
        <img
          src={img}
          alt={title || "محصول ویژه"}
          className="w-full h-full object-contain drop-shadow-lg"
        />
      </div>
    </div>
  );
}