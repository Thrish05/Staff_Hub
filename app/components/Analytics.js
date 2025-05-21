"use client"
import AOS from "aos";
import "aos/dist/aos.css";
import { useState, useEffect, useRef } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

export default function Analytics() {
    const [researchGraph, setResearchGraph] = useState([]);
    const [researchData, setResearchData] = useState([]);
    const [heroDetails, setHeroDetails] = useState({});
    const [patentStatuses, setPatentStatuses] = useState([]);
    const [patentsAcrossYears, setPatentsAcrossYears] = useState([]);
    const [projectsAcrossYears, setProjectsAcrossYears] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedProjectDetails, setSelectedProjectDetails] = useState(null);
    const [activeRef, setActiveRef] = useState(null);

    const user = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        AOS.init();

        const fetchResearchDetails = async () => {
            try {
                const response = await fetch("/api/research", {
                    method: "POST",
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({id: user.faculty_id})
                });
                const data = await response.json();
                const {graph, details} = data;
                setResearchData(data);
            } catch (error) {
                console.error("Error fetching research details:", error);
            }
        };      

        const fetchProjectAcrossYears = async() => {
            try{
                const response = await fetch("/api/projectYears", {
                    method: "POST",
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({id: user.faculty_id})
                });
                const data = await response.json();
                setProjectsAcrossYears(data);
            }
            catch(error)
            {
                console.error("Error fetching project years details:", error);
            }
        };

        const fetchPatentStatuses = async () => {
            try {
                const response = await fetch("/api/patent", {
                    method: "POST",
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({id: user.faculty_id})
                });
                const data = await response.json();
                setPatentStatuses(data);
            } catch (error) {
                console.error("Error fetching patent data:", error);
            }
        };

        const fetchPatentsAcrossYears = async () => {
            try {
                const response = await fetch("/api/patentYears", {
                    method: "POST",
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({id: user.faculty_id})
                });
                const data = await response.json();
                setPatentsAcrossYears(data);
            } catch (error) {
                console.error("Error fetching patents across years:", error);
            }
        };

        const fetchHeroDetails = async() => {
            try
            {
                const response = await fetch("/api/heroDetails", {
                    method: "POST",
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({id: user.faculty_id})
                });
                const data = await response.json();
                setHeroDetails(data);
                console.log(heroDetails);
            }
            catch(error)
            {
                console.error("Error fetching the hero details: ", error);
            }
        }

        fetchPatentStatuses();
        fetchPatentsAcrossYears();
        fetchResearchDetails();
        fetchProjectAcrossYears();
        fetchHeroDetails();
    }, []);



    // const handleProjectClick = (facultyName) => {
    //     const facultyDetails = projectDetails.filter(item => item.faculty_name === facultyName);

    //     console.log("Faculty Details (All Projects):", facultyDetails);
    //     if (facultyDetails.length > 0) {
    //         setSelectedProjectDetails(facultyDetails);
    //         setShowDetails(true);
    //     } else {
    //         console.warn(`No projects found for faculty: ${facultyName}`);
    //     }
    // };



    // const closeDetails = () => setShowDetails(false);


    return (
        <div className="flex flex-col items-center justify-center w-full">
            
            <h1 className=" text-center p-3 text-4xl mt-5 mb-5 w-full">My Analytics</h1>
            <div className="flex flex-row gap-5 w-full justify-center items-center pl-5 pr-5 ">
                <div className="relative bg-black w-[25%] h-[12vh] rounded-md flex text-white p-2">
                    <h1 className=" bg-clip-text text-transparent text-3xl w-1/3 text-left mb-5 bg-gradient-to-r from-purple-500 via-yellow-300 to-pink-500"> {heroDetails.experience_years}</h1>
                    <h2 className=" text-xl absolute mt-5 bottom-1 left-2 ">Experience</h2>
                </div>
                <div className="relative bg-black w-[25%] h-[12vh] rounded-md flex  text-white p-2">
                    <h1 className="bg-clip-text text-transparent text-3xl w-1/3 text-left mb-5 bg-gradient-to-r from-purple-500 via-yellow-300 to-pink-500"> {heroDetails.research_papers_count}</h1>
                    <h2 className=" text-xl absolute mt-5 bottom-1 left-2 ">Research Papers</h2>
                </div >
                <div className="relative bg-black w-[25%] h-[12vh] rounded-md flex text-white p-2">
                    <h1 className="bg-clip-text text-transparent text-3xl w-1/3 text-left mb-5 bg-gradient-to-r from-purple-500 via-yellow-300 to-pink-500"> {heroDetails.fdp_attended_count}</h1>
                    <h2 className=" text-xl absolute mt-5 bottom-1 left-2 ">FDPs Attended</h2>
                </div>
                <div className="relative bg-black w-[25%] h-[12vh] rounded-md flex text-white p-2">
                    <h1 className="bg-clip-text text-transparent text-3xl w-1/3 text-left mb-5 bg-gradient-to-r from-purple-500 via-yellow-300 to-pink-500"> {heroDetails.patents_count}</h1>
                    <h2 className=" text-xl absolute mt-5 bottom-1 left-2 ">Patents</h2>
                </div>
            </div>
            <div className="flex items-center justify-center w-full p-5">
                
                <div className="grid grid-cols-2 gap-10 w-full rounded-2xl">
                    <div key = "details_1" className="relative h-[350px] w-full rounded-xl p-4 shadow-xl bg-black text-white transition-all duration-300 ease-in-out">
                        <button className="z-1 flex items-center justify-center absolute top-2 right-2 h-[6%] aspect-square bg-black rounded-full" onClick = {() => setActiveRef("details_1")}><img src = "/images/icons8-separating-48.png"/></button>
                        <h2 className="text-center text-2xl mb-4">Research Papers Across the Years</h2>
                        <ResponsiveContainer width="100%" height="90%">
                            <LineChart data={researchData} margin={{ top: 20, right: 30, left: 10, bottom: 40 }}>
                                <XAxis 
                                dataKey= "publication_year"
                                stroke="#ffffff"
                                tick={{ fill: "#ffffff", fontSize: 14 }}
                                label = {{value: "Year", position: "bottom", fill: "#ffffff"}}
                                />
                                <YAxis 
                                dataKey = "research_paper_count"
                                stroke="#ffffff"
                                tick={{ fill: "#ffffff", fontSize: 14 }}
                                allowDecimals={false}
                                label={{value: "Research Paper Count", angle: -90, position: "center", fill: "#ffffff"}}
                                />
                                <Tooltip 
                                cursor={{ strokeDasharray: "10 10" }}
                                content={({ payload }) =>
                                    payload && payload.length ? (
                                    <div className="bg-white text-black p-2 rounded shadow-lg">
                                        {payload[0]?.payload?.publication_year}: {payload[0]?.payload?.research_paper_count}
                                    </div>
                                    ) : null
                                }
                                />
                                {/* <Legend 
                                payload={[{ value: 'research_paper_count', type: 'line', color: '#d38cfb' }]} 
                                /> */}
                                <Line 
                                type = "linear"
                                dataKey="research_paper_count"
                                stroke="#d38cfb"
                                strokeWidth={3}
                                dot={{ fill: "#d38cfb", r: 6 }}
                                activeDot={{ r: 8 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>

                    </div>
                    {activeRef === "details_1" && (
                        <div className="h-full w-full fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg relative w-[90%] h-[90%]">
                            <button
                                onClick={() => setActiveRef(null)}
                                className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-2xl"
                            >
                                ✕
                            </button>
                            <h2 className="text-lg font-bold mb-4">Details1</h2>
                            <p>{}</p>
                            </div>
                        </div>   
                    
                    )}

                    <div key = "details_2" className="relative h-[350px] rounded-xl p-4 shadow-xl bg-black text-white  transition-all duration-300 ease-in-out">
                        <button className="z-1 flex items-center justify-center absolute top-2 right-2 h-[6%] aspect-square bg-black rounded-full" onClick = {() => setActiveRef("details_2")}><img src = "/images/icons8-separating-48.png"/></button>
                        <h2 className="text-center text-2xl mb-4">Projects Across the Years</h2>
                        <ResponsiveContainer width="100%" height="90%">
                            <LineChart data={projectsAcrossYears} margin = {{ top: 20, right: 30, left: 10, bottom: 40 }}>
                                <XAxis dataKey="year_of_award" 
                                stroke="#ffffff"
                                tick={{ fill: "#ffffff", fontSize: 14 }}
                                label = {{value: "Year", position: "bottom", fill: "#ffffff"}}
                                />
                                <YAxis allowDecimals = {false}
                                dataKey = "projects_count"
                                stroke="#ffffff"
                                tick={{ fill: "#ffffff", fontSize: 14 }}
                                label={{value: "Projects Count", angle: -90, position: "center", fill: "#ffffff"}}
                                />
                                
                                <Tooltip cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }} content={({ payload }) => (
                                    payload && payload.length ? (
                                        <div className="bg-white text-black p-2 rounded shadow-lg">
                                            {payload[0]?.payload?.year_of_award}: {payload[0]?.payload?.projects_count}
                                        </div>
                                    ) : null
                                )} />
                                {/* <Legend payload={[{ value: 'fdp_attended', type: 'rect', color: '#8884d8' }]} /> */}
                                <Line dataKey="projects_count" fill="#0000ff"
                                    type = "linear"
                                    stroke="#0000ff"
                                    strokeWidth={3}
                                    dot={{ fill: "#0000ff", r: 6 }}
                                    activeDot={{ r: 8 }}
                                />
                                
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {activeRef === "details_2" && (
                        <div className="h-full w-full fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg relative w-[90%] h-[90%]">
                            <button
                                onClick={() => setActiveRef(null)}
                                className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-2xl"
                            >
                                ✕
                            </button>
                            <h2 className="text-lg font-bold mb-4">Details2</h2>
                            <p>{}</p>
                            </div>
                        </div>   
                    
                    )}

                    <div key = "details_3" className="relative h-[350px] rounded-xl p-4 shadow-xl bg-black text-white transition-all duration-300 ease-in-out ">
                        <button className="z-1 flex items-center justify-center absolute top-2 right-2 h-[6%] aspect-square bg-black rounded-full" onClick = {() => setActiveRef("details_3")}><img src = "/images/icons8-separating-48.png"/></button>
                        <h2 className="text-center text-2xl mb-4">Patent Status</h2>
                        <ResponsiveContainer width="100%" height="90%">
                            <BarChart
                            data={patentStatuses}
                            margin={{ top: 20, right: 30, left: 30, bottom: 40 }}
                            >
                            <XAxis
                                dataKey="status"
                                stroke="#ffffff"
                                tick={{ fill: "#ffffff", fontSize: 14 }}
                                label={{
                                value: "Status",
                                position: "bottom",
                                fill: "#ffffff",
                                }}
                            />

                            <YAxis
                                allowDecimals={false}
                                stroke="#ccc"
                                tick={{ fill: "#ffffff", fontSize: 14 }}
                                label={{
                                value: "Count",
                                angle: -90,
                                position: "center",
                                fill: "#ffffff",
                                dx: -10
                                }}
                            />

                            <Tooltip
                                cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
                                content={({ payload }) =>
                                payload && payload.length ? (
                                    <div className="bg-white text-black p-2 rounded shadow">
                                    {payload[0]?.payload?.status}: {payload[0]?.payload?.status_count}
                                    </div>
                                ) : null
                                }
                            />

                            {/* <Legend
                                verticalAlign="bottom"
                                iconType="square"
                                wrapperStyle={{ color: "#ffffff" }} // use white if your bg is dark
                            /> */}

                            <Bar
                                dataKey="status_count"
                                fill="#665500"
                                stroke="#FFD700"
                                strokeWidth={2}
                            />
                            </BarChart>

                        </ResponsiveContainer>
                    </div>

                    {activeRef === "details_3" && (
                        <div className="h-full w-full fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg relative w-[90%] h-[90%]">
                            <button
                                onClick={() => setActiveRef(null)}
                                className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-2xl"
                            >
                                ✕
                            </button>
                            <h2 className="text-lg font-bold mb-4">Details3</h2>
                            <p>{}</p>
                            </div>
                        </div>   
                    
                    )}


                    
                    <div key = "details_4" className="relative h-[350px] w-50% rounded-xl p-4 shadow-xl bg-black text-white transition-all duration-300 ease-in-out">
                        <button className="z-1 flex items-center justify-center absolute top-2 right-2 h-[6%] aspect-square bg-black rounded-full" onClick = {() => setActiveRef("details_4")}><img src = "/images/icons8-separating-48.png"/></button>
                        <h2 className="text-center text-2xl mb-4">Patents Across the Years</h2>
                        <ResponsiveContainer width="100%" height="90%">
                            <LineChart
                                data={patentsAcrossYears}
                                
                                margin={{ top: 20, right: 30, left: 30, bottom: 40 }}
                            >
                                <XAxis
                                type="category"
                                dataKey="publication_year"
                                stroke="#ffffff"
                                allowDecimals={false}
                                tick={{ fill: "#ffffff", fontSize: 14 }}
                                label={{
                                    value: "Year",
                                    
                                    position: "center",
                                    fill: "#ffffff",
                                    dy: 20
                                }}
                                
                                />

                                <YAxis
                                type="number"
                                dataKey="patents_count"
                                stroke="#ffffff"
                                tick={{ fill: "#ffffff", fontSize: 14 }}
                                label={{
                                    value: "Patents Count",
                                    angle: -90,
                                    position: "center",
                                    fill: "#ffffff",
                                }}
                                allowDecimals={false}
                                />

                                <Tooltip
                                cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
                                content={({ payload }) =>
                                    payload && payload.length ? (
                                    <div className="bg-white text-black p-2 rounded shadow">
                                        {payload[0]?.payload?.publication_year}: {payload[0]?.payload?.patents_count}
                                    </div>
                                    ) : null
                                }
                                />

                                {/* <Legend
                                verticalAlign="bottom"
                                iconType="square"
                                wrapperStyle={{ color: "#ff00ff" }}
                                /> */}

                                <Line
                                dataKey="patents_count"
                                fill="#aa336a"
                                stroke="#ff00aa"
                                strokeWidth={2}
                                radius={[8, 8, 8, 8]} // Rounded right corners like in image
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {activeRef === "details_4" && (
                        <div className="h-full w-full fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg relative w-[90%] h-[90%]">
                            <button
                                onClick={() => setActiveRef(null)}
                                className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-2xl"
                            >
                                ✕
                            </button>
                            <h2 className="text-lg font-bold mb-4">Details4</h2>
                            <p>{}</p>
                            </div>
                        </div>   
                    
                    )}

                {showDetails && selectedProjectDetails && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex items-center justify-center">
                        <div className="bg-white p-8 rounded-lg shadow-2xl w-[80%] max-w-4xl h-[80%] overflow-y-auto">
                            <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6">Project Details</h2>

                            {selectedProjectDetails.map((project, index) => (
                                <div
                                    key={project.project_id}
                                    className={`border-l-4 pl-4 mb-6 pb-4 rounded-md ${index % 2 === 0 ? 'border-blue-500 bg-blue-50' : 'border-green-500 bg-green-50'}`}
                                >
                                    <p className="text-lg p-1"><strong>Title:</strong> {project.project_title}</p>
                                    <p className="text-gray-600 italic">{project.project_desc}</p>

                                    <div className="grid grid-cols-2 gap-4 mt-4">
                                        <p><strong>Principal Investigator:</strong> {project.principle_investigator}</p>
                                        <p><strong>Co-Principal Investigator(s):</strong> {project.co_principle_investigator || 'N/A'}</p>
                                        <p><strong>Year of Award:</strong> {project.year_of_award || 'N/A'}</p>
                                        <p>
                                            <strong>Funding Amount:</strong> ₹
                                            {project.amount ? Number(project.amount).toLocaleString() : 'N/A'}
                                        </p>
                                        <p><strong>Duration:</strong> {project.duration_in_months} months</p>
                                        <p><strong>Funding Agency:</strong> {project.funding_agent || 'N/A'}</p>
                                        <p><strong>Type:</strong> {project.type || 'N/A'}</p>
                                        <p><strong>Status:</strong> {project.status || 'N/A'}</p>
                                    </div>
                                </div>
                            ))}

                            <button
                                className="mt-6 w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition duration-200"
                                onClick={closeDetails}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}






            </div>

        </div>
    )
}


