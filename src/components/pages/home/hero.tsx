import { Badge } from "@/components/ui/badge";
import { MarqueeDemo } from "@/components/ui/marquee-demo";
import { ChevronsRight, Disc2, Download, FileSearchCorner } from "lucide-react";
import React from "react";
import HeaderWhite from "../header-white";
import { Cover } from "@/components/ui/cover";

const tools = [
  {
    label: "UI Design",
    borderColor: "border-[#dbeafe]",
    textColor: "text-blue-600",
  },
  {
    label: "UX Research",
    borderColor: "border-[#ddd6ff]",
    textColor: "text-violet-600",
  },
  {
    label: "Data Synthesis",
    borderColor: "border-[#a4f4cf]",
    textColor: "text-emerald-600",
  },
  {
    label: "Wireframing",
    borderColor: "border-red-200",
    textColor: "text-red-600",
  },
];

const Hero = () => {
  return (
    <div className="w-full">
      <img
        src="/images/asteroids.png"
        alt=""
        className="w-full h-210 3xl:h-240 absolute top-0 left-0 inset-0 object-cover brightness-80"
      />
      {/* Hero Section */}
      <HeaderWhite />
      <div className="relative w-full flex flex-col justify-center items-center gap-4 3xl:gap-10 overflow-hidden pb-20 base:pb-52 3xl:pb-60 px-4 md:px-12 xl:px-0">
        <h1 className="w-80 md:w-120 lg:w-180 3xl:w-180 body-semibold text-white text-3xl xl:text-[56px] text-center tracking-[0] leading-normal xl:leading-18 3xl:leading-normal z-20 py-20 sm:py-10">
          Creative, versatile, and analytical{" "}
          <Cover className="text-white inline-block relative z-20 transition duration-200">
            designer
          </Cover>
        </h1>

        <div className="w-full flex flex-col md:w-129 3xl:w-150 gap-4 z-20">
          {/* Upper Card */}
          <div className="flex w-full xs:col-span-2 md:col-span-12 bg-white rounded-[24px] p-4 gap-4">
            <img
              src="/logos/ziel-logo-alternate.svg"
              alt=""
              className="w-10 h-auto"
            />
            <p className="body-regular text-neutral-800 leading-6 text-base 3xl:text-lg">
              Interface designer and UX researcher immersed in user ecosystems
              to decode deep behavioral patterns, bridging
              strategy with genuine human empathy.
            </p>
          </div>

          <div className="flex gap-2 items-stretch">
            {/* Left Card: always square, always same height as right card */}
            <div className="aspect-square shrink-0 bg-purple-500/20 border-4 border-purple-500 backdrop-blur-sm rounded-[20px] base:rounded-[24px] p-2 flex justify-center items-center">
              <img
                src="/images/ziel-hanif.svg"
                alt="Ziel Hanif Icon"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Right Card */}
            <div className="flex-1 min-w-0 bg-white rounded-[20px] base:rounded-[24px] p-3 md:p-4 flex flex-col items-stretch">
              <h3 className="text-neutral-800 body-semibold flex items-center justify-between w-full text-base md:text-lg 3xl:text-xl">
                My main tools
              </h3>
              <div className="flex-1 flex items-center overflow-hidden">
                <MarqueeDemo />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;