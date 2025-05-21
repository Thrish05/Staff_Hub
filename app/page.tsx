"use client"
import { useState, useEffect } from "react";
import Header from "./components/Header"
import Hero from "./components/Hero"
import Hero2 from "./components/Hero2"
import Hero3 from "./components/Hero3"
import Overlay from "./components/Overlay"
import Footer from "./components/Footer"

export default function Home() {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="relative w-full overflow-x-hidden">
      {showSplash && (
        <div className="fixed inset-0 flex flex-col justify-center items-center bg-white z-50 animate-fadeOut w-screen h-screen">
          <img src="/images/mob.gif" alt="Loading" className="w-50 rounded-lg center-10 h-40" />
          <img src="/images/loading.gif" alt="Loading" className="w-50 rounded-lg center-10 h-20" />
        </div>
      )}
      <div className={` ${showSplash ? "opacity-0" : "opacity-100"} transition-opacity duration-1000 flex flex-col`}>
        <Header />
        <Hero />
        <Overlay />
        <Hero2 />
        <Hero3 />
        <Hero2 />
        <Footer />
      </div>
    </div>
  )
}