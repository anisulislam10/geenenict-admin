import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Editor } from "@tinymce/tinymce-react";

const Services = () => {
  const [services, setServices] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchServices();
  }, [refresh]);

  const triggerRefresh = () => setRefresh((prev) => !prev);

  const fetchServices = async () => {
    try {
      console.log("Fetching services...");
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}services/getAll`);
      const result = await response.json();
      console.log("API Response:", result);
  
      if (response.ok) {
        const servicesWithBase64 = result.data.map(service => ({
          ...service,
          image: service.image ? `data:image/jpeg;base64,${service.image}` : null
        }));
        setServices(servicesWithBase64);
      } else {
        toast.error("Failed to fetch services");
      }
    } catch (error) {
      toast.error("Error fetching services");
      console.error("Fetch error:", error);
    }
  };
  

  const handleSubmit = async () => {
    if (!title || !description) {
      toast.error("Title and description are required!");
      return;
    }
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    
    if (selectedFile) {
      formData.append("image", selectedFile);
    }
  
    try {
      const url = editingId
        ? `${import.meta.env.VITE_BASE_URL}services/update/${editingId}`
        : `${import.meta.env.VITE_BASE_URL}services/post`;
  
      const method = editingId ? "PUT" : "POST";
  
      const response = await fetch(url, {
        method,
        // ❌ DO NOT SET HEADERS for FormData, the browser sets them automatically
        body: formData,
      });
  
      const result = await response.json();
      console.log("Updated API Response:", result);
  
      if (response.ok) {
        toast.success(editingId ? "Service updated!" : "Service added!");
        triggerRefresh();
        resetForm();
      } else {
        toast.error(result.message || "Failed to save service");
      }
    } catch (error) {
      toast.error("Error submitting data");
      console.error("Submit error:", error);
    }
  };
  

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}services/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Service deleted!");
        triggerRefresh();
      } else {
        toast.error("Failed to delete");
      }
    } catch (error) {
      toast.error("Error deleting service");
    }
  };

  const handleEdit = (service) => {
    setTitle(service.title);
    setDescription(service.description);
    setEditingId(service._id);
    setExistingImage(service.image);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setSelectedFile(null);
    setEditingId(null);
    setExistingImage("");
  };

  return (
    <div className="flex flex-col justify-start mx-64 space-y-4">
      <h2 className="text-xl font-bold">Services Section</h2>

      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Title" 
        className="border rounded p-2 w-full" 
      />

      <Editor 
        apiKey={import.meta.env.VITE_TEXT_EDITOR_API_KEY} 
        value={description} 
        onEditorChange={(newValue) => setDescription(newValue)} 
        init={{ placeholder: "Description..." }} 
      />

      <input 
        type="file" 
        accept="image/*" 
        onChange={(e) => setSelectedFile(e.target.files[0])} 
        className="border rounded p-2 w-full" 
      />

{existingImage && !selectedFile && (
  <div className="mt-2">
    <img 
      src={existingImage} 
      alt="Existing Service" 
      className="w-16 h-16"
    />
  </div>
)}

      <button onClick={handleSubmit} className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
        {editingId ? "Update" : "Submit"}
      </button>

      <button onClick={resetForm} className="bg-gray-500 text-white font-bold py-2 px-4 rounded ml-2">
        Cancel
      </button>

      <ToastContainer />

      <h2 className="text-lg font-bold mt-4">Existing Services</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Title</th>
              <th className="border border-gray-300 p-2">Description</th>
              <th className="border border-gray-300 p-2">Image</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.length > 0 ? (
              services.map((service) => (
                <tr key={service._id} className="text-center">
                  <td className="border border-gray-300 p-2">{service.title}</td>
                  <td 
                    className="border border-gray-300 p-2" 
                    dangerouslySetInnerHTML={{ __html: service.description }}
                  ></td>
                 <td className="border border-gray-300 p-2">
  {service.image && (
    <img 
      src={service.image} 
      alt="Service" 
      className="w-16 h-16 mx-auto" 
    />
  )}
</td>
                  <td className="border border-gray-300 p-2">
                    <button 
                      onClick={() => handleEdit(service)} 
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    
                    <button 
                      onClick={() => handleDelete(service._id)} 
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="border border-gray-300 p-4 text-center">
                  No services available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Services;
