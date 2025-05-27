"use client"
import AOS from "aos";
import "aos/dist/aos.css";
import { useState, useEffect } from "react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

export default function Analytics() {
    const [researchGraph, setResearchGraph] = useState([]);
    const [researchData, setResearchData] = useState([]);
    const [heroDetails, setHeroDetails] = useState({});
    const [patentData, setPatentData] = useState([]);
    const [patentStatuses, setPatentStatuses] = useState([]);
    const [patentsAcrossYears, setPatentsAcrossYears] = useState([]);
    const [projectGraph, setProjectGraph] = useState([]);
    const [projectData, setProjectData] = useState([]);
    const [fdpGraph, setFdpGraph] = useState([]);
    const [fdpData, setFdpData] = useState([]);
    const [activeRef, setActiveRef] = useState(null);

    const categoryColors = {
        "Cloud/DevOps": "#8884d8",
        "Data Science": "#82ca9d",
        "Edge Computing": "#ffc658",
        "IoT Security": "#ff8042",
        // fallback color
        default: "#cccccc"
    };

    const total = fdpGraph.reduce((sum, item) => sum + Number(item.count), 0);

    const pieData = fdpGraph.map(item => ({
        fdp_category: item.fdp_category,
        count: Number(item.count),
        percentage: ((Number(item.count) / total) * 100).toFixed(1) + '%',
    }));

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        AOS.init();

        const fetchAnalytics = async () => {
            try {
                const response = await fetch("/api/getAnalytics", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: user.faculty_id })
                });
                const { hero, patentDetails, patentStatus, patentsAcrossYears, researchGraph, researchDetails, projectGraph, projectDetails, fdpGraph, fdpDetails } = await response.json();
                setHeroDetails(hero);
                setPatentData(patentDetails);
                setPatentStatuses(patentStatus);
                setPatentsAcrossYears(patentsAcrossYears);
                setResearchGraph(researchGraph);
                setResearchData(researchDetails);
                setProjectGraph(projectGraph);
                setProjectData(projectDetails);
                setFdpGraph(fdpGraph)
                setFdpData(fdpDetails);
            }
            catch (error) {
                console.error("Error with analytic details (in frontend)", error);
            }

        }
        fetchAnalytics();
    }, []);

    useEffect(() => {
        // console.log("Research Graph Data:", researchGraph);
        // console.log("Research Data:", researchData);
        // console.log("Hero Details:", heroDetails);
        // console.log("Patent Statuses:", patentStatuses);
        // console.log("Patents Across Years:", patentsAcrossYears);
        // console.log("Patent Data:", patentData);
        // console.log("Project Graph Data:", projectGraph);
        // console.log("Project Data:", projectData);
        console.log("FDP: ", fdpData);
        // console.log("PIE_DATA: ", pieData)

    })

    return (
        <div className="flex-1 flex-col items-center justify-center">

            <h1 className=" text-center p-3 text-4xl mt-5 mb-5 w-full">My Analytics</h1>
            <div className="flex flex-row gap-5 w-full justify-center items-center pl-5 pr-5 text-sm lg:text-4xl">
                <div className="relative bg-black w-[25%] h-[12vh] rounded-md flex text-white p-2 ">
                    <h1 className="bg-clip-text text-transparent text-3xl w-1/3 text-left mb-5 bg-gradient-to-r from-purple-500 via-yellow-300 to-pink-500"> {heroDetails.experience_years}</h1>
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
                    <div key="details_1" className="relative h-[350px] w-full rounded-xl p-4 shadow-xl bg-black text-white transition-all duration-300 ease-in-out">
                        <button className="z-1 flex items-center justify-center absolute top-2 right-2 h-[6%] aspect-square bg-black rounded-full hover:scale-120" onClick={() => setActiveRef("details_1")}><img className="hover:scale-120" src="/images/icons8-separating-48.png" /></button>
                        <h2 className="text-center text-2xl mb-4">Research Papers Across the Years</h2>
                        <ResponsiveContainer width="100%" height="90%">
                            <LineChart data={researchGraph} margin={{ top: 20, right: 30, left: 10, bottom: 40 }}>
                                <XAxis
                                    dataKey="publication_year"
                                    stroke="#ffffff"
                                    tick={{ fill: "#ffffff", fontSize: 14 }}
                                    label={{ value: "Year", position: "bottom", fill: "#ffffff" }}
                                />
                                <YAxis
                                    dataKey="research_paper_count"
                                    stroke="#ffffff"
                                    tick={{ fill: "#ffffff", fontSize: 14 }}
                                    allowDecimals={false}
                                    label={{ value: "Research Paper Count", angle: -90, position: "center", fill: "#ffffff" }}
                                />
                                <Tooltip
                                    cursor={{ strokeDasharray: "10 10" }}
                                    content={({ payload }) =>
                                        payload && payload.length ? (
                                            <div className="bg-white text-black p-2 rounded shadow-lg">
                                                Year: {payload[0]?.payload?.publication_year}: Count: {payload[0]?.payload?.research_paper_count}
                                            </div>
                                        ) : null
                                    }
                                />
                                {/* <Legend 
                                payload={[{ value: 'research_paper_count', type: 'line', color: '#d38cfb' }]} 
                                /> */}
                                <Line
                                    type="linear"
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
                            <div className=" bg-white p-6 rounded-lg shadow-lg relative w-[90%] h-[90%] flex flex-col">
                                <button
                                    onClick={() => setActiveRef(null)}
                                    className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-2xl"
                                >
                                    ✕
                                </button>
                                <div className="w-full flex flex-row gap-10">
                                    <h2 className="text-[150%] font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-l from-purple-500 via-pink-500 to-yellow-500">My Research Papers</h2>
                                    <h2 className="text-[150%] font-bold mb-4">Count: {researchData.length}</h2>
                                </div>
                                <div className="flex flex-row gap-3 h-[90%] w-full">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 overflow-y-auto w-1/2 rounded-md">
                                        {researchData.map((paper) => (
                                            <div
                                                key={paper.scopus_research_id}
                                                className="bg-gradient-to-br from-[#f0f0f0] to-white border border-gray-300 scale-90 rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300"
                                            >
                                                <h3 className="text-lg font-semibold text-gray-800">{paper.title}</h3>
                                                <p className="text-sm text-gray-600 mt-1 italic">{paper.journal_name}</p>
                                                <p className="text-xs text-gray-500 mb-2">{new Date(paper.publication_date).toDateString()}</p>

                                                <div className="gap-2 mt-2 text-sm flex flex-col">
                                                    <div className="flex flex-row gap-x-10">
                                                        <div className="text-gray-700">
                                                            <span className="font-medium">Indexed:</span> {paper.indexed}
                                                        </div>
                                                        <div className="text-gray-700">
                                                            <span className="font-medium">Quartile:</span> {paper.quartile}
                                                        </div>
                                                    </div>
                                                    <div className="text-gray-700">
                                                        <span className="font-medium">Impact Factor:</span> {paper.impact_factor || "N/A"}
                                                    </div>
                                                    <div className="text-gray-700 col-span-2">
                                                        <span className="font-medium">ISSN/ISBN:</span> {paper.issn_isbn}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div key = "details_1" className="relative h-full w-1/2 rounded-xl p-4 shadow-xl bg-black text-white transition-all duration-300 ease-in-out">
                                    <h2 className="text-center text-2xl mb-4">Research Papers Across the Years</h2>
                                    <ResponsiveContainer width="100%" height="90%">
                                        <LineChart data={researchGraph} margin={{ top: 20, right: 30, left: 10, bottom: 40 }}>
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
                                                    Year: {payload[0]?.payload?.publication_year}: Count: {payload[0]?.payload?.research_paper_count}
                                                </div>
                                                ) : null
                                            }
                                            />
                                            {/* <Legend 
                                            payload={[{ value: 'research_paper_count', type: 'line', color: '#d38cfb' }]} 
                                            /> */}
                                                <Line
                                                    type="linear"
                                                    dataKey="research_paper_count"
                                                    stroke="#d38cfb"
                                                    strokeWidth={3}
                                                    dot={{ fill: "#d38cfb", r: 6 }}
                                                    activeDot={{ r: 8 }}
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>

                                    </div>

                                </div>

                            </div>
                        </div>

                    )}

                    <div key="details_2" className="relative h-[350px] rounded-xl p-4 shadow-xl bg-black text-white  transition-all duration-300 ease-in-out">
                        <button className="z-1 flex items-center justify-center absolute top-2 right-2 h-[6%] aspect-square bg-black rounded-full" onClick={() => setActiveRef("details_2")}><img src="/images/icons8-separating-48.png" /></button>
                        <h2 className="text-center text-2xl mb-4">Projects Across the Years</h2>
                        <ResponsiveContainer width="100%" height="90%">
                            <LineChart data={projectGraph} margin={{ top: 20, right: 30, left: 10, bottom: 40 }}>
                                <XAxis dataKey="year_of_award"
                                    stroke="#ffffff"
                                    tick={{ fill: "#ffffff", fontSize: 14 }}
                                    label={{ value: "Year", position: "bottom", fill: "#ffffff" }}
                                />
                                <YAxis allowDecimals={false}
                                    dataKey="projects_count"
                                    stroke="#ffffff"
                                    tick={{ fill: "#ffffff", fontSize: 14 }}
                                    label={{ value: "Projects Count", angle: -90, position: "center", fill: "#ffffff" }}
                                />

                                <Tooltip cursor={{ strokeDasharray: "10 10" }} content={({ payload }) => (
                                    payload && payload.length ? (
                                        <div className="bg-white text-black p-2 rounded shadow-lg">
                                            Year: {payload[0]?.payload?.year_of_award}: Count: {payload[0]?.payload?.projects_count}
                                        </div>
                                    ) : null
                                )} />
                                <Line dataKey="projects_count" fill="#0000ff"
                                    type="linear"
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
                            <div className=" bg-white p-6 rounded-lg shadow-lg relative w-[90%] h-[90%] flex flex-col">
                                <button
                                    onClick={() => setActiveRef(null)}
                                    className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-2xl"
                                >
                                    ✕
                                </button>
                                <div className="w-full flex flex-row gap-10">
                                    <h2 className="text-[150%] font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-l from-purple-500 via-pink-500 to-yellow-500">My Projects</h2>
                                    <h2 className="text-[150%] font-bold mb-4">Count: {projectData.length}</h2>
                                </div>
                                <div className="flex flex-row gap-3 h-[90%] w-full">

                                    <div className="grid grid-cols-1 lg:grid-cols-2 w-1/2 overflow-y-auto rounded-md gap-1">
                                        {projectData.map((project, idx) => (
                                            <div
                                                key={idx}
                                                className="bg-gradient-to-br from-[#f0f0f0] to-white border border-gray-300 scale-90 rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300"
                                            >
                                                <h3 className="text-xl font-semibold text-gray-800 mb-1">{project.project_title}</h3>
                                                <p className="text-sm text-gray-600 italic mb-3">
                                                    PI: {project.principal_investigator}
                                                    {project.co_principal_investigator && ` & Co-PI: ${project.co_principal_investigator}`}
                                                </p>

                                                <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                                                    <div><span className="font-medium text-gray-700">Year Awarded:</span> {project.year_of_award}</div>
                                                    <div><span className="font-medium text-gray-700">Amount:</span> ₹{project.amount_sanctioned?.toLocaleString()}</div>
                                                    <div><span className="font-medium text-gray-700">Duration:</span> {project.duration_of_project}</div>
                                                    <div><span className="font-medium text-gray-700">Status:</span> <span className={` ${project.status === "Completed" ? "text-green-400" : "text-blue-400"}`}>{project.status}</span></div>
                                                    <div className="col-span-2">
                                                        <span className="font-medium text-gray-700">Funding Agency:</span> {project.funding_agency}
                                                    </div>
                                                </div>

                                                {project.project_description && (
                                                    <details className="mt-2 text-sm text-gray-600">
                                                        <summary className="cursor-pointer text-blue-500 hover:text-blue-800">View Description</summary>
                                                        <p className="mt-1">{project.project_description}</p>
                                                    </details>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <div key = "details_2" className=" relative h-full rounded-xl p-4 shadow-xl bg-black text-white  transition-all duration-300 ease-in-out w-1/2">
                                    <h2 className="text-center text-2xl mb-4">Projects Across the Years</h2>
                                    <ResponsiveContainer width="100%" height="90%">
                                        <LineChart data={projectGraph} margin = {{ top: 20, right: 30, left: 10, bottom: 40 }}>
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
                                            
                                            <Tooltip cursor={{ strokeDasharray: "10 10" }} content={({ payload }) => (
                                                payload && payload.length ? (
                                                    <div className="bg-white text-black p-2 rounded shadow-lg">
                                                        Year: {payload[0]?.payload?.year_of_award}: Count: {payload[0]?.payload?.projects_count}
                                                    </div>
                                                ) : null
                                            )} />
                                            
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
                            </div>
                                
                            </div>
                        </div>

                    )}

                    <div key="details_3" className="relative h-[350px] min-h-[350px] rounded-xl p-4 px-2 shadow-xl bg-black text-white transition-all duration-300 ease-in-out overflow-hidden">

                        <button
                            className="z-1 flex items-center justify-center absolute top-2 right-2 h-[6%] aspect-square bg-black rounded-full hover:scale-120"
                            onClick={() => setActiveRef("details_3")}
                        >
                            <img className="hover:scale-120" src="/images/icons8-separating-48.png" />
                        </button>

                        <h2 className="text-center text-2xl mb-4">FDP Distribution</h2>
                        <ResponsiveContainer width="100%" height="90%" className="overflow-hidden text-wrap">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    dataKey="count"
                                    nameKey="fdp_category"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={90}
                                    label={({ name }) => name.length > 12 ? name.slice(0, 12) + "..." : name}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={categoryColors[entry.fdp_category] || categoryColors.default} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    content={({ payload }) => {
                                        if (!payload || !payload.length) return null;

                                        const total = pieData.reduce((sum, item) => sum + item.count, 0);
                                        const value = payload[0].value;
                                        const name = payload[0].name;

                                        return (
                                            <div className="bg-white text-black p-2 rounded shadow">
                                                <strong>{name}</strong><br />
                                                Count: {value}<br />
                                                Percentage: {((value / total) * 100).toFixed(1)}%
                                            </div>
                                        );
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {activeRef === "details_3" && (
                        <div className="h-full w-full fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                            <div className=" bg-white p-6 rounded-lg shadow-lg relative w-[90%] h-[90%] flex flex-col">
                                <button
                                    onClick={() => setActiveRef(null)}
                                    className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-2xl"
                                >
                                    ✕
                                </button>
                                <div className="w-full flex flex-row gap-10">
                                    <h2 className="text-[150%] font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-l from-purple-500 via-pink-500 to-yellow-500">My FDPs</h2>
                                    <h2 className="text-[150%] font-bold mb-4">Count: {fdpData.length}</h2>
                                </div>
                                <div className="flex flex-row gap-3 h-[90%] w-full">

                                    <div className="grid grid-cols-1 lg:grid-cols-2 w-1/2 overflow-y-auto rounded-md gap-1">
                                        {fdpData.map((fdp, idx) => (
                                            <div
                                                key={idx}
                                                className="bg-gradient-to-br from-[#f0f0f0] to-white border border-gray-300 scale-90 rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300"
                                                style={{ borderColor: categoryColors[fdp.fdp_category] || categoryColors.default }}
                                            >
                                                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                                                    {fdp.fdp_name}
                                                </h3>
                                                <p className="text-sm text-gray-600 italic mb-3">
                                                    <strong>Category: </strong><span className="font-medium" style={{ color: categoryColors[fdp.fdp_category] || categoryColors.default }}><strong>{fdp.fdp_category}</strong></span>
                                                </p>

                                                <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                                                    <div>
                                                        <span className="font-medium text-gray-700">Organizer:</span>{' '}
                                                        {fdp.organizer}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium text-gray-700">Certificate:</span>{' '}
                                                        <a
                                                            href={fdp.certificate_link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-500 underline hover:text-blue-700"
                                                        >
                                                            View
                                                        </a>
                                                    </div>
                                                    {fdp.remarks && (
                                                        <div className="col-span-2">
                                                            <span className="font-medium text-gray-700">Remarks:</span>{' '}
                                                            {fdp.remarks}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div key="details_3" className="relative h-[350px] min-h-[350px] rounded-xl p-4 px-2 shadow-xl bg-black text-white transition-all duration-300 ease-in-out overflow-hidde w-1/2">

                                        <h2 className="text-center text-2xl mb-4">FDP Distribution</h2>
                                        <ResponsiveContainer width="100%" height="90%" className="overflow-hidden text-wrap">
                                            <PieChart>
                                                <Pie
                                                    data={pieData}
                                                    dataKey="count"
                                                    nameKey="fdp_category"
                                                    cx="50%"
                                                    cy="50%"
                                                    outerRadius={90}
                                                    label={({ name }) => name.length > 12 ? name.slice(0, 12) + "..." : name}
                                                >
                                                    {pieData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={categoryColors[entry.fdp_category] || categoryColors.default} />
                                                    ))}
                                                </Pie>
                                                <Tooltip
                                                    content={({ payload }) => {
                                                        if (!payload || !payload.length) return null;

                                                        const total = pieData.reduce((sum, item) => sum + item.count, 0);
                                                        const value = payload[0].value;
                                                        const name = payload[0].name;

                                                        return (
                                                            <div className="bg-white text-black p-2 rounded shadow">
                                                                <strong>{name}</strong><br />
                                                                Count: {value}<br />
                                                                Percentage: {((value / total) * 100).toFixed(1)}%
                                                            </div>
                                                        );
                                                    }}
                                                />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                            </div>
                        </div>

                    )}

                    <div key="details_4" className="relative h-[350px] w-50% rounded-xl p-4 shadow-xl bg-black text-white transition-all duration-300 ease-in-out">
                        <button className="z-1 flex items-center justify-center absolute top-2 right-2 h-[6%] aspect-square bg-black rounded-full" onClick={() => setActiveRef("details_4")}><img src="/images/icons8-separating-48.png" /></button>
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
                                    cursor={{ strokeDasharray: "10 10" }}
                                    content={({ payload }) =>
                                        payload && payload.length ? (
                                            <div className="bg-white text-black p-2 rounded shadow">
                                                Year: {payload[0]?.payload?.publication_year}: Count: {payload[0]?.payload?.patents_count}
                                            </div>
                                        ) : null
                                    }
                                />

                                <Line
                                    dataKey="patents_count"
                                    fill="#aa336a"
                                    stroke="#ff00aa"
                                    strokeWidth={3}
                                    dot={{ fill: "#ff00aa", r: 6 }}
                                    activeDot={{ r: 8 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {activeRef === "details_4" && (
                        <div className="h-full w-full fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                            <div className=" bg-white p-6 rounded-lg shadow-lg relative w-[90%] h-[90%] flex flex-col">
                                <button
                                    onClick={() => setActiveRef(null)}
                                    className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-2xl"
                                >
                                    ✕
                                </button>
                                <div className="w-full flex flex-row gap-10">
                                    <h2 className="text-[150%] font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-l from-purple-500 via-pink-500 to-yellow-500">My Patents</h2>
                                    <h2 className="text-[150%] font-bold mb-4">Count: {patentData.length}</h2>
                                </div>
                                <div className="flex flex-col gap-3 h-[90%] w-full overflow-y-scroll">

                                    <div className="flex flex-row w-full gap-5 p-1 h-full bg-black rounded-lg">
                                        <div key="details_4_1" className="relative h-[350px] w-50% rounded-xl p-4 shadow-xl bg-black text-white transition-all duration-300 ease-in-out w-full">
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
                                                        cursor={{ strokeDasharray: "10 10" }}
                                                        content={({ payload }) =>
                                                            payload && payload.length ? (
                                                                <div className="bg-white text-black p-2 rounded shadow">
                                                                    Year: {payload[0]?.payload?.publication_year}: Count: {payload[0]?.payload?.patents_count}
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
                                                        strokeWidth={3}
                                                        dot={{ fill: "#ff00aa", r: 6 }}
                                                        activeDot={{ r: 8 }}
                                                    />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </div>

                                        <div key="details_4_2" className="relative h-[350px] rounded-xl p-4 shadow-xl bg-black text-white transition-all duration-300 ease-in-out w-full">
                                            {/* <button className="z-1 flex items-center justify-center absolute top-2 right-2 h-[6%] aspect-square bg-black rounded-full" onClick = {() => setActiveRef("details_3")}><img src = "/images/icons8-separating-48.png"/></button> */}
                                            <h2 className="text-center text-2xl mb-4">Patent Status</h2>
                                            <ResponsiveContainer width="100%" height="90%">
                                                <BarChart data={patentStatuses} margin={{ top: 20, right: 30, left: 30, bottom: 40 }}>
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
                                    </div>

                                    <h1 className="text-[150%] m-0 ml-5">Details:</h1>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 w-full rounded-md">

                                        {patentData.map((patent) => (
                                            <div
                                                key={patent.patent_id}
                                                className="bg-gradient-to-br from-[#f0f0f0] to-white border border-gray-300 scale-95 rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300"
                                            >
                                                <h3 className="text-xl font-semibold text-gray-800 mb-1">{patent.title}</h3>
                                                <p className="text-sm text-gray-600 italic mb-3">
                                                    Patent ID: {patent.patent_id} | Country: {patent.country}
                                                </p>

                                                <div className="flex flex-row gap-10 text-sm mb-2">
                                                    <div className="flex flex-col gap-1">
                                                        <div><span className="font-medium text-gray-700">Application No:</span> {patent.application_number}</div>
                                                        <div><span className="font-medium text-gray-700">Publication No:</span> {patent.publication_number}</div>
                                                        <div>
                                                            <span className="font-medium text-gray-700">Status:</span>{" "}
                                                            <span className={` ${patent.status === "Granted" ? "text-green-500" : `${patent.status === "Pending" ? "text-blue-500" : "text-yellow-500"}`}`}>{patent.status}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <div><span className="font-medium text-gray-700">Filing Date:</span> {new Date(patent.filing_date).toLocaleDateString()}</div>
                                                        <div><span className="font-medium text-gray-700">Publication Date:</span> {new Date(patent.publication_date).toLocaleDateString()}</div>
                                                        <div><span className="font-medium text-gray-700">Grant Date:</span> {new Date(patent.grant_date).toLocaleDateString() || "N/A"}</div>
                                                    </div>


                                                </div>

                                                {patent.description && (
                                                    <details className="mt-2 text-sm text-gray-600">
                                                        <summary className="cursor-pointer text-blue-600 hover:text-blue-800">View Description</summary>
                                                        <p className="mt-1">{patent.description}</p>
                                                    </details>
                                                )}

                                                {patent.document_link && (
                                                    <div className="mt-2">
                                                        <a
                                                            href={patent.document_link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-600 text-sm hover:underline"
                                                        >
                                                            View Official Document ↗
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}


