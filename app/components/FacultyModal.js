// components/FacultyModal.js
export default function FacultyModal({ facultyData, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6">
        <button
          onClick={onClose}
          className="float-right text-gray-500 hover:text-black text-xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-2">{facultyData.faculty.name}</h2>
        <p className="text-gray-600 mb-4">{facultyData.faculty.department}</p>

        <div className="space-y-6">
          {['project_details', 'phd_details', 'fdp_details', 'patent_details', 'research_details'].map((key) => (
            <div key={key}>
              <h3 className="text-xl font-semibold capitalize">{key.replace('_', ' ')}</h3>
              <ul className="list-disc ml-6 text-sm text-gray-700">
                {facultyData[key]?.map((item, index) => (
                  <li key={index}>
                    {Object.entries(item)
                      .map(([k, v]) => `${k}: ${v}`)
                      .join(', ')}
                  </li>
                )) || <p>No records.</p>}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
