import React from 'react';
import logo from "../assets/logo.jpeg";

const HelpSection = () => {
  return (
    <section
      id="help"
      className="min-h-screen bg-white dark:bg-[#060012] transition-all duration-500"
    >
      <div className="max-w-6xl mx-auto p-8">

        

        <div className="flex flex-col md:flex-row gap-12 items-center">

          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={logo}
              alt="logo"
              className="w-72 h-auto object-contain fade-edges"
            />
          </div>

          <div className="w-full md:w-1/2 space-y-8">

            <div>
              <h3 className="text-3xl font-bold dark:text-[#ccc] mb-2">
                Need help?
              </h3>
              <p className="text-xl text-gray-600 dark:text-[#ccc] mb-4">
                Refer to the instructions or contact us.
              </p>
            </div>

            <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
              <p className="text-lg font-semibold dark:text-[#ccc] mb-4">
                For further Queries
              </p>
              <div className="flex items-center gap-3 text-blue-700 text-xl font-medium underline">
                ✉️
                <a href="mailto:efv@gmail.com">efv@gmail.com</a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpSection;