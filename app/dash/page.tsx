"use client";
import Header from "../components/Header"
import { useState, useEffect } from "react";
import FacultyDashboard from "../components/FacultyDashboard"
export default function Dash()
{
    const[showSplash, setshowSplash] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setshowSplash(false);
        }, 1000)
        return () => clearTimeout(timer);
    },[]);
    return(
        <div>
            {showSplash && (
                <div className="fixed inset-0 flex items-center justify-center">
                    <h1 className="text-[100px] bg-colorfulWater bg-clip-text text-transparent font-light">
                    Welcome to CITADEL
                    </h1>
              </div>
            )}
            <div className={`${showSplash ? "opacity-0" : "opacity-100"} transition-opacity duration-1000`}>
                <Header className = {``}/>
                <FacultyDashboard />
            </div>
        </div>
    );
}