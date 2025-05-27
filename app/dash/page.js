'use client';
import Header from "../components/Header";
import Sidebar from "../components/sideBar";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const router = useRouter();
    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        const userAvailable = localStorage.getItem("user");

        if (!userAvailable) {
            router.push("/404");
        } else {
            setUserDetails(JSON.parse(userAvailable));
        }
    }, []);

    return (
        <>
            <Header />
            <div className="flex h-[calc(100vh-64px)]"> {/* Assuming Header is 64px */}
                <Sidebar />
                <div className="flex-1 p-8 overflow-y-auto">
                    <h1 className="text-[100%] md:text-[150%] lg:text-[200%] font-bold text-gray-800 mb-5 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-yellow-300 to-pink-500">
                        Welcome to the Hub, {userDetails.faculty_name}.
                    </h1>

                    <div className="h-2/4 w-full">
                        <img src="/images/collegebuilding.jpeg" className="h-full w-full object-cover rounded-md" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
                        <DashboardLink href="/schedule" title="Your Schedule" />
                        <DashboardLink href="../leave" title="Leave Management" />
                        <DashboardLink href="/analytics" title="Activity Dashboard" />
                        <DashboardLink href="/bot" title="Walter" />
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
