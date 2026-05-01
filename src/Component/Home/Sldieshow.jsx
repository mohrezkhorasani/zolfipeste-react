import { useState, useRef, useEffect } from "react";
import { Navigate, useNavigate, useLocation, Outlet } from 'react-router-dom';

export default function ModernMediaSlider({ items = [], interval = 5000 }) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(null);
  const autoPlayRef = useRef(null);
  const navigate = useNavigate();

  const nextSlide = () => {
    // Ensure we only slide if there are multiple items to slide between
    if (items.length > 1) {
      setCurrent((prev) => (prev + 1) % items.length);
    }
  };

  const prevSlide = () => {
    // Ensure we only slide if there are multiple items to slide between
    if (items.length > 1) {
      setCurrent((prev) => (prev - 1 + items.length) % items.length);
    }
  };

  const handleTouchStart = (e) => {
    // Only enable touch if there are multiple items to interact with
    if (items.length > 1) {
      touchStartX.current = e.touches[0].clientX;
    }
  };

  const handleTouchEnd = (e) => {
    if (items.length > 1 && touchStartX.current !== null) {
      const endX = e.changedTouches[0].clientX;
      if (touchStartX.current - endX > 50) {
        nextSlide();
      } else if (endX - touchStartX.current > 50) {
        prevSlide();
      }
      startAutoPlay(); // Restart autoplay after touch interaction
    }
    // Reset touchStartX to null after handling the touch event
    touchStartX.current = null;
  };

  useEffect(() => {
    // Start autoplay if there's more than one item
    if (items.length > 1) {
      startAutoPlay();
    }
    // Cleanup function to clear interval when component unmounts or items change
    return () => stopAutoPlay();
  }, [items.length, interval]); // Re-run effect if items or interval changes

  const startAutoPlay = () => {
    stopAutoPlay(); // Clear any existing interval to prevent duplicates
    if (items.length > 1) { // Only start autoplay if there are multiple items
      autoPlayRef.current = setInterval(nextSlide, interval);
    }
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null; // Clear the ref
    }
  };
  function onClickBox (item)  {
    if(item.href){
      navigate(item.href,"_blank")
    }
  };
  // Determine if carousel controls should be active
  const controlsActive = items.length > 1;

  return (
    <div className="relative w-12/12  mx-auto overflow-hidden rounded-2xl shadow-xl bg-black">
      {/* Slides */}
      <div
        className="flex transition-transform duration-500"
        // Using current * 100% which should work for RTL as well for moving left
        style={{ transform: `translateX(${current * 100}%)` }}
        onTouchStart={controlsActive ? handleTouchStart : null}
        onTouchEnd={controlsActive ? handleTouchEnd : null}
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            onClick={()=>{
              onClickBox(item)
            }}
            className="w-full sm:h-[150px] xs:h-[150px] md:h-[160px] lg:h-[150px] 2xl:h-[450px]
             shrink-0 flex justify-center items-center bg-black cursor-pointer"
          >
            {item.type === "image" || item.type === "gif" ? (
              <img
                src={item.link}
                className="w-full h-full object-fill overflow-hidden "
                loading="lazy" // <<< Loading lazy is now ACTIVE
                onError={(e) => (e.target.src = "/fallback.jpg")}
              />
            ) : null}

            {item.type === "video" ? (
              <video
                src={item.link}
                muted
                autoPlay={controlsActive} // Autoplay only if controls are active
                loop
                playsInline
                preload="auto"
                className="w-full h-full object-fill"
                onError={(e) => console.log("Video load error:", e)}
              />
            ) : null}
          </div>
        ))}
      </div>

      {/* Buttons */}
      {controlsActive && (
        <>
          <button
            onClick={() => {
              nextSlide();
              startAutoPlay(); // Restart autoplay after manual navigation
            }}
            className="absolute top-1/2 left-3 -translate-y-1/2 bg-[#0B3F32]/20 backdrop-blur-md text-[#0B3F32] p-3 rounded-full hover:bg-white/40 transition"
            aria-label="Previous Slide" // Added for accessibility
          >
            ›
          </button>

          <button
            onClick={() => {
              prevSlide();
              startAutoPlay(); // Restart autoplay after manual navigation
            }}
            className="absolute top-1/2 right-3 -translate-y-1/2 bg-[#0B3F32]/20 backdrop-blur-md text-[#0B3F32] p-3 rounded-full hover:bg-white/40 transition"
            aria-label="Next Slide" // Added for accessibility
          >
            ‹
          </button>

          {/* Dots */}
          <div className="absolute bottom-0 py-3 w-full flex justify-center gap-2 bg-[#0b3f3234]">
            {items.map((_, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setCurrent(idx);
                  startAutoPlay(); // Restart autoplay when a dot is clicked
                }}
                className={`w-3 h-3 rounded-full cursor-pointer transition ${current === idx ? "bg-[#0B3F32]" : "bg-[#0B3F32]/40"
                  }`}
                aria-label={`Go to Slide ${idx + 1}`} // Added for accessibility
              ></div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
