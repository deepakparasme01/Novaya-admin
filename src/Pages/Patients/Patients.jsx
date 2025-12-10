import React from 'react';

const Patients = () => {
    return (
    <div className="main main_page p-6 duration-900">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">demo</h1>
        <p className="text-gray-600">
          This is a demo page showing the smooth sidebar transition effect.
          Click the menu button to toggle the sidebar open and closed.
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="p-4 bg-gradient-to-br from-blue-50 to-teal-50 rounded-lg border border-blue-100"
            >
              <h3 className="font-semibold text-gray-800 mb-2">Card {i}</h3>
              <p className="text-sm text-gray-600">
                Sample content for demonstration
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

}

export default Patients;
