import React from "react";

type ButtonProps = {
  // theme: ""
  type: "button" | "submit";
  children: React.ReactNode;
};

export default function Button({ type = "button", children }: ButtonProps) {
  return (
    <button
      type={type}
      className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide border-2 border-slate-200 bg-slate-200 text-slate-900 transition duration-200 rounded shadow-md md:w-auto hover:bg-slate-700 hover:text-white focus:shadow-outline focus:outline-none"
    >
      {children}
    </button>
  );
}
