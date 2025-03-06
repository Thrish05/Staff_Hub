"use client";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
export default function Header({className})
{
    const currPath = usePathname();
    const [dropdownOpen, setdropdownOpen] = useState(false);
    const profileButtonRef = useRef(null);
    const dropdownRef = useRef(null);

    const handleDropDownClick = () =>
    {
        console.log("clicked");
        setdropdownOpen(!dropdownOpen);
    }

    useEffect(() => {
        function handleClickOutsideDropdown(event)
        {
            if (dropdownRef.current && dropdownRef.current.contains(event.target)) {
                return;
            }

            if(profileButtonRef.current && !profileButtonRef.current.contains(event.target))
            {
                setdropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutsideDropdown);
        return () => 
            {
                document.removeEventListener('mousedown', handleClickOutsideDropdown);
            }
    }, []);
    
    return(
        <div className={clsx("flex flex-row bg-black rounded-b-3xl h-[9vh] text-white items-center justify-between pl-5 pr-2 shadow-lg m-4 mt-0 transition-all duration-300", className)}>
            <img src = {`${currPath === '/login' ? "/images/cit_normallogo.jpg " : "/images/cit_whitelogo.webp"}`} className = "h-full rounded-md"></img>
            <a href = '/' className = "absolute left-1/2 -translate-x-1/2 text-xl cursor-pointer">CITadel</a>
            {currPath === '/' && (<div className="flex items-center space-x-4">
                <a href="#footer" className=" cursor-pointer text-inherit text-sm mr-2">About Us</a>
                <button className="relative h-8 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-1 focus:ring-offset-slate-50 ">
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] " />
                    <span className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl hover:bg-white hover:text-black active:scale-90 transition duration-500`}>
                        <Link href="/login">Click to login!</Link>
                    </span>
                </button>
            </div>)}
            {currPath === '/dash' && (
                <>
                    <button ref = { profileButtonRef } className="h-10 w-10 rounded-3xl overflow-hidden">
                        <img src = "/images/sung.jpg " className = {`object-cover w-full h-full`}  onClick = { handleDropDownClick}/>
                    </button>

                    <div ref = { dropdownRef } className = {` ${dropdownOpen ? "block" : "hidden"} bg-black text-white absolute right-0 top-[10vh] w-[10vw] p-2 rounded-xl shadow-xl flex flex-col space-y-1`}>
                        <Link href = ""><button className= "border-red-100 cursor-pointer flex items-center justify-center w-full hover:bg-white hover:text-black transition duration-300 p-2 rounded-full active:scale-95">View Profile</button></Link>
                        <Link href = "/"><button className= "border-red-100 cursor-pointer flex items-center justify-center w-full hover:bg-red-500 transition duration-300 p-2 rounded-full active:scale-95">Log Out</button></Link>
                    </div>
                </>
            )}

            
        </div>

    )
}