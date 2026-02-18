export function FadeIn({
  children,
  visible,
  innerRef,
  className = "",
  fade = "up", // default
}) {
  const animations = {
    up: visible
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-10",

    down: visible
      ? "opacity-100 translate-y-0"
      : "opacity-0 -translate-y-10",

    left: visible
      ? "opacity-100 translate-x-0"
      : "opacity-0 translate-x-10",

    right: visible
      ? "opacity-100 translate-x-0"
      : "opacity-0 -translate-x-10",

    scale: visible
      ? "opacity-100 scale-100"
      : "opacity-0 scale-95",

    rotate: visible
      ? "opacity-100 rotate-0"
      : "opacity-0 rotate-3",
  };

  return (
    <div
      ref={innerRef}
      className={`
        transition-all duration-700 ease-out
        ${animations[fade]}
        ${className} 
      `}
    >
      {children}
    </div>
  );
}
