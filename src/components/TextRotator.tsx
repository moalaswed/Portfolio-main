import React from "react";
import { portfolioConfig } from "@/config/portfolio.config";

function TextRotator() {
  return (
    <div className="w-full py-4 rounded-md flex justify-center overflow-hidden">
      <div className="flex w-full items-center justify-center gap-x-2 whitespace-nowrap font-poppins text-[clamp(0.8rem,3.5vw,1.5rem)] text-gray-700">
        <span className="shrink-0">I am a {portfolioConfig.title} &</span>
        <span className="inline-flex h-[1.2em] min-w-0 overflow-hidden">
          <ul className="block text-left font-rubik text-[clamp(1rem,4.5vw,1.875rem)] leading-[1.2] [&_li]:block animate-text-slide">
            {portfolioConfig.skills.roles.map((role, index) => (
              <li key={index} className="text-[#2f7df4]">
                {role}
              </li>
            ))}
          </ul>
        </span>
      </div>
    </div>
  );
}

export default TextRotator;
