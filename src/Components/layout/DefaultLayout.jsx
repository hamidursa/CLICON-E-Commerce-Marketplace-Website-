import React from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../navigation/Navbar";
import Footer from "../../Components/Footer";

/**
 * Main Default Layout wrapping Navbar, dynamic Outlet content, ScrollRestoration, and Footer
 */
const DefaultLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#191C1F] antialiased selection:bg-[#FA8232] selection:text-white">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <ScrollRestoration />
      <Footer />
    </div>
  );
};

export default DefaultLayout;
