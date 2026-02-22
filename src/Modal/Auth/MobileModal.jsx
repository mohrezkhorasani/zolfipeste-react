import React, { useState } from "react";

export default function MobileModal({ onNext }) {
  const [mobile, setMobile] = useState("");

  const handleSendCode = () => {
    if (!mobile.match(/^09\d{9}$/)) {
      alert("شماره موبایل معتبر وارد کنید.");
      return;
    }
    onNext(mobile);
  };

  return (
    /* تغییرات اصلی: 
       - اضافه کردن h-screen برای اطمینان از گرفتن تمام ارتفاع موبایل
       - استفاده از items-center و justify-center برای سنتر کردن دقیق
    */
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-screen bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-[320px] p-8 shadow-2xl">
        <h2 className="text-xl font-bold mb-6 text-center text-gray-800">
          ورود با شماره موبایل
        </h2>

        <input
          type="tel" // تغییر به tel برای کیبورد بهتر در موبایل
          dir="ltr"  // چپ‌چین کردن شماره برای خوانایی بهتر
          placeholder="09123456789"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-center text-lg tracking-widest focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <button
          onClick={handleSendCode}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-bold text-lg"
        >
          ارسال کد
        </button>
      </div>
    </div>
  );
}