"use client";
import Header from "../../components/Header";
import Sidebar from "../../components/sideBar";
import { useState } from "react";

export default function Dashboard() {
    const [onlyTomorrow, setOnlyTomorrow] = useState(false);
    const [halfDay, setHalfDay] = useState(false);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const getTomorrowDate = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split("T")[0];
    };

    const handleOnlyTomorrowChange = () => {
        const checked = !onlyTomorrow;
        setOnlyTomorrow(checked);
        setHalfDay(false);

        if (checked) {
            const tomorrow = getTomorrowDate();
            setFromDate(tomorrow);
            setToDate(tomorrow);
        } else {
            setFromDate("");
            setToDate("");
        }
    };

    return (
        <>
            <Header />
            <div className="h-screen w-screen flex">
                <Sidebar />
                <div className="bg-white flex-1 text-black p-8 overflow-y-auto">
                    <h1 className="text-3xl font-bold mb-6">Leave Management</h1>

                    {/* Form */}
                    <div className="bg-gray-50 p-6 rounded-xl shadow-lg w-full max-w-4xl">
                        <h2 className="text-xl font-semibold mb-4">Apply Leave</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Leave Type */}
                            <div>
                                <label className="block mb-1 text-sm font-medium">Leave Type</label>
                                <select className="w-full border rounded px-4 py-2 shadow-sm">
                                    <option>Select Leave Type</option>
                                    <option>Casual Leave</option>
                                    <option>Sick Leave</option>
                                </select>
                            </div>

                            {/* Approver */}
                            <div>
                                <label className="block mb-1 text-sm font-medium">Approver</label>
                                <input
                                    type="text"
                                    value="Dr. Kavitha"
                                    readOnly
                                    className="w-full border rounded px-4 py-2 shadow-sm bg-gray-100"
                                />
                            </div>

                            <div className="flex items-center gap-2 md:col-span-2">
                                <input
                                    type="checkbox"
                                    id="tomorrow"
                                    checked={onlyTomorrow}
                                    onChange={handleOnlyTomorrowChange}
                                    className="accent-blue-900"
                                />
                                <label htmlFor="tomorrow" className="text-sm font-medium">Only For Tomorrow</label>
                            </div>


                            {/* Date Range */}
                            <div>
                                <label className="block mb-1 text-sm font-medium">From</label>
                                <input
                                    type="date"
                                    className="w-full border rounded px-4 py-2 shadow-sm"
                                    value={fromDate}
                                    onChange={(e) => setFromDate(e.target.value)}
                                    disabled={onlyTomorrow || halfDay}
                                />
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium">To</label>
                                <input
                                    type="date"
                                    className="w-full border rounded px-4 py-2 shadow-sm"
                                    value={toDate}
                                    onChange={(e) => setToDate(e.target.value)}
                                    disabled={onlyTomorrow || halfDay}
                                />
                            </div>
                        </div>

                        {/* Reason */}
                        <div className="mt-6">
                            <label className="block mb-1 text-sm font-medium">Reason for Leave</label>
                            <textarea
                                rows="4"
                                className="w-full border rounded px-4 py-2 shadow-sm"
                                placeholder="Enter your reason here..."
                            ></textarea>
                        </div>

                        {/* Buttons */}
                        <div className="mt-6 flex gap-4">
                            <button className="bg-gray-300 text-gray-700 px-6 py-2 rounded font-semibold hover:bg-red-500 hover:text-white transtion-all duration-100 hover:cursor-pointer">Cancel</button>
                            <button className="bg-teal-400 text-white px-6 py-2 rounded font-semibold hover:bg-blue-600 transtion-all duration-100 hover:cursor-pointer" type="submit">Apply</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}