export default function ContactUsFieldIconOnly({ svgPath, href }) {
    return (
        <div className="flex items-center gap-4 p-4  rounded-lg">
            {/* آیکون */}
            <div className="flex-shrink-0 bg-gray-100 rounded-md
                             text-myb w-8 h-8 flex items-center justify-center">
                <svg
                    aria-hidden="true"
                    className="w-4 h-4"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                >
                    <path d={svgPath} />
                </svg>
            </div>
        </div>
    )
}