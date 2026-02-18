import React from 'react';
import image from "@assets/ax/ups/2025/05/strong-roasted-saffron-ahmad-aghaei-pistachios-barjil-376-1-300x300.webp"
import { Show } from 'react-iconly';


export default function SpecialOfferBoxCard({ id = 1, title = "پسته فلفلی", payPrice = 19000, offPrice = 0, basketCount = 2, img }) {

    return (
        <div
            className="bg-white rounded-xl shadow-lg 
                                    px-4 pt-4 pb-2 shrink-0 w-50 flex flex-col justify-start"
        >
            <a href={`/product/${id}`}>

                <img
                    src={img}
                    alt={title}

                    className="w-fit h-auto object-cover p-3"
                />
            </a>
            <a href={`/product/${id}`}>
            <h3 className="text-gray-800 font-bold text-right mb-2 text-[0.625rem]">
                {title}
            </h3>
            </a>
            <div className="flex flex-col items-start mb-4 mt-5">
                <span className="text-lg font-bold text-myb text-[0.825rem] text-right ">
                    {payPrice.toLocaleString()}
                </span>
                {offPrice != 0 && (
                    <span className="text-sm text-myg text-[0.625rem] flex items-center">
                        <span className="line-through">{offPrice.toLocaleString()}</span>
                        <span className="text-[0.825rem] text-black font-bold mx-2">تومان</span>
                    </span>
                )}
            </div>

            <div className="flex gap-2">
                <button className="bg-blue-900 text-white px-3 py-1 rounded-lg text-[0.825rem] hover:bg-gray-200
                 cursor-pointer hover:text-blue-900 transition-all duration-300 ">
                    <i class="iconly-Buy"></i>
                </button>
                <a href={`/product/${id}`}>
                    <button className="bg-gray-200 px-5 py-2 
                                    rounded-lg text-gray-700 flex items-center font-semibold gap-1 text-[0.625rem]
                                    hover:bg-[#11207A] hover:text-white  duration-200
                                    focus:ring-blue-500 focus:ring-offset-2  
                                    cursor-pointer
                                    ">
                        <i class="iconly-Show"></i>
                        مشاهده سریع

                    </button>
                </a>
            </div>
        </div>

    )
}