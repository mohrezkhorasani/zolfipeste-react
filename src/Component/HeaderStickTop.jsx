import { useState } from "react";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import Cookies from "js-cookie";
import LoginModal from "../Modal/Auth/LoginModal";

export default function HeaderStickTop() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);



  const menuItems = [
    "خانه",
    "تماس باما",
    "درباره ما",
    "اخبار و اطلاع رسانی",
  ];

  return (
    <>
      {/* HEADER */}
      <header
        dir="rtl"
        className="w-full bg-[#11207A] py-4 flex items-center justify-between px-4 md:px-60 gap-4"
      >
        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4 md:gap-10">
          <a href="/">
            {/* LOGO */}
            <h1 className="text-xl font-bold whitespace-nowrap">
              <span className="text-[#BBD430] font-bold">پسته</span>{" "}
              <span className="text-white">ذوالفقاری</span>
            </h1>
          </a>

          {/* MENU */}
          <nav className="hidden md:flex gap-8">
            {menuItems.map((item, i) => (
              <a
                key={i}
                href="#"
                className="relative text-white transition-colors duration-300 hover:text-[#BBD430] group whitespace-nowrap"
              >
                {item}
                <span className="absolute left-1/2 bottom-[-6px] h-[2px] w-0 bg-[#BBD430] transition-all duration-300 group-hover:w-full group-hover:left-0" />
              </a>
            ))}
          </nav>
        </div>

        {/* LEFT SIDE */}
        <div className="flex items-center gap-2" dir="ltr">
          {/* SEARCH ICON */}
          <button
            onClick={() => setSearchOpen(true)}
            className="relative w-10 h-10 rounded-xl bg-white/30 cursor-pointer flex items-center justify-center text-white transition-all duration-300 hover:bg-[#BBD430] hover:text-[#11207A] hover:ring-1 hover:ring-[#BBD430] hover:ring-offset-1 hover:ring-offset-[#11207A]"
          >
            <FaSearch className="scale-110" />
          </button>

          {/* ACCOUNT BUTTON */}
          <button onClick={() => {
            if (!Cookies.get("t1")) {
              setLoginOpen(true);
            }
          }} className="relative flex items-center gap-2 px-4 py-2 rounded-xl bg-[#BBD430]/30 text-[#BBD430] transition-all duration-300 hover:bg-[#BBD430] cursor-pointer hover:text-[#11207A] hover:ring-1 hover:ring-[#BBD430] hover:ring-offset-1 hover:ring-offset-[#11207A]">
            <span>حساب کاربری</span>
            <FaUser />
          </button>

          {/* CART */}
          <div
            className="relative"
            onMouseEnter={() => setCartOpen(true)}
            onMouseLeave={() => setCartOpen(false)}
          >
            <button className="relative w-10 h-10 rounded-xl bg-white/30 flex items-center justify-center text-white transition-all duration-300 hover:bg-[#BBD430] hover:text-[#11207A] hover:ring-1 hover:ring-[#BBD430] hover:ring-offset-1 hover:ring-offset-[#11207A]">
              <FaShoppingCart className="scale-100" />
              <span className="absolute -top-1 -right-1 bg-white text-[#11207A] text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                3
              </span>
            </button>

            {/* CART DROPDOWN */}
            <div
              className={`absolute left-0 mt-3 w-72 bg-white rounded-xl shadow-xl p-4 transition-all duration-200 origin-top ${cartOpen
                ? "opacity-100 visible translate-y-0"
                : "opacity-0 invisible translate-y-2"
                }`}
            >
              <p className="text-sm text-gray-600 text-right">سبد خرید شما</p>
              <div className="mt-3 text-sm text-gray-500 text-right">
                محصولی در سبد نیست
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* SEARCH MODAL */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md relative">
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute left-3 top-3 text-gray-500"
            >
              ✕
            </button>

            <h3 className="text-right font-bold mb-4">جستجو</h3>

            <input
              type="text"
              placeholder="جستجو کنید..."
              className="w-full border rounded-lg p-2 text-right outline-none focus:ring-2 focus:ring-[#BBD430]"
            />
          </div>
        </div>
      )}
      {loginOpen &&
        <LoginModal />
      }
    </>
  );
}