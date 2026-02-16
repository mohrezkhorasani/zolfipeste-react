// src/components/Header.tsx
import { useState } from 'react';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react'; // آیکون‌ها از lucide (خیلی سبک و خوبه)

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[#11217a00] text-white sticky top-0 z-50 transition-all">
      {/* نوار بالایی کوچک - گاهی تخفیف یا شماره تماس */}
      <div className="bg-green-600 text-center py-1.5 text-sm font-medium">
        ارسال رایگان برای سفارش بالای ۱ میلیون تومان | پشتیبانی ۲۴ ساعته: ۰۹۱۲xxx xxxx
      </div>

      {/* هدر اصلی */}
      <div className="container px-4 lg:px-8 mx-60" >
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* لوگو + نام برند - سمت راست */}
          <a href="/" className="flex items-center gap-3 font-bold text-xl md:text-2xl">
            {/* اگر لوگو داری می‌تونی img بذاری */}
            <span className="text-green-400">پسته</span>ذوالفقاری
            <span className="text-green-400 text-2xl">•</span>
            پسته اصیل دامغان
          </a>

          {/* منو دسکتاپ - وسط */}
          <nav className="hidden md:flex items-center gap-8 text-lg">
            <a href="/" className="hover:text-green-400 transition">خانه</a>
            <a href="/products" className="hover:text-green-400 transition">محصولات</a>
            <a href="/about" className="hover:text-green-400 transition">درباره ما</a>
            <a href="/contact" className="hover:text-green-400 transition">تماس با ما</a>
            <a href="/blog" className="hover:text-green-400 transition">بلاگ</a>
          </nav>

          {/* آیکون‌ها - سمت چپ */}
          <div className="flex items-center gap-5 md:gap-7">
            <button aria-label="جستجو" className="hover:text-green-400 transition">
              <Search size={24} />
            </button>
            <a href="/account" aria-label="حساب کاربری" className="hover:text-green-400 transition">
              <User size={24} />
            </a>
            <a href="/cart" className="relative hover:text-green-400 transition">
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                ۳
              </span>
            </a>

            {/* دکمه همبرگر موبایل */}
            <button
              className="md:hidden text-white focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="باز کردن منو"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* منوی موبایل */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-green-700/30">
            <ul className="flex flex-col gap-4 text-center text-lg">
              <li><a href="/" className="block py-2 hover:text-green-400">خانه</a></li>
              <li><a href="/products" className="block py-2 hover:text-green-400">محصولات</a></li>
              <li><a href="/about" className="block py-2 hover:text-green-400">درباره ما</a></li>
              <li><a href="/contact" className="block py-2 hover:text-green-400">تماس با ما</a></li>
              <li><a href="/blog" className="block py-2 hover:text-green-400">بلاگ</a></li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;