"use client";
import Header from "../../components/Header";
import Sidebar from "../../components/sideBar";
import { useState, useEffect } from "react";

// Mock data for demonstration
const mockApplications = [
    // { id: 1, type: "Casual Leave", from: "2025-05-20", to: "2025-05-22", reason: "Family function", status: "Pending" },
    // { id: 2, type: "Sick Leave", from: "2025-05-10", to: "2025-05-10", reason: "Fever", status: "Sanctioned" },
    // { id: 3, type: "Casual Leave", from: "2025-05-01", to: "2025-05-01", reason: "Personal work", status: "Rejected" }
];

export default function LeaveStatus() {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        // Replace this with actual data fetch
        setApplications(mockApplications);
    }, []);

    const filterByStatus = (status) =>
        applications.filter((app) => app.status === status);

    const renderRows = (apps) => {
        if (apps.length === 0) {
            return (
                <div className="border border-gray-200 rounded p-4 text-gray-500">
                    No applications.
                </div>
            );
        }

        return (
            <div>
                {/* Header Row */}
                <div className="hidden md:flex font-semibold border-b border-gray-400 pb-2 mb-2">
                    <div className="w-1/5">Type</div>
                    <div className="w-1/5">From</div>
                    <div className="w-1/5">To</div>
                    <div className="w-2/5">Reason</div>
                </div>

                {/* Data Rows */}
                {apps.map((app) => (
                    <div
                        key={app.id}
                        className="flex flex-col md:flex-row border-b border-gray-200 py-2"
                    >
                        <div className="w-full md:w-1/5 font-medium">{app.type}</div>
                        <div className="w-full md:w-1/5">{app.from}</div>
                        <div className="w-full md:w-1/5">{app.to}</div>
                        <div className="w-full md:w-2/5 text-gray-700">{app.reason}</div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <>
            <Header />
            <div className="h-screen w-screen flex">
                <Sidebar />
                <div className="bg-white flex-1 text-black p-8 overflow-y-auto">
                    <h1 className="text-3xl font-bold mb-6">Leave Application Status</h1>

                    <div className="space-y-10">
                        {/* Pending */}
                        <section>
                            <h2 className="text-xl font-semibold mb-4 underline">Pending</h2>
                            {renderRows(filterByStatus("Pending"))}
                        </section>

                        {/* Sanctioned */}
                        <section>
                            <h2 className="text-xl font-semibold mb-4 underline">Sanctioned</h2>
                            {renderRows(filterByStatus("Sanctioned"))}
                        </section>

                        {/* Rejected */}
                        <section>
                            <h2 className="text-xl font-semibold mb-4 underline">Rejected</h2>
                            {renderRows(filterByStatus("Rejected"))}
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}