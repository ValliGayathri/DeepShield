import React from "react";
import InstructionsSection from "./InstructionsSection";
import HelpSection from "./HelpSection";
import logo from "../assets/logo.jpeg";

const LandingPage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-20">

        <div className="w-full md:w-1/2 flex justify-center">
          <img src={logo} alt="logo" className="w-80 fade-edges" />
        </div>

        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-6xl font-extrabold
                         bg-gradient-to-r from-[#a855f7] to-[#6366f1]
                         bg-clip-text text-transparent">
            Encrypted File Vault
          </h1>

          <p className="max-w-md">
            A secure platform to encrypt, store, and manage sensitive files.
          </p>
        </div>

      </section>

      {/* Scroll Sections */}
      <InstructionsSection />
      <HelpSection />

    </>
  );
};

export default LandingPage;