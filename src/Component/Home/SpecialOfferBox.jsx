import React from 'react';
import SpecialOfferBoxMainCard from './Product/SpecialOfferBoxMainCard';
import SpecialOfferBoxCard from './Product/SpecialOfferBoxcard';
import image from "@assets/ax/ups/2025/05/strong-roasted-saffron-ahmad-aghaei-pistachios-barjil-376-1-300x300.webp"
import { Show } from 'react-iconly';


const products = [
    {
        id: 1,
        name: "مغز بادام خام اقتصادی",
        price: 1100000,
        image: image,
    },
    {
        id: 2,
        name: "بادام هندی برشته پیاز جعفری",
        price: 150000,
        image: image,
        oldPrice: 180000,
    },
    {
        id: 3,
        name: "بادام هندی برشته فلفلی",
        price: 70000,
        image: image,
        oldPrice: 85000,
    }, ,
    {
        id: 3,
        name: "بادام هندی برشته فلفلی",
        price: 70000,
        image: image,
        oldPrice: 85000,
    }, ,
    {
        id: 3,
        name: "بادام هندی برشته فلفلی",
        price: 70000,
        image: image,
        oldPrice: 85000,
    }, ,
    {
        id: 3,
        name: "بادام هندی برشته فلفلی",
        price: 70000,
        image: image,
        oldPrice: 85000,
    }, ,
    {
        id: 3,
        name: "بادام هندی برشته فلفلی",
        price: 70000,
        image: image,
        oldPrice: 85000,
    }, ,
    {
        id: 3,
        name: "بادام هندی برشته فلفلی",
        price: 70000,
        image: image,
        oldPrice: 85000,
    }, ,
    {
        id: 3,
        name: "بادام هندی برشته فلفلی",
        price: 70000,
        image: image,
        oldPrice: 85000,
    },
];

export default function SpecialOfferBox({ title, description, img }) {

    return (
        <section id='special-offer' className="bg-myb py-5 h-[55%] mt-15">
            <div className="bg-transparent py-10 px-5 flex flex-col md:flex-row justify-center items-center gap-6 mx-60">
                <SpecialOfferBoxMainCard
                    title={title}
                    description={description}
                    img={img}
                />

                {/* کارت‌ها */}
                <div className="flex overflow-x-auto gap-4 py-4 justify-start">
                    {products.map((product) => (
                        <SpecialOfferBoxCard
                            key={product.id}
                            title={product.name}
                            payPrice={product.price}
                            offPrice={product.oldPrice}
                            img={product.image}
                            basketCount={0}
                        /> 
                    ))}
                </div>
            </div>

        </section>
    )
}