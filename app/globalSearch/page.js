"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import debounce from "lodash.debounce";
import Header from "../components/Header";
import Sidebar from "../components/sideBar";

export default function FacultySearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [faculties, setFaculties] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [loading, setLoading] = useState(false);

  const [departmentFilter, setDepartmentFilter] = useState("");
  const [designationFilter, setDesignationFilter] = useState("");


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if(!storedUser) router.push("/404")
    
  }, [])

  const fetchFaculties = async (searchTerm) => {
    if (!searchTerm && !departmentFilter && !designationFilter) {
      setFaculties([]);
      return;
    }

    setLoading(true);
    try {
      console.log("department: ", departmentFilter);
      console.log("designation: ", designationFilter);
      const params = new URLSearchParams({
        q: searchTerm,
        department: departmentFilter,
        designation: designationFilter,
      });

      const res = await fetch(`/api/facultySearch?${params.toString()}`);
      const data = await res.json();
      setFaculties(data);
    } catch (err) {
      console.error("Error fetching faculties:", err);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useCallback(debounce(fetchFaculties, 400), [departmentFilter, designationFilter]);

  useEffect(() => {
    debouncedSearch(query);
  }, [query, departmentFilter, designationFilter]);

  const handleFacultyClick = async (faculty) => {
    try {
      const res = await fetch(`/api/facultyDetails?id=${faculty.faculty_id}`);
      const details = await res.json();
      setSelectedFaculty({ ...faculty, ...details });
      console.log("Faculty Details:", selectedFaculty);
    } catch (err) {
      console.error("Error fetching faculty details:", err);
    }
  };

//   useEffect(() => {
//     console.log("Faculty Details:", selectedFaculty);
//   }, [])

  return (
    <>
        <Header />
        <div className="flex flex-row h-full w-full">
            <Sidebar />
                <div className="p-6 min-h-screen w-full bg-gray-50">
                    <input
                        type="text"
                        placeholder="Search for faculty..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 mb-6"
                    />

                    <div className="flex flex-wrap gap-4 mb-6">
                      <select
                        value={departmentFilter}
                        onChange={(e) => setDepartmentFilter(e.target.value)}
                        className="px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="">All Departments</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Information Technology">Information Technology</option>
                        <option value="Mechanical">Mechanical</option>
                        <option value="Electrical">Electrical</option>
                        {/* Add more departments as needed */}
                      </select>

                      <select
                        value={designationFilter}
                        onChange={(e) => setDesignationFilter(e.target.value)}
                        className="px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="">All Designations</option>
                        <option value="Professor">Professor</option>
                        <option value="Associate Professor">Associate Professor</option>
                        <option value="Assistant Professor">Assistant Professor</option>
                        {/* Add more designations as needed */}
                      </select>
                    </div>
                    {loading && <p className="text-gray-500">Loading...</p>}

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        
                        {faculties.length > 0 && faculties.map((faculty, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-md rounded-xl p-4 cursor-pointer hover:shadow-xl text-black transition-all duration-300 hover:scale-105 active:scale-95"
                            onClick={() => handleFacultyClick(faculty)}
                        >
                            <img
                            src={`/api/photo/${faculty.faculty_id}`}
                            alt="Faculty"
                            className="w-full h-40 object-contain rounded-lg mb-4"
                            />
                            <h3 className="text-lg font-semibold ">{faculty.name}</h3>
                            <p className="text-sm">{faculty.department}</p>
                            <p className="text-sm">{faculty.designation}</p>
                            
                        </div>
                        ))}
                    </div>

                    {selectedFaculty && (
                      <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-md flex justify-center items-center z-50 px-4">
                        <div className="bg-white w-full max-w-3xl rounded-3xl rounded-tr-none rounded-br-none p-8 shadow-2xl overflow-y-auto max-h-[90vh] relative border border-gray-200">
                          <button
                            onClick={() => setSelectedFaculty(null)}
                            className="absolute top-4 right-6 text-gray-500 hover:text-red-600 transition text-5xl font-light"
                            aria-label="Close modal"
                          >
                            &times;
                          </button>

                          <div className="flex flex-col items-center text-center">
                            <img
                              src={`/api/photo/${selectedFaculty.faculty_id}`}
                              alt={`Photo of ${selectedFaculty.name}`}
                              className="w-36 h-36 object-cover rounded-full shadow-lg mb-6 border-4 border-indigo-500"
                              loading="lazy"
                            />
                            <h2 className="text-3xl font-extrabold mb-2 text-indigo-700">{selectedFaculty.name}</h2>
                            <p className="text-indigo-500 italic mb-6">{selectedFaculty.designation} — {selectedFaculty.department}</p>
                          </div>

                          <div className="flex flex-row justify-between text-gray-800 text-base">
                            <div className="justify-between">
                              <p><span className="font-semibold">Email:</span> <a href={`mailto:${selectedFaculty.email}`} className="text-indigo-600 hover:underline">{selectedFaculty.email}</a></p>
                              <p><span className="font-semibold">Experience:</span> {selectedFaculty.experience_years} years</p>
                              <p><span className="font-semibold">PhD Guideships:</span> {selectedFaculty.phd_guideship == true ? "True" : "False"}</p>
                              <p><span className="font-semibold">FDPs Attended:</span> {selectedFaculty.fdp_attended_count || 0}</p>
                            </div>
                            <div>
                              <p><span className="font-semibold">Patents:</span> {selectedFaculty.patents_count || 0}</p>
                              <p><span className="font-semibold">Research Publications:</span> {selectedFaculty.research_papers_count || 0}</p>
                              <p><span className="font-semibold">Specialization:</span> {selectedFaculty.specialization || "None"}</p>
                              <p><span className="font-semibold">Expertise:</span> {selectedFaculty.expertise_in_subjects || "None"}</p>
                            </div>
                          </div>
                          

                          {selectedFaculty.award_achievement_activity && (
                            <div className="mt-8 bg-indigo-50 p-4 rounded-lg border border-indigo-200 text-indigo-700 text-sm">
                              <h3 className="font-semibold mb-2">Awards & Achievements</h3>
                              <p>{selectedFaculty.award_achievement_activity}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                </div>
        </div>
    </>
  );
}
