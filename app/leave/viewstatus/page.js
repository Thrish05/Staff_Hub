"use client";
import Header from "../../components/Header";
import Sidebar from "../../components/sideBar";
import { useState, useEffect } from "react";

const statuses = ["pending", "sanctioned", "rejected"];

export default function LeaveStatus() {
    const [applications, setApplications] = useState([]);
    const [activeStatus, setActiveStatus] = useState("pending");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplications = async () => {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user || !user.faculty_id || !user.department) return;

            setLoading(true);
            try {
                const res = await fetch(`/api/leave?faculty_id=${user.faculty_id}&department=${user.department}`);
                const data = await res.json();
                setApplications(data);
            } catch (err) {
                console.error("Failed to fetch applications:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    const filteredApps = applications.filter(
        (app) => app.status.toLowerCase() === activeStatus.toLowerCase()
    );

    const renderTable = () => {
        if (loading)
            return (
                <div className="flex justify-center items-center py-20 text-lg text-gray-500">
                    Loading applications...
                </div>
            );

        if (filteredApps.length === 0)
            return (
                <div className="flex justify-center items-center py-20 text-lg text-gray-500">
                    No {activeStatus} applications found.
                </div>
            );

        return (
            <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {["Type", "From", "To", "Reason", "Status"].map((header) => (
                                <th
                                    key={header}
                                    className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredApps.map((app, i) => (
                            <tr key={app.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                    {app.leave_type}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {new Date(app.from_date).toLocaleDateString("en-GB")}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {new Date(app.to_date).toLocaleDateString("en-GB")}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-w-xs truncate">
                                    {app.reason}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                                    {app.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <>
            <Header />
            <div className="h-screen w-screen flex bg-gray-50">
                <Sidebar />
                <main className="flex-1 p-8 overflow-y-auto">
                    <h1 className="text-4xl font-extrabold mb-8 text-gray-900">
                        Leave Application Status
                    </h1>

                    {/* Tabs */}
                    <div className="mb-6 flex space-x-4 border-b border-gray-300">
                        {statuses.map((status) => (
                            <button
                                key={status}
                                onClick={() => setActiveStatus(status)}
                                className={`px-4 py-2 font-semibold rounded-t-lg
                                    ${activeStatus === status
                                        ? "bg-white border-t border-x border-gray-300 text-gray-900"
                                        : "text-gray-600 hover:text-gray-900"
                                    }`}
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1)} (
                                {applications.filter((a) => a.status.toLowerCase() === status).length})
                            </button>
                        ))}
                    </div>

                    {renderTable()}
                </main>
            </div>
        </>
    );
}
