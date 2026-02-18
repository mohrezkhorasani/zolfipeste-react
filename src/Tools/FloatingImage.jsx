import { useRef } from "react";

export default function FloatingImage({ src, className = "" }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      ref.current.getBoundingClientRect();

    const x = (e.clientX - (left + width / 2)) / 5000;
    const y = (e.clientY - (top + height / 2)) / 5000;

    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const resetPosition = () => {
    ref.current.style.transform = "translate(0px, 0px)";
  };

  return (
    <div
      className="inline-block"
      onMouseMove={handleMouseMove}
      onMouseLeave={resetPosition}
    >
      <img
        ref={ref}
        src={src}
        className={`transition-transform duration-200 ease-out will-change-transform ${className}`}
        alt=""
      />
    </div>
  );
}
