"use client"
import AOS from "aos";
import "aos/dist/aos.css";
import { useState, useEffect, useRef } from "react";
export default function FacultyDashboard()
{
    const [users, setUsers] = useState([]);
    const [zoomDiv1, setZoomDiv1] = useState(false);
    const [zoomDiv2, setZoomDiv2] = useState(false);
    const [zoomDiv3, setZoomDiv3] = useState(false);
    const [zoomDiv4, setZoomDiv4] = useState(false);

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

    const handleZoomDiv1 = () =>
    {
        setZoomDiv1(!zoomDiv1);
    }
    const handleZoomDiv2 = () =>
    {
        setZoomDiv2(!zoomDiv2);
    }
    const handleZoomDiv3 = () =>
    {
        setZoomDiv3(!zoomDiv3);
    }
    const handleZoomDiv4 = () =>
    {
        setZoomDiv4(!zoomDiv4);
    }
    const handleExpandedView = () => 
    {
        setZoomDiv1(false);
        setZoomDiv2(false);
        setZoomDiv3(false);
        setZoomDiv4(false);
    }
    return(
        <div className="flex flex-col items-center justify-center gap-10">
            <div className="md:flex md:flex-row items-center justify-start w-full p-6 mt-14">
                <img src = "/images/sung.jpg" className="hidden md:block h-[250px] w-[250px] rounded-full object-cover left-10 mr-10"/>
                
                <div className="flex flex-col transition-all duration-300">
                    <h1 className="bg-clip-text text-[60px] lg:text-[80px] overflow-hidden text-transparent bg-gradient-to-r from-purple-500  via-yellow-300 to-pink-500">Hello, A. Suresh blah blah blah.</h1>  
                    <div className="flex flex-row gap-10">
                        <h1 className="text-[30px] lg:text-[50px] text-black">Mechanical.</h1>
                        <span className="text-[30px] lg:text-[50px] text-black">|</span>
                        <h1 className="text-[30px] lg:text-[50px] text-black">Assistant Professor.</h1>
                    </div>
                </div>
            </div>
            <div className = "relative flex items-center justify-center bg-red-400">
                <div className="grid grid-cols-2 gap-6 w-[90vw] rounded-2xl min-h-screen mb-4" data-aos = "fade-up">
                    <div className="m-3 h-full w-full rounded-xl p-4 shadow-xl bg-black text-white hover:scale-[105%] ease-in-out transition duration-300 cursor-pointer" onClick = { handleZoomDiv1 }>
                    1️⃣ Research & Academic Contributions
    ✅ Publications Overview (Bar Chart) – Display yearly publications count with filters for journals, conferences, patents, books.
    ✅ Citation Metrics (Line Chart) - Show citations over time for an individual's research work.
    ✅ H-Index & i10-Index – Display key research performance indicators.
                    </div>
                    <div className="m-3 h-full w-full rounded-xl p-4 shadow-xl bg-black text-white hover:scale-[105%] ease-in-out transition duration-300 cursor-pointer" onClick = { handleZoomDiv2 }>
                    2️⃣ Teaching & Course Management
    ✅ Courses Taught (Pie Chart) – Visual breakdown of subjects taught over the years.
    ✅ Student Performance Analytics – Show grade distribution of students in a bar chart.
    ✅ Course Feedback Summary – Aggregate student feedback ratings into a heatmap or radar chart.
    ✅ Attendance Records – Line graph for class-wise attendance trends over semesters.
                    </div>
                    <div className="m-3 h-full w-full rounded-xl p-4 shadow-xl bg-black text-white hover:scale-[105%] ease-in-out transition duration-300 cursor-pointer" onClick = { handleZoomDiv3 }>
                    4️⃣ Administrative & Institutional Data
    ✅ Committee & Department Roles – List of roles held over time (e.g., HOD, Examination Coordinator, AI Lab Head).
    ✅ Event Participation (Timeline Chart) – Conferences, workshops, invited talks attended.
    ✅ Collaboration Network (Graph Visualization) – Show co-authors, research partners, and institutions worked with.
                    </div>
                    <div className="m-3 h-full w-full rounded-xl p-4 shadow-xl bg-black text-white hover:scale-[105%] ease-in-out transition duration-300 cursor-pointer" onClick = { handleZoomDiv4 }>
                    5️⃣ Student Engagement & Mentorship
    ✅ PhD/Masters Students Supervised – Display students mentored along with their research topics.
    ✅ Internship & Placement Tracker – Show students placed under faculty mentorship.
    ✅ Alumni Tracking – Visualize where past students are now working/researching.
                    </div>
                    
                </div> 
                {zoomDiv1 && (
                    <div className = "fixed inset-0 bg-black bg-opacity-60 z-10 flex items-center justify-center transition-all duration-1000">
                        <div className = "relative bg-white text-black rounded-2xl h-[90vh] w-[90vw] shadow-2xl transition duration-300">
                            <button className="absolute right-2 top-2 text-white hover:scale-110 active:scale-90 transition duration-300" onClick = {handleExpandedView}>❌</button>
                            zoomDiv1
                        </div>
                        
                    </div>
                )} 
                {zoomDiv2 && (
                    <div className = "fixed inset-0 bg-black bg-opacity-60 z-10 flex items-center justify-center transition-all duration-1000">
                        <div className = "relative bg-white text-black rounded-2xl h-[90vh] w-[90vw] shadow-2xl transition duration-300">
                            <button className="absolute right-2 top-2 text-white hover:scale-110 active:scale-90 transition duration-300" onClick = {handleExpandedView}>❌</button>
                            zoomDiv2
                        </div>
                        
                    </div>
                )} 
                {zoomDiv3 && (
                    <div className = "fixed inset-0 bg-black bg-opacity-60 z-10 flex items-center justify-center transition-all duration-1000">
                        <div className = "relative bg-white text-black rounded-2xl h-[90vh] w-[90vw] shadow-2xl transition duration-300">
                            <button className="absolute right-2 top-2 text-white hover:scale-110 active:scale-90 transition duration-300" onClick = {handleExpandedView}>❌</button>
                            zoomDiv3
                        </div>
                        
                    </div>
                )} 
                {zoomDiv4 && (
                    <div className = "fixed inset-0 bg-black bg-opacity-60 z-10 flex items-center justify-center transition-all duration-1000">
                        <div className = "relative bg-white text-black rounded-2xl h-[90vh] w-[90vw] shadow-2xl transition duration-300">
                            <button className="absolute right-2 top-2 text-white hover:scale-110 active:scale-90 transition duration-300" onClick = {handleExpandedView}>❌</button>
                            zoomDiv4
                        </div>
                        
                    </div>
                )}    
            </div>  
            
            
            <h1 className="flex justify-center text-4xl" data-aos = "fade-up">Current Semester</h1>       
            <div className="relative w-full p-4 flex flex-col items-start justify-normal" data-aos = "fade-up">
                <div className="bg-black h-[50vh] w-full text-white shadow-xl rounded-xl p-4">
                    HOLA THIS IS A TEST
                </div>
            </div> 
            <h1 className="flex justify-center text-4xl" data-aos = "fade-up">Projects</h1>       
            <div className="w-full p-4 mb-30">
                {users.length > 0 && users.map((user) => (
                    <div key = {user._id} className="bg-white text-black border-r-8 border-b-8 border-black border-2 w-full rounded-xl shadow-xl flex flex-row mb-10 p-4 gap-10 overflow-hidden transition-all duration-300" data-aos = "fade-up">
                        <div className="flex flex-col w-[70%] gap-3">
                            <h1 className = "text-[30px] text-inherit overflow-hidden sm:text-[40px] transition-all duration-300">{user.prj_name}</h1>
                            <p className = "hidden text-[25px] text-inherit md:block">{user.prj_desc}</p>
                            <p className = "hidden text[20px] text-inherit md:block" ><span className="font-bold">Funding Agency:</span> {user.funding_agency}</p>
                            <p className = "text[20px] text-inherit md:block"><span className="font-bold">Amount Sanctioned:</span> {user.amt_sanctioned}</p>
                        </div>
                        <div className="flex flex-col">
                            <h1 className = "text-[20px] text-inherit"><span className="font-bold">Duration: {user.duration} Months</span></h1>
                            <h1 className = "text-[20px] text-inherit sm:text-[30px]"><span className="font-bold">Status: {user.status === true ? <span className="text-green-400">Completed</span> : <span className="text-blue-500">In-Progress</span>}</span></h1>
                        </div>
                    </div>
                ))}
                {users.length == 0 && (
                    <div className="bg-red-400 rounded-xl shadow-2xl flex flex-row mb-4 p-4 justify-center" data-aos = "fade-up">
                        <h1 className="text-white text-[20px]">No Projects found.</h1>
                    </div>                
                )}
            </div> 
            <div className = "h-screen">

            </div>
        </div>
    )
}