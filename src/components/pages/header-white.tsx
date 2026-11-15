import { Download } from "lucide-react";
import React from "react";

function HeaderWhite() {
  return (
    <div className="w-full flex justify-between items-center px-4 xl:px-40 py-4 3xl:py-6 sticky top-0 z-20">
      <a
        href="https://drive.google.com/file/d/1EqTXaWGWUnww93vrzTVQemVzjfPgMbs5/view?usp=sharing"
        rel="canonical"
        target="_blank"
        className="flex items-center text-white text-sm xl:text-base body-code-medium gap-2 rounded-[12px] px-2 py-2 cursor-pointer"
      >
        <div className="text-blue-500 bg-white border-3 border-blue-300 p-3 rounded-lg flex items-center justify-center">
          <Download size={18} />
        </div>
        RESUME
      </a>

      <a
       href="/"
       className="absolute left-1/2 -translate-x-1/2">
        <img
          src="/logos/ziel-logo-white.png"
          alt=""
          className="w-8 xl:w-full h-auto"
        />
      </a>

      <a
        href="mailto:nurrahmathaniff@gmail.com"
        rel="canonical"
        target="_blank"
        className="flex items-center text-white text-sm xl:text-base body-code-medium uppercase gap-2 bg-purple-600 rounded-lg px-4 py-2 xl:py-4 cursor-pointer border-4 border-purple-400"
      >
        Get in Touch
      </a>
    </div>
  );
}

export default HeaderWhite;
