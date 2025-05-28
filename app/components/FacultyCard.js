// components/FacultyCard.js
export default function FacultyCard({ faculty, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white p-4 rounded-xl shadow hover:shadow-lg cursor-pointer transition"
    >
      <img
        src={faculty.image_url || '/placeholder.png'}
        alt={faculty.name}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h2 className="text-lg font-semibold">{faculty.name}</h2>
      <p className="text-sm text-gray-500">{faculty.department}</p>
      <p className="text-sm text-gray-400">ID: {faculty.faculty_id}</p>
    </div>
  );
}
