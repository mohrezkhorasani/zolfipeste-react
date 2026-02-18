import React, { useEffect } from 'react';
import imgCover from "@assets/ax/ups/2025/05/economic-roasted-saffron-ahmad-aghaei-pistachios-barjil-967-1-300x300.webp"
import { useState } from 'react'
//fav =0 loading -1=false 1=true
export default function GridMainProductCard({ id = 1, title = "پسته اکبری خام اعلی ",
    img = imgCover, payPrice = 51000, oldPrice = 110000, favorite = -1 }) {
    const [fav, setFav] = useState(favorite);

    useEffect(() => {
        // request api to change fav in server!
        if (fav == 0) {
            setTimeout(() => {
                setFav(1)
            }, 5000); 
        }
    }, [fav])
    return (
        <div
            className="bg-white rounded-xl shadow-2xl px-4 pt-4 pb-2 
            shrink-0 w-40 flex flex-col justify-center border-white border overflow-hidden
            hover:border-blue-600 hover:border duration-500 relative group"
        >
            <div className="relative">
                <a href={`/product/${id}`}>
                    <img
                        src={img}
                        alt={title}
                        className="w-full h-auto object-cover transition-all duration-300 group-hover:opacity-30"
                    />
                </a>
                <div className="absolute inset-0 flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <button
                        className={`w-7 h-7 rounded-lg bg-white/85 backdrop-blur-sm flex
             cursor-pointer items-center justify-center ${fav==1?"text-[#DC3545]":"text-[#11207A]"}
             hover:bg-[#11207A] hover:text-white transition-colors duration-200
             shadow-md pointer-events-auto`}
                        onClick={() => {
                            if (fav === -1) setFav(0);
                            if (fav === 0) setFav(1);
                            if (fav === 1) setFav(-1);
                        }}
                        disabled={fav == 0}
                    >
                        {fav === 0 ? (
                            // spinner / loader
                            <div className="w-4 h-4 border-2 border-t-[#11207A]
                             border-gray-300 rounded-full animate-spin"></div>
                        ) : (
                            <i
                                className={`iconly-Heart ${fav === 1 ? "icbo text-danger" : ""
                                    }`}
                            ></i>
                        )}
                    </button>


                    <a href={`/product/${id}`}>
                        <button className="w-7 h-7 rounded-lg bg-white/85 backdrop-blur-sm flex 
                    items-center justify-center text-[#11207A] hover:bg-[#11207A] hover:text-white 
                    transition-colors duration-200 shadow-md pointer-events-auto cursor-pointer">
                            <i class="iconly-Buy"></i>
                        </button>
                    </a>
                    <a href={`/product/${id}`}>

                        <button className="w-7 h-7 rounded-lg bg-white/85 backdrop-blur-sm flex items-center 
                    justify-center text-[#11207A] hover:bg-[#11207A] hover:text-white transition-colors 
                    duration-200 shadow-md pointer-events-auto cursor-pointer">
                            <i class="iconly-Show"></i>
                        </button>
                    </a>
                </div>
            </div>

            <h3 className="text-gray-800 font-bold text-center mb-2 text-[0.625rem] cursor-pointer">
                {title}
            </h3>

            <div className="flex flex-col items-center mb-4 mt-1">
                <span className="text-lg font-bold text-myb text-[0.825rem] text-right">
                    {payPrice.toLocaleString()}
                </span>
                <span className="text-sm text-myg text-[0.625rem] flex items-center">
                    {oldPrice != 0 && (
                        <span className="line-through">{oldPrice.toLocaleString()}</span>
                    )}
                    <span className="text-[0.825rem] text-black mx-2">تومان</span>
                </span>
            </div>
        </div>
    )
} 