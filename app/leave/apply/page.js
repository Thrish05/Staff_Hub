"use client";
import Header from "../../components/Header";
import Sidebar from "../../components/sideBar";
import { useState } from "react";

export default function Dashboard() {

    const user = JSON.parse(localStorage.getItem("user"))
    const [leaveType, setLeaveType] = useState("");
    const [reason, setReason] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const today = new Date().toISOString().split("T")[0];

    const handleSubmit = async () => {
        if (!leaveType || !fromDate || !toDate || !reason) {
            alert("Please fill in all the fields.");
            return; // stop form submission
        }

        const res = await fetch("/api/leave", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: user.faculty_id,
                userName: user.faculty_name,
                department: user.department,
                leaveType: leaveType,
                approver: "Dr. Kavitha",
                fromDate,
                toDate,
                reason,
            }),
        });

        await res.json();
        if (res.ok) {
            alert("Leave applied successfully!");
        } else {
            alert("Something went wrong.");
        }
        setLeaveType("");
        setReason("");
        setFromDate("");
        setToDate("");
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
                                <label className="block mb-1 text-sm font-medium" >Leave Type</label>
                                <select className="w-full border rounded px-4 py-2 shadow-sm" onChange={(e) => {
                                    setLeaveType(e.target.value)
                                }} value={leaveType}>
                                    <option>Select Leave Type</option>
                                    <option value="OD">OD - On Duty</option>
                                    <option value="UOD">UOD - University On Duty</option>
                                    <option value="OOD">OOD - On Duty Official</option>
                                    <option value="CH">CH - Compensatory Holiday</option>
                                    <option value="CL">CL - Casual Leave</option>
                                    <option value="RH">RH - Restricted Holiday</option>
                                    <option value="VL">VL - Vacation Leave</option>
                                    <option value="LOP">LOP - Loss of Pay</option>
                                    <option value="P">P - Permission</option>
                                    <option value="SD">SD - Squad Duty</option>
                                    <option value="EP">EP - External Practical</option>
                                    <option value="EI">EL - External Invigilation (Theory)</option>
                                    <option value="ET">ET - External Theory Valuation</option>
                                    <option value="AUJ">AJ - AUJ Duty</option>
                                </select>

                            </div>

                            {/* Approver */}
                            <div>
                                <label className="block mb-1 text-sm font-medium">Approver</label>
                                <input
                                    type="text"
                                    value={user.faculty_position === "HOD" ? "Dr. A Ramesh" : "Dr. Kavitha"}
                                    readOnly
                                    className="w-full border rounded px-4 py-2 shadow-sm bg-gray-100"
                                />
                            </div>


                            {/* Date Range */}
                            <div>
                                <label className="block mb-1 text-sm font-medium">From</label>
                                <input
                                    type="date"
                                    className="w-full border rounded px-4 py-2 shadow-sm"
                                    value={fromDate}
                                    onChange={(e) => setFromDate(e.target.value)}
                                    min={today}
                                />
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium">To</label>
                                <input
                                    type="date"
                                    className="w-full border rounded px-4 py-2 shadow-sm"
                                    value={toDate}
                                    min={fromDate || ""}
                                    onChange={(e) => setToDate(e.target.value)}
                                />

                            </div>
                        </div>

                        {/* Reason */}
                        <div className="mt-6">
                            <label className="block mb-1 text-sm font-medium">Reason for Leave</label>
                            <textarea
                                rows="4"
                                className="w-full border rounded px-4 py-2 shadow-sm"
                                placeholder="Enter your reason here..." onChange={(e) => {
                                    setReason(e.target.value)
                                }} value={reason}
                            ></textarea>
                        </div>

                        {/* Buttons */}
                        <div className="mt-6 flex gap-4">
                            <button className="bg-gray-300 text-gray-700 px-6 py-2 rounded font-semibold hover:bg-red-500 hover:text-white transtion-all duration-100 hover:cursor-pointer" onClick={() => {
                                setLeaveType("");
                                setReason("");
                                setFromDate("");
                                setToDate("");
                            }}>Cancel</button>
                            <button className="bg-teal-400 text-white px-6 py-2 rounded font-semibold hover:bg-blue-600 transtion-all duration-100 hover:cursor-pointer" type="submit" onClick={handleSubmit}>Apply</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}