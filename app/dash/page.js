'use client';
import Header from "../components/Header";
import Sidebar from "../components/sideBar";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const userAvailable = localStorage.getItem("user");
    const userDetails = JSON.parse(localStorage.getItem("user") || "{}");
    const router = useRouter();
    useEffect(() => {
        if(!userAvailable)
        {
            router.push("/");
        }
    }, [])
    return (
        <>
            <Header/>
            <div className="flex ">
                <Sidebar />
                <div className="flex-1 p-8 overflow-y-auto">
                    <h1 className="text-[150%] lg:text-[200%] font-bold text-gray-800 mb-5 bg-clip-text text-transparent bg-gradient-to-r from-purple-500  via-yellow-300 to-pink-500">Welcome, {userDetails.faculty_name}.</h1>
                    <div className="h-1/4 w-full ">
                        <img src = "/images/collegebuilding.jpeg" className="h-full w-full object-cover rounded-md" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
                        <DashboardLink href="/" title="Your Schedule" />
                        <DashboardLink href="../leave" title="Leave Management" />
                        <DashboardLink href="/analytics" title="Activity Dashboard" />
                    </div>
                </div>
            </div>
        </>
    );
}

function DashboardLink({ href, title }) {
    return (
        <Link
            href={href}
            className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-500 transition duration-200 text-center text-lg font-medium text-gray-700"
        >
            {title}
        </Link>
    );
}