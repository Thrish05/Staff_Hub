'use client'
import Header from "../components/Header"
import Sidebar from "../components/sideBar"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";

export default function Profile() {
    const [user, setUser] = useState(null);
    const router = useRouter();
    const [profileDetails, setProfileDetails] = useState({});

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            router.push("/404");
        } else {
            setUser(JSON.parse(storedUser));
        }
    }, [router]);

    useEffect(() => {
        if (!user) return;  // Wait for user to be set

        const fetchProfileDetails = async () => {
            try {
                const response = await fetch('/api/getProfileDetails', {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: user.faculty_id }),
                });
                const data = await response.json();
                setProfileDetails(data);
            } catch (error) {
                console.error("Error fetching profile details:", error);
            }
        };

        fetchProfileDetails();
    }, [user]);

    // Wait for user to be loaded before rendering
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header />
            <div className="h-full w-full flex flex-row">
                <Sidebar />
                <div className="bg-white flex-1 text-black p-8">

                    <div className="flex flex-row items-center gap-8 mb-10">
                        <div className="w-[15%] h-[15%] aspect-square">
                            <img
                                src={`/api/photo/${user.faculty_id}`}
                                alt={`${user.faculty_name}'s photo`}
                                className="border border-black h-full w-full rounded-full object-cover left-10 mr-10"
                            />
                        </div>
                        <div className="flex flex-col transition-all duration-300">
                            <h1 className="bg-clip-text text-[200%] lg:text-[500%] overflow-hidden text-transparent bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-500">
                                Hello, {user.faculty_name}.
                            </h1>
                            <div className="flex flex-row gap-10">
                                <h1 className="text-[50%] lg:text-[150%] text-black">{user.department}.</h1>
                                <span className="text-[50%] lg:text-[150%] text-black">|</span>
                                <h1 className="text-[50%] lg:text-[150%] text-black">{user.faculty_position}.</h1>
                            </div>
                        </div>
                    </div>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-2">Personal Details</h2>
                        <hr className="mb-4" />
                        <ul className="space-y-2 text-base">
                            <li><span className="font-semibold">PAN Number:</span> {profileDetails.pan_number}</li>
                            <li><span className="font-semibold">Aadhar Number:</span> {profileDetails.aadhar_number}</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-2">Professional Details</h2>
                        <hr className="mb-4" />
                        <ul className="space-y-2 text-base">
                            <li><span className="font-semibold">Qualification:</span> {profileDetails.qualification}</li>
                            <li><span className="font-semibold">Specialization:</span> {profileDetails.specialization}</li>
                            <li><span className="font-semibold">Expertise in Subjects:</span> {profileDetails.expertise_in_subjects}</li>
                        </ul>
                    </section>

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
