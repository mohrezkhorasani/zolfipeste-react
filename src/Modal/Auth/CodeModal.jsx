import React, { useState } from "react";
import Cookies from "js-cookie";

export default function CodeModal({ mobile, onSuccess }) {
  const [code, setCode] = useState("");

  const handleVerify = () => {
    // اعتبارسنجی ساده برای عدد بودن و طول کد
    if (!code.match(/^\d{4}$/)) {
      alert("لطفاً کد ۴ رقمی معتبر وارد کنید.");
      return;
    }
    
    // ذخیره در کوکی (به مدت ۷ روز)
    Cookies.set("t1", mobile, { expires: 7 }); 
    
    // اجرای تابع موفقیت (مثلاً بستن مودال یا ریدایرکت)
    onSuccess(); 
  };

  return (
    /* لایه پس‌زمینه (Overlay) کاملاً هماهنگ با مودال قبلی */
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-screen bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-[320px] p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
        
        <h2 className="text-xl font-bold mb-2 text-center text-gray-800">
          تایید کد
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          کد ارسال شده به <span className="font-semibold text-gray-700">{mobile}</span> را وارد کنید
        </p>

        <input
          type="text"
          inputMode="numeric" // باز شدن کیبورد عددی در موبایل
          maxLength={4}       // جلوگیری از تایپ بیش از ۴ رقم
          placeholder="----"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))} // فقط اجازه تایپ عدد می‌دهد
          className="w-full p-3 border border-gray-300 rounded-lg mb-6 text-center text-2xl tracking-[1rem] font-bold focus:ring-2 focus:ring-green-500 outline-none transition-all"
        />

        <button
          onClick={handleVerify}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-bold text-lg shadow-lg shadow-green-200"
        >
          تایید و ادامه
        </button>
        
        <button 
          onClick={() => setCode("")} // مثال برای دکمه ویرایش یا تلاش مجدد
          className="w-full mt-4 text-sm text-blue-600 hover:underline"
        >
          کد را دریافت نکردید؟
        </button>
      </div>
    </div>
  );
}