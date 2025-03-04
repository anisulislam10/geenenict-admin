import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const baseUrl = `${import.meta.env.VITE_BASE_URL}contact/getAll`;

  // Fetch all requests
  const fetchRequests = async () => {
    try {
      const response = await fetch(baseUrl);
      const data = await response.json();
      if (response.ok) {
        setRequests(data);
      } else {
        toast.error("Failed to fetch requests.");
      }
    } catch {
      toast.error("Error fetching requests.");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">User Requests</h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">First Name</th>
              <th className="p-2 border">Last Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? (
              requests.map((request) => (
                <tr key={request._id} className="hover:bg-gray-50">
                  <td className="p-2 border">{request.firstName}</td>
                  <td className="p-2 border">{request.lastName || "-"}</td>
                  <td className="p-2 border">{request.email}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => setSelectedRequest(request)}
                      className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  No requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-3">Request Details</h3>
            <p>
              <strong>First Name:</strong> {selectedRequest.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {selectedRequest.lastName || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {selectedRequest.email}
            </p>
            <p>
              <strong>Message:</strong> {selectedRequest.message}
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setSelectedRequest(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Requests;
