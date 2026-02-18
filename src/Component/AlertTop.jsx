import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";


export function AlertTop({ text = "4 × “پسته احمدآقایی برشته دو آتشه زعفرانی” به سبد خرید شما اضافه شد.",
    status = 200, buttonText="مشاهده سبد خرید" ,buttonHref="#"
}) {
    const Icon = status === 200 ? FaCheckCircle : FaExclamationCircle;
    return (
        <div className={`flex flex-row px-5 py-4 border-r-8 rounded-tl-2xl rounded-br-2xl border 
        ${status==200?"border-[#2B3992]":"border-yellow-500"} text-[#2B3992]`}>
            <Icon className={status === 200 ? "text-[#4353bb]" : "text-yellow-500"} />
            <p className="text-sm mx-5 text-[#515151]">{text}</p>

          {buttonText!=null &&
            <a
                href={buttonHref}
                className={`${status==200?"bg-[#2B3992]":"bg-yellow-500"} hover:scale-102 
                    rounded-xl text-white text-sm px-3 py-1 
                    font-bold mr-auto hover:rounded-b-none hover:rounded-t-2xl transition-all duration-300
                    `}
            >
                {buttonText}
            </a>
          }
        </div>
    )
}