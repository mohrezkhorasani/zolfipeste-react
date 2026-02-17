import { useRef } from "react";
import ArticleCard from "./ArticleCard";

export default function ArticlesCarousel() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const amount = 300;

    if (direction === "left") {
      container.scrollBy({ left: -amount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  const articles = [
    {
      id: 1,
      title: "خواص بادام زمینی برای استخوان چیست؟",
      image: "https://jiawaz-nuts.bantaco.ir/wp-content/uploads/2024/11/Benefits-of-peanuts-for-bones-300x169.jpg",
      date: "۱۵ آبان، ۱۴۰۳",
    },
    {
      id: 2,
      title: "آیا پسته برای قلب مفید است؟",
      image: "https://jiawaz-nuts.bantaco.ir/wp-content/uploads/2024/11/Benefits-of-peanuts-for-bones-300x169.jpg",
      date: "۱۶ آبان، ۱۴۰۳",
    },
    {
      id: 3,
      title: "بهترین آجیل برای کودکان",
      image: "https://jiawaz-nuts.bantaco.ir/wp-content/uploads/2024/11/Benefits-of-peanuts-for-bones-300x169.jpg",
      date: "۱۷ آبان، ۱۴۰۳",
    },
    {
      id: 3,
      title: "بهترین آجیل برای کودکان",
      image: "https://jiawaz-nuts.bantaco.ir/wp-content/uploads/2024/11/Benefits-of-peanuts-for-bones-300x169.jpg",
      date: "۱۷ آبان، ۱۴۰۳",
    },
    {
      id: 3,
      title: "بهترین آجیل برای کودکان",
      image: "https://jiawaz-nuts.bantaco.ir/wp-content/uploads/2024/11/Benefits-of-peanuts-for-bones-300x169.jpg",
      date: "۱۷ آبان، ۱۴۰۳",
    },
    {
      id: 3,
      title: "بهترین آجیل برای کودکان",
      image: "https://jiawaz-nuts.bantaco.ir/wp-content/uploads/2024/11/Benefits-of-peanuts-for-bones-300x169.jpg",
      date: "۱۷ آبان، ۱۴۰۳",
    },
    {
      id: 3,
      title: "بهترین آجیل برای کودکان",
      image: "https://jiawaz-nuts.bantaco.ir/wp-content/uploads/2024/11/Benefits-of-peanuts-for-bones-300x169.jpg",
      date: "۱۷ آبان، ۱۴۰۳",
    },
    {
      id: 3,
      title: "بهترین آجیل برای کودکان",
      image: "https://jiawaz-nuts.bantaco.ir/wp-content/uploads/2024/11/Benefits-of-peanuts-for-bones-300x169.jpg",
      date: "۱۷ آبان، ۱۴۰۳",
    },
    {
      id: 3,
      title: "بهترین آجیل برای کودکان",
      image: "https://jiawaz-nuts.bantaco.ir/wp-content/uploads/2024/11/Benefits-of-peanuts-for-bones-300x169.jpg",
      date: "۱۷ آبان، ۱۴۰۳",
    },
    {
      id: 3,
      title: "بهترین آجیل برای کودکان",
      image: "https://jiawaz-nuts.bantaco.ir/wp-content/uploads/2024/11/Benefits-of-peanuts-for-bones-300x169.jpg",
      date: "۱۷ آبان، ۱۴۰۳",
    },
    {
      id: 3,
      title: "بهترین آجیل برای کودکان",
      image: "https://jiawaz-nuts.bantaco.ir/wp-content/uploads/2024/11/Benefits-of-peanuts-for-bones-300x169.jpg",
      date: "۱۷ آبان، ۱۴۰۳",
    },
  ];

  return (
    <div className="relative w-full overflow-hidden" dir="rtl">

      {/* Right Button */}
      {/* Right Fade */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-22
  bg-gradient-to-l from-white to-transparent z-10" />

      {/* Right Button */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-5
    bg-myb backdrop-blur-sm
    hover:bg-white
        text-white
    shadow-md hover:shadow-lg
    hover:scale-[0.9] cursor-pointer 
    w-8 h-8 rounded-xl
    flex items-center justify-center
    transition-all duration-300"
      >
        <i class="iconly-Arrow-Right"></i>

      </button>
      {/* Left Fade */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-22
  bg-gradient-to-r from-white to-transparent z-10" />

      {/* Left Button */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-5
        text-white
    bg-myb backdrop-blur-sm
    hover:bg-white
    shadow-md hover:shadow-lg
    w-8 h-8 rounded-xl
    hover:scale-[0.9] cursor-pointer 
    flex items-center justify-center
    transition-all duration-300"
      >
        <i class="iconly-Arrow-Left"></i>

      </button>

      {/* Scroll Container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth py-4 px-12"
        style={{ scrollbarWidth: "none" }}
      >
        {articles.map((item) => (
          <ArticleCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
