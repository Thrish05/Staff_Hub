'use client';
import Link from 'next/link';
import { Home, Calendar, ClipboardList, BarChart2 } from "lucide-react";

export default function SideBar() {
    return (
        <div className="lg:block bg-gray-800 w-[15vw] text-gray-100 px-2 py-6 shadow-md flex flex-col">
            <h2 className="text-2xl font-semibold mb-8 text-center text-white tracking-wide font-inter">
                Navigations
            </h2>
            <ul className="space-y-4">
                <li className='active:scale-95 hover:scale-105 transition-all duration-300'>
                    <Link href="/dash" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-700 transition-all cursor-pointer text-lg">
                        <Home className="h-5 w-5" />
                        Dashboard
                    </Link>
                </li>
                <li className='active:scale-95 hover:scale-105 transition-all duration-300'>
                    <Link href="/dash" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-700 transition-all cursor-pointer text-lg">
                        <Calendar className="h-5 w-5" />
                        Schedule
                    </Link>
                </li>
                <li className='active:scale-95 hover:scale-105 transition-all duration-300'>
                    <Link href="../leave" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-700 transition-all cursor-pointer text-lg">
                        <ClipboardList className="h-5 w-5" />
                        Leave Management
                    </Link>
                </li>
                <li className='active:scale-95 hover:scale-105 transition-all duration-300'>
                    <Link href="/analytics" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-700 transition-all cursor-pointer text-lg">
                        <BarChart2 className="h-5 w-5" />
                        My Analytics
                    </Link>
                </li>
            </ul>
        </div>
    );
}