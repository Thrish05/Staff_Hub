"use client"
import AOS from "aos";
import "aos/dist/aos.css";
import { useState, useEffect, useRef} from "react";
export default function FacultyDashboard()
{
    const [users, setUsers] = useState([]);
    const [zoomDiv1, setZoomDiv1] = useState(false);
    const zoomDiv2 = useRef(null);
    const zoomDiv3 = useRef(null);
    const zoomDiv4 = useRef(null);

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
    const handleExpandedView = () => 
    {
        setZoomDiv1(false);
    }
    return(
        <div className="flex flex-col items-center justify-center gap-10">
            <div className="flex flex-row items-center justify-start w-full p-6">
                <img src = "/images/sung.jpg" className="h-[250px] w-[250px] rounded-full object-cover sm:overflow-hidden left-10 mr-10"/>
                
                <div className="flex flex-col">
                    <h1 className="bg-clip-text text-[80px] overflow-hidden text-transparent bg-gradient-to-r from-purple-500  via-yellow-300 to-pink-500">Hello, A. Suresh.</h1>  
                    <div className="flex flex-row gap-10">
                        <h1 className="text-[50px] text-black">Mechanical.</h1>
                        <span className="text-[50px] text-black">|</span>
                        <h1 className="text-[50px] text-black">Assistant Professor.</h1>
                    </div>
                </div>
            </div>
            <div className = "relative flex items-center justify-center bg-red-400">
                <div className="grid grid-cols-2 gap-6 w-[90vw] rounded-2xl min-h-screen mb-4" data-aos = "fade-up">
                    <div className="m-3 h-full w-full rounded-xl p-4 shadow-xl bg-black text-white hover:scale-[105%] ease-in-out transition duration-300 cursor-pointer" onClick = { handleZoomDiv1 }>
                    1️⃣ Research & Academic Contributions
    ✅ Publications Overview (Bar Chart) – Display yearly publications count with filters for journals, conferences, patents, books.
    ✅ Citation Metrics (Line Chart) – Show citations over time for an individual's research work.
    ✅ H-Index & i10-Index – Display key research performance indicators.
                    </div>
                    <div ref = { zoomDiv2 } className="m-3 h-full w-full rounded-xl p-4 shadow-xl bg-black text-white hover:scale-[105%] ease-in-out transition duration-300 cursor-pointer">
                    2️⃣ Teaching & Course Management
    ✅ Courses Taught (Pie Chart) – Visual breakdown of subjects taught over the years.
    ✅ Student Performance Analytics – Show grade distribution of students in a bar chart.
    ✅ Course Feedback Summary – Aggregate student feedback ratings into a heatmap or radar chart.
    ✅ Attendance Records – Line graph for class-wise attendance trends over semesters.
                    </div>
                    <div ref = { zoomDiv3 } className="m-3 h-full w-full rounded-xl p-4 shadow-xl bg-black text-white hover:scale-[105%] ease-in-out transition duration-300 cursor-pointer">
                    4️⃣ Administrative & Institutional Data
    ✅ Committee & Department Roles – List of roles held over time (e.g., HOD, Examination Coordinator, AI Lab Head).
    ✅ Event Participation (Timeline Chart) – Conferences, workshops, invited talks attended.
    ✅ Collaboration Network (Graph Visualization) – Show co-authors, research partners, and institutions worked with.
                    </div>
                    <div ref = { zoomDiv4 } className="m-3 h-full w-full rounded-xl p-4 shadow-xl bg-black text-white hover:scale-[105%] ease-in-out transition duration-300 cursor-pointer">
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
                            <input 
                                value = {e}
                                className = "h-[8vh] w-[20vw] p-2 bg-gray-500 rounded-xl text-black" 
                                placeholder="type here"></input>
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
            <div className="relative w-full p-4 flex flex-col bg-red-500 mb-30 min-h-fit">
                {users.length > 0 && users.map((user) => (
                    <div key = {user._id} className="bg-black w-full rounded-xl shadow-xl flex flex-row mb-10 p-4 gap-10 overflow-hidden h-[50vh]" data-aos = "fade-up">
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
                {users.length == 0 && (
                    <div className="bg-red-400 rounded-xl shadow-2xl flex flex-row mb-4 p-4 justify-center" data-aos = "fade-up">
                        <h1 className="text-white text-[20px]">No Projects found.</h1>
                    </div>                
                )}
            </div> 
        </div>
    )
}