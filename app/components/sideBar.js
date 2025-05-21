'use client';
import Link from 'next/link';
import { Home, Calendar, ClipboardList, BarChart2 } from "lucide-react";

export default function SideBar() {
    return (
        <div className="bg-gray-900 w-[15vw] min-h-screen text-gray-100 px-2 py-6 shadow-md flex flex-col">
            <h2 className="hidden lg:block text-2xl font-semibold mb-8 text-center text-white tracking-wide font-inter">
                Navigations
            </h2>
            <ul className="space-y-4 transition-all duration-300">
                <li className='active:scale-95 hover:scale-105 transition-all duration-300'>
                    <Link href="/dash" className="flex justify-center items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-700 transition-all cursor-pointer text-lg">
                        <Home className="flex flex-shrink-0 h-5 w-5" />
                        <p className='hidden lg:block'>Dashboard</p>
                    </Link>
                </li>
                <li className='active:scale-95 hover:scale-105 transition-all duration-300'>
                    <Link href="/dash" className="flex justify-center items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-700 transition-all cursor-pointer text-lg">
                        <Calendar className="flex flex-shrink-0 h-5 w-5" />
                        <p className='hidden lg:block'>Schedule</p>
                    </Link>
                </li>
                <li className='active:scale-95 hover:scale-105 transition-all duration-300'>
                    <Link href="../leave" className="flex justify-center items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-700 transition-all cursor-pointer text-lg">
                        <ClipboardList className="flex flex-shrink-0 h-5 w-5" />
                        <p className='hidden lg:block'>Leaves</p>
                    </Link>
                </li>
                <li className='active:scale-95 hover:scale-105 transition-all duration-300'>
                    <Link href="/analytics" className="flex justify-center items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-700 transition-all cursor-pointer text-lg">
                        <BarChart2 className="flex flex-shrink-0 h-5 w-5" />
                        <p className='hidden lg:block'>My Analytics</p>
                    </Link>
                </li>
            </ul>
        </div>
    );
}