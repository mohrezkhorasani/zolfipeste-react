export default function FilterDetailsSummery({title,value,className}) {
    return (
        <div className={`flex py-3 flex-row text-black text-[0.625rem] ${className}`}>
            <h1 className="font-bold mx-3">{title}: </h1>
            <a href="#" className="hover:underline hover:underline-[#11207A] text-[#242424] text-[0.725rem] mr-auto ml-[35%]">{value}</a>
        </div>
    )
}