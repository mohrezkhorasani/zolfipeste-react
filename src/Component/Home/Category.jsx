import React from 'react';
import CatImg from '@assets/ax/ups/2025/02/jum1b.png'


export function CategoryCard({ title="پسته دامغان", description="محصول باغ های خودمان", img=CatImg }) {
  return (
    <div className="flex flex-row bg-myg-200 px-[8%] py-[5%] rounded-2xl gap-6">
      <div className="flex flex-2 flex-col justify-center">
        <h1 className="text-myb text-xl font-bold">{title}</h1>
        <p className="text-[55%] mt-3 text-gray-700">{description}</p>
      </div>

      <div className="flex items-center justify-center">
        <img
          src={img}
          className="w-24 h-24 rounded-full object-cover scale-105"
          alt={title}
        />
      </div>
    </div>
  );
}
