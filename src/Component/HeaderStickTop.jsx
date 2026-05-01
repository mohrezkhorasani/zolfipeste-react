import { useEffect, useState } from "react";
import { FaBars, FaInfoCircle, FaSearch, FaShoppingCart, FaSignOutAlt, FaTachometerAlt, FaTimes, FaUser } from "react-icons/fa";
import Cookies from "js-cookie";
import LoginModal from "../Modal/Auth/LoginModal";
import { useNavigate } from 'react-router-dom';



export default function HeaderStickTop({ user }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const navigation = useNavigate(); // یا هر روش دیگر برای مسیریابی
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // وضعیت منوی موبایل
  const [showMobileAccountMenu, setShowMobileAccountMenu] = useState(false); // وضعیت منوی موبایل
  const [showAccountDropdown, setShowAccountDropdown] = useState(false); // وضعیت منوی موبایل

  useEffect(() => {
    if (!showAccountDropdown) return;
    const handleClickOutside = (event) => {
      // Check if click is outside the dropdown container (desktop)
      const dropdownContainer = document.querySelector('.lg\\:block.relative');
      if (dropdownContainer && !dropdownContainer.contains(event.target)) {
        setShowAccountDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showAccountDropdown]);
  // console.log(user)
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLoginRedirect = () => {
    if (!Cookies.get("vc2AuthNorm")) {
      navigation("/login"); // استفاده از push برای Next.js
    } else {
      navigation("/"); // یا مسیری که می‌خواهید کاربر را به آنجا ببرد
    }
  };
  function logout() {
    Cookies.remove("vc2AuthNorm")
    window.location.href = "/";
  }

  const menuItems = [
    { title: "خانه", href: "/" },
    { title: "تماس باما", href: "/contact-form" },
    { title: "درباره ما", href: "https://hekmateislami.com/%D8%AF%D8%B1%D8%A8%D8%A7%D8%B1%D9%87-%D9%85%D8%A7" },
    { title: "اخبار و اطلاع رسانی", href: "https://eitaa.com/hekmateislami" },
  ];

  return (
    <>
      <header dir="rtl" className="bg-[#11217a00] text-white z-50 transition-all sticky top-0">
        {/* نوار بالایی - responsive text */}
        <div className="bg-[#FFB900] text-center py-1.5 text-[10px] sm:text-xs md:text-sm font-medium px-2 text-black">
          با توجه به شرایط فعلی اینترنت اگر مشکلی برای ورود به جلسات داشتید میتوانید فایل جلسه را بعدا دریافت کنید
        </div>

        {/* هدر اصلی - mobile first */}
        <div className="w-full bg-[#0b3f32] py-3 sm:py-4 flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-20 xl:px-40 2xl:px-60 gap-2 sm:gap-4 z-50 relative">

          {/* RIGHT SIDE - Logo Area */}
          <div className="flex items-center gap-2 sm:gap-4 md:gap-10 flex-1 sm:flex-none">
            <a href="/" className="flex items-center">
              <h1 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold whitespace-nowrap">
                <span className="text-[#30d4cc] font-bold">فضای مجازی</span>{" "}
                <span className="hidden xs:inline text-white">مجمع عالی حکمت اسلامی</span>
                <span className="xs:hidden text-white">حکمت اسلامی</span>
              </h1>
            </a>

            {/* DESKTOP MENU - hidden on mobile/tablet */}
            <nav className="hidden lg:flex gap-4 xl:gap-8">
              {menuItems.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="relative text-white transition-colors duration-300 hover:text-[#30d4cc] group whitespace-nowrap text-sm xl:text-base"
                >
                  {item.title}
                  <span className="absolute left-1/2 bottom-[-6px] h-[2px] w-0 bg-[#30d4cc] transition-all duration-300 group-hover:w-full group-hover:left-0" />
                </a>
              ))}
              {user && user.permissions.includes("create_meeting") && (
                <a
                  href="/rooms"
                  className="relative transition-colors duration-300 text-[#b4ff97]  hover:text-[#FFFFFF] group whitespace-nowrap text-sm xl:text-base"
                >
                  اتاق های عمومی
                  <span className="absolute left-1/2 bottom-[-6px] h-[2px] w-0 bg-[#FFFF] transition-all duration-300 group-hover:w-full group-hover:left-0" />
                </a>
              )}
            </nav>
          </div>

          {/* LEFT SIDE - Only Menu Button on Mobile */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Mobile Menu Button - visible on mobile/tablet */}
            <button
              onClick={handleMobileMenuToggle}
              className="lg:hidden p-1.5 sm:p-2 text-white hover:text-[#30d4cc] transition-colors"
              aria-label="منو"
            >
              {isMobileMenuOpen ? <FaTimes className="scale-110 sm:scale-125" /> : <FaBars className="scale-110 sm:scale-125" />}
            </button>

            {/* SEARCH Button - Hidden on mobile, visible on desktop */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden lg:flex relative w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/30 items-center justify-center text-white transition-all duration-300 hover:bg-[#30d4cc] hover:text-[#11207A] hover:ring-1 hover:ring-[#30d4cc] hover:ring-offset-1 hover:ring-offset-[#11207A]"
              aria-label="جستجو"
            >
              <FaSearch className="scale-100 sm:scale-110" />
            </button>

            {/* ACCOUNT Button - Desktop with Dropdown */}
            {user == null ? (
              <button
                onClick={handleLoginRedirect}
                className="hidden lg:flex relative items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-xl bg-[#30d4cc]/30 text-[#30d4cc] transition-all duration-300 hover:bg-[#30d4cc] hover:text-[#11207A] hover:ring-1 hover:ring-[#30d4cc] hover:ring-offset-1 hover:ring-offset-[#11207A] text-sm sm:text-base"
                aria-label="حساب کاربری"
              >
                <span className="xs:inline text-xs sm:text-sm">ورود به حساب کاربری</span>
                <FaUser className="text-xs sm:text-sm" />
              </button>
            ) : (
              <div className="hidden lg:block relative">
                <button
                  onClick={() => setShowAccountDropdown(!showAccountDropdown)}
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-xl bg-[#30d4cc]/30 text-[#30d4cc] transition-all duration-300 hover:bg-[#30d4cc] hover:text-[#11207A] hover:ring-1 hover:ring-[#30d4cc] hover:ring-offset-1 hover:ring-offset-[#11207A] text-sm sm:text-base"
                  aria-label="حساب کاربری"
                >
                  <span className="xs:inline text-xs sm:text-sm">
                    {user.fullname?.length > 10 ? `${user.fullname.slice(0, 10)}...` : user.fullname}
                  </span>
                  <FaUser className="text-xs sm:text-sm" />
                </button>
                {showAccountDropdown && (
                  <div className="absolute left-0 mt-2 w-64 rounded-xl bg-white shadow-lg ring-1 ring-black/5 z-50 overflow-hidden animate-fadeIn">
                    <div className="py-2">
                      {/* {user?.permissions?.includes("admin") && (
                        <a
                          href="/admin/dashboard"
                          className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setShowAccountDropdown(false)}
                        >
                          <span>داشبورد مدیریت</span>
                          <FaTachometerAlt className="text-gray-400 text-sm" />
                        </a>
                      )} */}
                      <a
                        href="/"
                        className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setShowAccountDropdown(false)}
                      >
                        <span>داشبورد من</span>
                        <FaInfoCircle className="text-gray-400 text-sm" />
                      </a>
                      <div className="border-t border-gray-100 my-1"></div>
                      <button
                        onClick={() => {
                          setShowAccountDropdown(false);
                          if (typeof logout === "function") logout();
                          else console.log("logout");
                        }}
                        className="flex items-center justify-between w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <span>خروج از حساب کاربری</span>
                        <FaSignOutAlt className="text-red-500 text-sm" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* MOBILE MENU - With close button and improved styling */}
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                onClick={handleMobileMenuToggle}
              />

              {/* Menu Panel */}
              <div className="fixed top-0 left-0 bottom-0 w-80 bg-[#0b3f32] shadow-2xl z-50 transform transition-transform duration-300 flex flex-col">
                {/* Header with close button */}
                <div className="flex justify-between items-center p-4 border-b border-white/20">
                  <h2 className="text-white font-bold text-lg">منو</h2>
                  <button
                    onClick={handleMobileMenuToggle}
                    className="p-2 text-white hover:text-[#30d4cc] transition-colors rounded-full hover:bg-white/10"
                    aria-label="بستن منو"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                </div>

                {/* Scrollable menu items */}
                <div className="flex-1 overflow-y-auto py-4 px-3">
                  {menuItems.map((item, i) => (
                    <a
                      key={i}
                      href={item.href}
                      className="block text-white transition-colors duration-300 hover:text-[#30d4cc] hover:bg-white/10 py-3 px-3 rounded-lg text-right border-b border-white/10 last:border-0"
                      onClick={handleMobileMenuToggle}
                    >
                      {item.title}
                    </a>
                  ))}

                  <div className="h-px bg-white/20 my-3"></div>

                  {/* Search option */}
                  <button
                    onClick={() => {
                      setSearchOpen(true);
                      handleMobileMenuToggle();
                    }}
                    className="w-full text-right py-3 px-3 text-white transition-colors duration-300 hover:text-[#30d4cc] hover:bg-white/10 rounded-lg flex items-center justify-between"
                  >
                    <span>جستجو</span>
                    <FaSearch className="text-[#30d4cc]" />
                  </button>

                  {/* Account section with nested dropdown for mobile */}
                  {user == null ? (
                    <button
                      onClick={() => {
                        handleLoginRedirect();
                        handleMobileMenuToggle();
                      }}
                      className="w-full text-right py-3 px-3 text-white transition-colors duration-300 hover:text-[#30d4cc] hover:bg-white/10 rounded-lg flex items-center justify-between"
                    >
                      <span>ورود به حساب کاربری</span>
                      <FaUser className="text-[#30d4cc]" />
                    </button>
                  ) : (
                    <div>
                      <button
                        onClick={() => setShowMobileAccountMenu(!showMobileAccountMenu)}
                        className="w-full text-right py-3 px-3 text-white transition-colors duration-300 hover:text-[#30d4cc] hover:bg-white/10 rounded-lg flex items-center justify-between"
                      >
                        <span>{user.fullname?.length > 10 ? `${user.fullname.slice(0, 10)}...` : user.fullname}</span>
                        <FaUser className="text-[#30d4cc]" />
                      </button>
                      {showMobileAccountMenu && (
                        <div className="mr-4 mt-1 bg-[#0f4a3a] rounded-xl overflow-hidden shadow-inner">
                          {user?.permissions?.includes("admin") && (
                            <a
                              href="/admin/dashboard"
                              className="flex items-center justify-between px-4 py-3 text-sm text-white hover:bg-[#30d4cc]/20 transition-colors border-b border-white/10"
                              onClick={() => {
                                setShowMobileAccountMenu(false);
                                handleMobileMenuToggle();
                              }}
                            >
                              <span>داشبورد مدیریت</span>
                              <FaTachometerAlt className="text-[#30d4cc] text-sm" />
                            </a>
                          )}
                          <a
                            href="/"
                            className="flex items-center justify-between px-4 py-3 text-sm text-white hover:bg-[#30d4cc]/20 transition-colors border-b border-white/10"
                            onClick={() => {
                              setShowMobileAccountMenu(false);
                              handleMobileMenuToggle();
                            }}
                          >
                            <span>داشبورد من</span>
                            <FaInfoCircle className="text-[#30d4cc] text-sm" />
                          </a>
                          <button
                            onClick={() => {
                              setShowMobileAccountMenu(false);
                              handleMobileMenuToggle();
                              if (typeof logout === "function") logout();
                              else console.log("logout");
                            }}
                            className="flex items-center justify-between w-full px-4 py-3 text-sm text-red-300 hover:bg-[#30d4cc]/20 transition-colors"
                          >
                            <span>خروج از حساب کاربری</span>
                            <FaSignOutAlt className="text-red-400 text-sm" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </header>

      {/* SEARCH MODAL - responsive */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-sm sm:max-w-md relative">
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute left-3 top-3 text-gray-500 hover:text-gray-700 text-lg sm:text-xl"
              aria-label="بستن"
            >
              ✕
            </button>

            <h3 className="text-right font-bold mb-4 text-base sm:text-lg">جستجو</h3>

            <input
              type="text"
              placeholder="جستجو کنید..."
              className="w-full border rounded-lg p-2 sm:p-3 text-right outline-none focus:ring-2 focus:ring-[#30d4cc] text-sm sm:text-base"
              autoFocus
            />
          </div>
        </div>
      )}

      {loginOpen && <LoginModal dismiss={() => setLoginOpen(false)} />}

      {/* Add CSS animation for fadeIn */}
      <style jsx>{`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
      animation: fadeIn 0.2s ease-out;
    }
  `}</style>

      {/* Outside click handler for desktop dropdown */}
      <script dangerouslySetInnerHTML={{
        __html: `
      document.addEventListener('click', function(event) {
        var dropdown = document.querySelector('.lg\\\\:block.relative');
        if (dropdown && !dropdown.contains(event.target)) {
          // We need to call React state setter; better to use useEffect in component.
          // Instead, we'll add a useEffect in the component logic.
        }
      });
    `
      }} />
    </>
  );
}