"use client";
import Header from "../components/Header"
import Sidebar from "../components/sideBar"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Analytics from "../components/Analytics"
export default function Dash()
{
    const[showSplash, setshowSplash] = useState(false);
    const router = useRouter();
    const user = localStorage.getItem("user");
    useEffect(() => {
        
        if(!user)
        {
            router.push("/");
        }
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
            {user != null && (<div className={`${showSplash ? "opacity-0" : "opacity-100"} w-full transition-opacity duration-1000`}>
                <Header/>
                <div className="flex flex-row">
                    <Sidebar />
                    <Analytics />
                </div>
            </div>)
    }
        </div>
    );
}