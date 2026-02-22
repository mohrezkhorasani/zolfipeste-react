import { useState, useRef } from "react";
import { isValidEmail } from "../Tools/EmailValidator";
import CommentCard from "./CommentCard";

export default function CommentBox() {
    const [rating, setRating] = useState(3);
    const [hover, setHover] = useState(0);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");


    return (
        <div className="w-full flex justify-center px-3 sm:px-4 py-6 sm:py-8" dir="rtl">
            <div className="w-full bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-sm">

                {/* Heading */}
                <h2 className="text-xl sm:text-2xl md:text-[1.7rem] font-bold text-gray-500 mb-4 text-right">
                    دیدگاه خود را بنویسید
                </h2>

                {/* Instructions */}
                <div className="text-red-600 text-xs sm:text-sm leading-5 space-y-1 mb-5 sm:mb-6 text-right">
                    {!isValidEmail(email) && <p>* لطفا ایمیل خود را وارد کنید.</p>}
                    {comment.trim().length < 10 && <p>* لطفا متن کامنت را وارد کنید</p>}
                    {!name && <p>* لطفا نامی برای نمایش وارد کنید</p>}
                </div>

                {/* Rating */}
                <div className="mb-5 sm:mb-6 text-right">
                    <label className="block mb-2 font-medium text-gray-800 text-sm sm:text-base">
                        امتیاز شما
                    </label>

                    <div className="flex flex-row-reverse gap-1 text-2xl sm:text-3xl">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHover(star)}
                                onMouseLeave={() => setHover(0)}
                                className="transition-transform hover:scale-110 active:scale-95"
                            >
                                <span
                                    className={
                                        (hover || rating) >= star
                                            ? "text-yellow-400"
                                            : "text-gray-300"
                                    }
                                >
                                    ★
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Comment textarea */}
                <div className="mb-5 sm:mb-6 text-right">
                    <label className="block mb-2 font-medium text-gray-800 text-sm sm:text-base">
                        دیدگاه شما
                    </label>
                    <textarea
                        rows={5}
                        placeholder="دیدگاه خود را اینجا بنویسید…"
                        onChange={(e) => {
                            setComment(e.target.value)
                        }}
                        className={`w-full border  rounded-md p-3 text-sm sm:text-base ${comment.trim().length >= 10 ? "border-[#BBD430]" : "border-gray-300"}
                        focus:outline-none focus:ring-2 focus:ring-[#2B3992] resize-none`}
                    />
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-5 sm:mb-6">
                    {/* Name */}
                    <div className="text-right">
                        <label className="block mb-2 text-xs sm:text-sm font-medium text-gray-800">
                            نام *
                        </label>
                        <input
                            type="text"
                            placeholder="محمد"
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                            className={`w-full h-10 sm:h-11 border  rounded-md px-3
                            text-sm sm:text-base ${!name ? "border-gray-300" : "border-[#BBD430]"}
                            focus:outline-none focus:ring-2 focus:ring-[#2B3992]`}
                        />
                    </div>

                    {/* Email */}
                    <div className="text-right">
                        <label className="block mb-2 text-xs sm:text-sm font-medium text-gray-800">
                            ایمیل *
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            placeholder="your-email-address@gmail.com"
                            className={`w-full h-10 sm:h-11 border  rounded-md px-3
                            text-sm sm:text-base ${isValidEmail(email) ? "border-[#BBD430]" : "border-gray-300"}
                            focus:outline-none focus:ring-2 focus:ring-[#2B3992]`}
                        />
                    </div>
                </div>

                {/* Consent */}
                <div className="flex flex-row-reverse items-start gap-2 mb-5 sm:mb-6 text-right">
                    <input type="checkbox" className="mt-1 scale-90 sm:scale-100" />
                    <p className="text-xs sm:text-sm text-gray-700 leading-5">
                        ذخیره نام، ایمیل و وب‌سایت من در مرورگر برای زمانی که دوباره دیدگاهی می‌نویسم.
                    </p>
                </div>

                {/* Submit */}
                <button className="w-full sm:w-fit sm:px-12 bg-[#2B3992] hover:bg-[#2b5f92]
                            text-white font-semibold py-2.5 sm:py-3 rounded-md
                            transition-colors"
                    onClick={() => {
                    }}
                >
                    ثبت
                </button>
            </div>
        </div>
    );
}