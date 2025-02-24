"use client"
import AOS from "aos";
import "aos/dist/aos.css";
import { useState, useEffect } from "react";
export default function FacultyDashboard()
{
    const [users, setUsers] = useState([]);

    useEffect(() => {
        AOS.init();

        const fetchUsers = async () => {
            try {
              const response = await fetch("/api/users");
              const data = await response.json();
              setUsers(data);
            } catch (error) {
              console.error("Error fetching users:", error);
            }
          };
      
        fetchUsers();
    }, []);
    return(
        <div className="flex flex-col items-center justify-center gap-10">
            <div className="flex flex-row items-center justify-start w-full p-6">
                <img src = "/images/sung.jpg" className="h-[250px] w-[250px] rounded-full object-cover overflow-hidden left-10 mr-10"/>
                
                <div className="flex flex-col">
                    <h1 className="bg-clip-text text-[80px] overflow-hidden text-transparent bg-gradient-to-r from-purple-500  via-yellow-300 to-pink-500">Hello, A. Suresh.</h1>  
                    <div className="flex flex-row gap-10">
                        <h1 className="text-[50px] text-black">Mechanical.</h1>
                        <span className="text-[50px] text-black">|</span>
                        <h1 className="text-[50px] text-black">Assistant Professor.</h1>
                    </div>
                </div>
            </div>  
            <div className="grid grid-cols-2 gap-6 w-[90vw] rounded-2xl min-h-screen mb-4" data-aos = "fade-up">
                <div className="m-3 h-full w-full rounded-xl p-4 shadow-xl bg-black text-white hover:scale-[105%] ease-in-out transition duration-300 cursor-pointer">
                    hi
                </div>
                <div className="m-3 h-full w-full rounded-xl p-4 shadow-xl bg-black text-white hover:scale-[105%] ease-in-out transition duration-300 cursor-pointer">
                    hi
                </div>
                <div className="m-3 h-full w-full rounded-xl p-4 shadow-xl bg-black text-white hover:scale-[105%] ease-in-out transition duration-300 cursor-pointer">
                    hi
                </div>
                <div className="m-3 h-full w-full rounded-xl p-4 shadow-xl bg-black text-white hover:scale-[105%] ease-in-out transition duration-300 cursor-pointer">
                    hi
                </div>
            </div>  
            <h1 className="flex justify-center text-4xl" data-aos = "fade-up">Current Semester</h1>       
            <div className="relative w-full p-3 flex flex-col items-start justify-normal" data-aos = "fade-up">
                <div className="bg-black h-[50vh] w-full text-white shadow-xl rounded-xl p-4">
                    HOLA THIS IS A TEST
                </div>
            </div> 
            <h1 className="flex justify-center text-4xl" data-aos = "fade-up">Projects</h1>       
            <div className="relative w-full p-3 min-h-screen flex flex-col mb-4">
                {users.map((user) => (
                    <div key = {user._id} className="bg-black w-full rounded-xl shadow-2xl flex flex-row mb-4 p-4 gap-10" data-aos = "fade-up">
                        <div className="flex flex-col w-[70%] gap-3">
                            <h1 className = "text-[40px] text-white overflow-hidden">{user.prj_name}</h1>
                            <p className = "text-[25px] text-white">{user.prj_desc}</p>
                            <p className = "text[20px] text-white"><span className="font-bold">Funding Agency:</span> {user.funding_agency}</p>
                            <p className = "text[20px] text-white"><span className="font-bold">Amount Sanctioned:</span> {user.amt_sanctioned}</p>
                        </div>
                        <div className="flex flex-col">
                            <h1 className = "text-[20px] text-white"><span className="font-bold">Duration: {user.duration} Months</span></h1>
                            <h1 className = "text-[30px] text-white"><span className="font-bold">Status: {user.status === true ? <span className="text-green-400">Completed</span> : <span className="text-blue-500">In-Progress</span>}</span></h1>
                        </div>
                    </div>
                ))}
            </div> 
        </div>
    )
}