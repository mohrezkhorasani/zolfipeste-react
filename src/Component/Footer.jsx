export default function Footer() {
  return (
    <footer className="bg-[#1a1917] border-t border-white/10 mt-auto">
      <div className="px-4 py-4">
        {/* لینک‌های اصلی */}
        <div className="flex justify-center gap-6 mb-3">
          <a href="#" className="text-white/40 text-xs hover:text-white/70 transition">
            درباره ما
          </a>
          <a href="#" className="text-white/40 text-xs hover:text-white/70 transition">
            قوانین
          </a>
          <a href="#" className="text-white/40 text-xs hover:text-white/70 transition">
            تماس با ما
          </a>
          <a href="#" className="text-white/40 text-xs hover:text-white/70 transition">
            راهنما
          </a>
        </div>

        {/* وضعیت سرور */}
        <div className="flex justify-center items-center gap-2 mb-3">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-white/30 text-[10px]">سرور آنلاین</span>
          <span className="text-white/20 text-[10px]">•</span>
          <span className="text-white/30 text-[10px]">۲۱ بازیکن آنلاین</span>
        </div>

        {/* کپی‌رایت */}
        <div className="text-center text-white/20 text-[10px]">
          © 2024 شطرنج آنلاین | همه حقوق محفوظ است
        </div>

        {/* دکمه تغییر تم (آپشنال) */}
        <div className="flex justify-center mt-3">
          <button className="text-white/20 text-[10px] flex items-center gap-1 hover:text-white/40 transition">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            <span>حالت شب</span>
          </button>
        </div>
      </div>
    </footer>
  );
}