"use client"
import AOS from "aos";
import "aos/dist/aos.css";
import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

export default function FacultyDashboard() {
    const [researchData, setResearchData] = useState([]);
    const [fdpData, setFdpData] = useState([]);
    const [patentData, setPatentData] = useState([]);
    const [projectData, setProjectData] = useState([]);
    const [projectDetails, setProjectDetails] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedProjectDetails, setSelectedProjectDetails] = useState(null);

    useEffect(() => {
        AOS.init();

        const fetchResearchDetails = async () => {
            try {
                const response = await fetch("/api/research");
                const data = await response.json();
                const filteredData = data.filter(item => item.publications_count > 0);
                setResearchData(filteredData);
            } catch (error) {
                console.error("Error fetching research details:", error);
            }
        };

        const fetchFdpData = async () => {
            try {
                const response = await fetch("/api/fdp");
                const data = await response.json();
                const cleanFdpData = data.filter(item => item.fdp_count > 0);
                setFdpData(cleanFdpData);
            } catch (error) {
                console.error("Error fetching FDP data:", error);
            }
        };

        const fetchPatentData = async () => {
            try {
                const response = await fetch("/api/patent");
                const data = await response.json();
                const cleanPatentData = data.filter(item => item.patents_count > 0);
                setPatentData(cleanPatentData);
            } catch (error) {
                console.error("Error fetching patent data:", error);
            }
        };

        const fetchProjectData = async () => {
            try {
                const response = await fetch("/api/project");
                const data = await response.json();
                setProjectData(data);
            } catch (error) {
                console.error("Error fetching project data:", error);
            }
        };

        const fetchProjectDetails = async () => {
            try {
                const response = await fetch("/api/projectDetails");
                const data = await response.json();
                setProjectDetails(data);
            } catch (error) {
                console.error("Error fetching project details:", error);
            }
        };

        fetchPatentData();
        fetchResearchDetails();
        fetchFdpData();
        fetchProjectData();
        fetchProjectDetails();
    }, []);

    const handleProjectClick = (facultyName) => {
        const facultyDetails = projectDetails.filter(item => item.faculty_name === facultyName);

        console.log("Faculty Details (All Projects):", facultyDetails);  // Debugging Log
        if (facultyDetails.length > 0) {
            setSelectedProjectDetails(facultyDetails);
            setShowDetails(true);
        } else {
            console.warn(`No projects found for faculty: ${facultyName}`);
        }
    };



    const closeDetails = () => setShowDetails(false);

    return (
        <div className="flex flex-col items-center justify-center gap-10">
            <div className="md:flex md:flex-row items-center justify-start p-6 ml-10">
                <img src="/images/sung.jpg" className="hidden md:block h-[250px] w-[250px] rounded-full object-cover left-10 mr-10" />

                <div className="flex flex-col transition-all duration-300">
                    <h1 className="bg-clip-text text-[60px] lg:text-[80px] overflow-hidden text-transparent bg-gradient-to-r from-purple-500 via-yellow-300 to-pink-500">Hello, Dr. R.M Bommi.</h1>
                    <div className="flex flex-row gap-10">
                        <h1 className="text-[30px] lg:text-[50px] text-black">VLSI.</h1>
                        <span className="text-[30px] lg:text-[50px] text-black">|</span>
                        <h1 className="text-[30px] lg:text-[50px] text-black">Assistant Professor.</h1>
                    </div>
                </div>
            </div>

            <div className="relative flex items-center justify-center">
                <div className="grid grid-cols-2 gap-6 w-[90vw] rounded-2xl" data-aos="fade-up">
                    <div className="m-3 h-[350px] w-full rounded-xl p-4 shadow-xl bg-black text-white hover:scale-[105%] transition-all duration-300 ease-in-out">
                        <h2 className="text-center text-2xl mb-4">Department Research Analysis</h2>
                        <ResponsiveContainer width="100%" height="80%">
                            <BarChart data={researchData}>
                                <XAxis dataKey="faculty_name" hide={true} />
                                <YAxis />
                                <Tooltip cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }} content={({ payload }) => (
                                    payload && payload.length ? (
                                        <div className="bg-white text-black p-2 rounded shadow-lg">
                                            {payload[0]?.payload?.faculty_name}: {payload[0]?.payload?.publications_count}
                                        </div>
                                    ) : null
                                )} />
                                <Legend />
                                <Bar dataKey="publications_count" fill="#8884d8">
                                    {researchData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.faculty_name === 'Dr R.M.Bommi' ? "#FF5733" : "#8884d8"} cursor="pointer" />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="m-3 h-[350px] w-full rounded-xl p-4 shadow-xl bg-black text-white hover:scale-[105%] transition-all duration-300 ease-in-out">
                        <h2 className="text-center text-2xl mb-4">Department FDP Analysis</h2>
                        <ResponsiveContainer width="100%" height="80%">
                            <BarChart data={fdpData}>
                                <XAxis dataKey="faculty_name" hide={true} />
                                <YAxis />
                                <Tooltip cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }} content={({ payload }) => (
                                    payload && payload.length ? (
                                        <div className="bg-white text-black p-2 rounded shadow-lg">
                                            {payload[0]?.payload?.faculty_name}: {payload[0]?.payload?.fdp_count}
                                        </div>
                                    ) : null
                                )} />
                                <Legend payload={[{ value: 'fdp_attended', type: 'rect', color: '#8884d8' }]} />
                                <Bar dataKey="fdp_count" fill="#8884d8">
                                    {fdpData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.faculty_name === 'Dr R.M.Bommi' ? "#FF5733" : "#8884d8"} cursor="pointer" />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="m-3 h-[350px] w-full rounded-xl p-4 shadow-xl bg-black text-white hover:scale-[105%] transition-all duration-300 ease-in-out">
                        <h2 className="text-center text-2xl mb-4">Department Patent Analysis</h2>
                        <ResponsiveContainer width="100%" height="80%">
                            <BarChart data={patentData}>
                                <XAxis dataKey="faculty_name" hide={true} />
                                <YAxis />
                                <Tooltip cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }} content={({ payload }) => (
                                    payload && payload.length ? (
                                        <div className="bg-white text-black p-2 rounded shadow-lg">
                                            {payload[0]?.payload?.faculty_name}: {payload[0]?.payload?.patents_count}
                                        </div>
                                    ) : null
                                )} />
                                <Legend />
                                <Bar dataKey="patents_count" fill="#8884d8">
                                    {patentData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.faculty_name === 'Dr R.M.Bommi' ? "#FF5733" : "#8884d8"} cursor="pointer" />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-6 w-[90vw] rounded-2xl">
                        <div className="m-3 h-[350px] w-full rounded-xl p-4 shadow-xl bg-black text-white hover:scale-[105%] transition-all duration-300 ease-in-out">
                            <h2 className="text-center text-2xl mb-4">Department Projects Analysis</h2>
                            <ResponsiveContainer width="100%" height="80%">
                                <BarChart data={projectData}>
                                    <XAxis dataKey="faculty_name" hide={true} />
                                    <YAxis domain={[0, 'dataMax']} interval={3} />
                                    <Tooltip cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }} content={({ payload }) => (
                                        payload && payload.length ? (
                                            <div className="bg-white text-black p-2 rounded shadow-lg">
                                                {payload[0]?.payload?.faculty_name}: {payload[0]?.payload?.project_count}
                                            </div>
                                        ) : null
                                    )} />
                                    <Legend />
                                    <Bar dataKey="project_count" fill="#8884d8">
                                        {projectData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={entry.faculty_name === 'Dr R.M.Bommi' ? "#FF5733" : "#8884d8"}
                                                cursor={entry.faculty_name === 'Dr R.M.Bommi' ? "pointer" : "default"}
                                                onClick={() => handleProjectClick(entry.faculty_name)}
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

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
