// import React, { useState, useEffect } from "react";

// const SMTPSettings = () => {
//   const [smtp, setSmtp] = useState({
//     email: "",
//     password: "",
//     ownerEmail: "",
//     host: "",
//     port: "",
//   });

//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(""); // Error state

//   const API_URL = import.meta.env.VITE_BACKEND_URL; // Make sure your env variable is correctly set

//   useEffect(() => {
//     const fetchSMTPSettings = async () => {
//       try {
//         const res = await fetch(`${API_URL}/api/get-smtp`);
//         const data = await res.json();

//         if (res.ok) {
//           setSmtp(data || {});
//         } else {
//           throw new Error(data.message || "Failed to fetch SMTP settings.");
//         }
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSMTPSettings();
//   }, [API_URL]);

//   const handleChange = (e) => {
//     setSmtp({ ...smtp, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(`${API_URL}/api/save-smtp`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(smtp),
//       });

//       const result = await response.json();
//       if (response.ok) {
//         alert("SMTP settings updated!");
//       } else {
//         throw new Error(result.message || "Failed to update settings.");
//       }
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold mb-4 text-center">SMTP Configuration</h2>

//       {loading ? (
//         <p className="text-center text-gray-600">Loading...</p>
//       ) : error ? (
//         <p className="text-center text-red-500">{error}</p>
//       ) : (
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="email"
//             name="email"
//             placeholder="SMTP Email"
//             value={smtp.email}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="SMTP Password"
//             value={smtp.password}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//           <input
//             type="email"
//             name="ownerEmail"
//             placeholder="Owner Email"
//             value={smtp.ownerEmail}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//           <input
//             type="text"
//             name="host"
//             placeholder="SMTP Host"
//             value={smtp.host}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//           <input
//             type="text"
//             name="port"
//             placeholder="SMTP Port"
//             value={smtp.port}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//           <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
//             Save Settings
//           </button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default SMTPSettings;
