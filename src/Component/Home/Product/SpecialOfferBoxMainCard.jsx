import React from 'react';



export default function SpecialOfferBoxMainCard({ title, description, img }) {

    return (

        <div className="hidden md:flex flex-col items-center">
            <h2 className="text-white text-2xl font-bold mb-2 text-center">{title}</h2>
            <p className="text-green-400 mb-4 text-center">{description}</p>
            <div className="w-40 h-40">
                <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    )
}