import React from "react";
import logo from "../assets/logo.jpeg";

const InstructionsSection = () => {
  return (
    <section
  id="instructions"
  className="
    w-full py-20 px-8 md:px-20
    bg-[#ffffff]
    dark:bg-[#060012]
    transition-all duration-500
  "
>

      <div className="max-w-6xl mx-auto">

        <h2 className="
          text-4xl font-bold mb-12
          text-[#1e004d]
          dark:text-[#b366ff]
        ">
          Instructions
        </h2>

        <div className="flex flex-col md:flex-row gap-12 items-start">

          {/* Left Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={logo}
              alt="logo"
              className="w-72 md:w-96 h-auto object-contain fade-edges"
            />
          </div>

          {/* Right Content */}
          <div className="w-full md:w-1/2 pt-4">
            <ul className="space-y-6">
              {[
                "Use strong passwords (minimum 10 characters).",
                "Do not share your encryption password.",
                "Always logout after usage on shared devices.",
                "Encrypted files cannot be recovered without correct password."
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-4 text-lg
                  text-[#140033] dark:text-[#ccc]">

                  <span className="
                    h-3 w-3 rounded-full
                    bg-gradient-to-r from-[#a855f7] to-[#6366f1]
                  "></span>

                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default InstructionsSection;