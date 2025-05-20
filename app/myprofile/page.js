'use client'
import Header from "../components/Header"
import Sidebar from "../components/sideBar"
import { useEffect, useState } from "react";

export default function Profile() {

    const user = JSON.parse(localStorage.getItem("user"));
    const [profileDetails, setProfileDetails] = useState({});

    useEffect(() => {

        const fetchProfileDetails = async () => {
            const id = user.faculty_id;
            try{
                const response = await fetch('api/getProfileDetails', {
                    method:"POST",
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({id})
                });

                const data = await response.json();
                setProfileDetails(data);
            }
            catch(error)
            {
                console.error("Error fetching profile details:", error);
            }
        }


        fetchProfileDetails();
    }, []);
    
    useEffect(() => {
    if (Object.keys(profileDetails).length > 0) {
        console.log("📥 Profile details received:", profileDetails);
    }
    }, [profileDetails]);


    if (!user) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-2xl font-bold">Please log in to view your profile.</h1>
            </div>
        );
    }
    return (
        <>
            <Header />
            <div className="h-full w-full flex flex-row">
                <Sidebar />
                <div className="bg-white flex-1 text-black p-8">
                    {/* Profile Overview */}
                    <div className="flex flex-row items-center gap-8 mb-10">
                        <div className="w-[15%] h-[15%] aspect-square">
                            <img src = "/images/sung.jpg" className="hidden md:block h-full w-full rounded-full object-cover left-10 mr-10"/>
                        </div>
                        <div className="flex flex-col transition-all duration-300">
                            <h1 className="bg-clip-text text-[50%] lg:text-[500%] overflow-hidden text-transparent bg-gradient-to-r from-purple-500  via-yellow-300 to-pink-500">Hello, {user.faculty_name}.</h1>  
                            <div className="flex flex-row gap-10">
                                <h1 className="text-[50%] lg:text-[150%] text-black">{user.department}.</h1>
                                <span className="text-[50%] lg:text-[150%] text-black">|</span>
                                <h1 className="text-[50%] lg:text-[150%] text-black">{user.faculty_position}.</h1>
                            </div>
                        </div>
                    </div>

                    {/* Personal Details */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-2">Personal Details</h2>
                        <hr className="mb-4" />
                        <ul className="space-y-2 text-base">
                            <li><span className="font-semibold">PAN Number:</span> {profileDetails.pan_number}</li>
                            <li><span className="font-semibold">Aadhar Number:</span> {profileDetails.aadhar_number}</li>
                        </ul>
                    </section>

                    {/* Professional Details */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-2">Professional Details</h2>
                        <hr className="mb-4" />
                        <ul className="space-y-2 text-base">
                            <li><span className="font-semibold">Qualification:</span> {profileDetails.qualification}</li>
                            <li><span className="font-semibold">Specialization:</span> {profileDetails.specialization}</li>
                            <li><span className="font-semibold">Expertise in Subjects:</span> {profileDetails.expertise_in_subjects}</li>
                        </ul>
                    </section>

                    {/* Contact Information */}
                    <section>
                        <h2 className="text-2xl font-bold mb-2">Contact Information</h2>
                        <hr className="mb-4" />
                        <ul className="space-y-2 text-base">
                            <li><span className="font-semibold">Email:</span> {profileDetails.email}</li>
                            <li><span className="font-semibold">Phone:</span> +91-{profileDetails.phone}</li>
                        </ul>
                    </section>
                </div>
            </div>
        </>
    );
}