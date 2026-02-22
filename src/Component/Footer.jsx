import React from "react";
import ImageBackground from "@assets/ax/ups/2025/02/top-view-almonds-with-cashews-hazelnuts_23-2148452962.jpg";

export default function Footer() {
    return (
        <section
            id="footer"
            className="mt-2 text-xs relative flex flex-col overflow-hidden rounded-t-4xl lg:mx-60 pt-2 justify-center px-4 sm:px-10 md:mx-60"
        >
            {/* تصویر پس‌زمینه */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${ImageBackground})` }}
            ></div>

            {/* هاله / overlay آبی */}
            <div className="absolute inset-0 bg-[#2B3992] opacity-80"></div>

            {/* محتوای اصلی روی overlay */}
            <div className="flex flex-col relative z-10">
                <div className="flex flex-col items-center sm:flex-row sm:items-start sm:text-right p-4 sm:p-8 text-white flex-wrap gap-4">
                    {/* لوگو */}
                    <img
                        src="https://jiawaz-nuts.bantaco.ir/wp-content/uploads/2024/11/logo_white-4.png"
                        className="w-24 sm:w-3xs h-auto mb-4 sm:mb-0"
                    />

                    {/* لینک‌ها */}
                    <div className="flex flex-col items-center sm:items-start sm:mr-8 mb-4 sm:mb-0">
                        <a href="#">فروشگاه</a>
                        <a href="#">سبد خرید</a>
                    </div>

                    <div className="flex flex-col items-center sm:items-start sm:mr-4 mb-4 sm:mb-0">
                        <a href="#">شرایط تحویل و ارائه کالا</a>
                        <a href="#">قوانین مرجوعی کالا</a>
                    </div>

                    <div className="flex flex-col items-center sm:items-start sm:mr-4 mb-4 sm:mb-0">
                        <a href="#">فروشگاه</a>
                        <a href="#">سبد خرید</a>
                    </div>

                    <div className="flex flex-col items-center text-center sm:flex-row sm:ml-auto sm:items-center sm:text-right gap-4">
                        <div className="flex flex-col items-center sm:items-start">
                            <h1 className="text-white text-2xl">مجوزهای</h1>
                            <h1 className="text-white text-2xl font-bold">فروشگاه</h1>
                        </div>

                        <img
                            src="https://jiawaz-nuts.bantaco.ir/wp-content/uploads/2024/09/enamad.png"
                            className="rounded-md h-20 w-20"
                        />
                        <img
                            src="https://jiawaz-nuts.bantaco.ir/wp-content/uploads/2024/09/enamad.png"
                            className="rounded-md h-20 w-20"
                        />
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="flex flex-col sm:flex-row items-center mt-4 sm:mt-0 bg-myg z-50 mx-auto sm:mx-[30%] py-2 rounded-t-2xl text-myb px-4 sm:px-5 text-xs">
                    <p className="text-right w-full sm:w-auto mb-1 sm:mb-0">
                        کلیه حقوق متعلق به ذوافقاری میباشد.
                    </p>

                    <div className="flex-1 mx-0 sm:mx-2 border-t sm:border-t-0 border-gray-400 sm:border-l"></div>

                    <p className="text-left w-full sm:w-auto">
                        طراحی توسط : محمدرضا خراسانی
                    </p>
                </div>
            </div>
        </section >
    );
}