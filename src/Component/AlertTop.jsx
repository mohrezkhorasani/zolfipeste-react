import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

export function AlertTop({
  text = "4 × “پسته احمدآقایی برشته دو آتشه زعفرانی” به سبد خرید شما اضافه شد.",
  status = 200,
  buttonText = "مشاهده سبد خرید",
  buttonHref = "#"
}) {
  const Icon = status === 200 ? FaCheckCircle : FaExclamationCircle;

  return (
    <div
      className={`flex flex-col sm:flex-row items-start sm:items-center px-4 sm:px-5 py-3 sm:py-4 border-r-8 rounded-tl-2xl rounded-br-2xl 
        border ${status === 200 ? "border-[#2B3992]" : "border-yellow-500"} text-[#2B3992] gap-2 sm:gap-5`}
    >
      <Icon
        className={`text-xl sm:text-2xl ${status === 200 ? "text-[#4353bb]" : "text-yellow-500"}`}
      />
      <p className="text-sm sm:text-base text-[#515151]">{text}</p>

      {buttonText != null && (
        <a
          href={buttonHref}
          className={`mt-2 sm:mt-0 ${status === 200 ? "bg-[#2B3992]" : "bg-yellow-500"} 
            hover:scale-102 rounded-xl text-white text-sm sm:text-base px-3 py-1 
            font-bold sm:mr-auto transition-all duration-300`}
        >
          {buttonText}
        </a>
      )}
    </div>
  );
}