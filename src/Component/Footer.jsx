import React from "react";
import ImageBackground from "@assets/ax/ups/2025/02/top-view-almonds-with-cashews-hazelnuts_23-2148452962.jpg"


export default function Footer() {
    return (
        <section id="footer" className="mt-[2%] text-xs relative flex flex-col mx-60 overflow-hidden rounded-t-4xl pt-[1%] justify-center ">
            {/* تصویر پس‌زمینه */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${ImageBackground})` }}
            ></div>

            {/* هاله / overlay آبی */}
            <div className="absolute inset-0 bg-[#2B3992] opacity-80"></div>

            {/* محتوای اصلی روی overlay */}
            <div className="flex flex-col">
                <div className="relative z-10 p-8 text-white flex flex-row items-center">
                    <img
                        src="https://jiawaz-nuts.bantaco.ir/wp-content/uploads/2024/11/logo_white-4.png"
                        className="w-3xs h-auto"
                    />
                    <div className="flex flex-col mr-[8%]">
                        <a href="#">
                            فروشگاه
                        </a>
                        <a href="#">
                            سبد خرید
                        </a>
                    </div>
                    <div className="flex flex-col mr-[3%]">
                        <a href="#">
                            شرایط تحویل و ارائه کالا
                        </a>
                        <a href="#">
                            قوانین مرجوعی کالا
                        </a>
                    </div>
                    <div className="flex flex-col mr-[3%]">
                        <a href="#">
                            فروشگاه
                        </a>
                        <a href="#">
                            سبد خرید
                        </a>
                    </div>
                    <div className="flex flex-row mr-auto gap-4 items-center justify-center ml-[5%]">

                        <div className='flex flex-col ml-[15%]'>
                            <h1 className='text-[#FFF] text-2xl'>مجوزهای</h1>
                            <h1 className='text-[#FFF] text-2xl font-bold'>فروشگاه</h1>
                        </div>
                        <img
                            src="https://jiawaz-nuts.bantaco.ir/wp-content/uploads/2024/09/enamad.png"
                            className="rounded-md h-22 w-22"
                        />
                        <img
                            src="https://jiawaz-nuts.bantaco.ir/wp-content/uploads/2024/09/enamad.png"
                            className="rounded-md h-22 w-22"
                        />
                    </div>

                </div>
                <div className="flex items-center mt-auto bg-myg z-50 mx-[30%] py-2 rounded-t-2xl text-myb px-5 text-xs">
                    {/* متن سمت راست */}
                    <p className="text-right">
                        کلیه حقوق متعلق به ذوافقاری میباشد.
                    </p>

                    {/* جداکننده خطی */}
                    <div className="flex-1 mx-2 border-t border-gray-400"></div>

                    {/* متن سمت چپ */}
                    <p className="text-left">
                        طراحی توسط : محمدرضا خراسانی
                    </p>
                </div>

            </div>
        </section>

    )
}