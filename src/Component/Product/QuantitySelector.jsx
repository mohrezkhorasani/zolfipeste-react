import { useState } from "react";

export default function QuantitySelector({quantity, setQuantity, disabled=false}) {

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 0 ? prev - 1 : 0));

  return (
    <div className="flex items-center bg-[#F0F0F0] rounded-xl mt-2 w-fit">
      {/* دکمه + */}
      <button
        onClick={increment}
        className="bg-white w-10 h-10 m-2 text-lg rounded-lg font-bold hover:bg-gray-100 transition flex items-center justify-center"
        disabled={disabled}
      >
        +
      </button>

      {/* input */}
      <input
        type="text"
        readOnly
        value={quantity}
        className="w-12 text-center bg-transparent text-black text-sm focus:outline-none appearance-none"
      />

      {/* دکمه - */}
      <button
        onClick={decrement}
        className="bg-white w-10 h-10 m-2 text-lg font-bold rounded-lg hover:bg-gray-100 transition flex items-center justify-center"
        disabled={disabled}
      >
        -
      </button>
    </div>
  );
}
