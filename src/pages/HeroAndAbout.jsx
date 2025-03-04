import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HeroAndAbout = () => {
  const [data, setData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [header, setHeader] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [subsubtitle, setSubsubtitle] = useState("");
  const [whoIAm, setWhoIAm] = useState("");
  const [expertise, setExpertise] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch all data
  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}herosection/getAll`);
      const result = await response.json();
      console.log("response....",result[0])
      if (response.ok) {
        setData(result);
      } else {
        toast.error(result.message || "Failed to fetch data.");
      }
    } catch (error) {
      toast.error("Error fetching data!");
    }
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  // Submit or update data
  const handleSubmit = async () => {
    if (!header || !title || !subtitle || !subsubtitle || !description || !whoIAm || !expertise) {
      toast.error("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("header", header);
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("subsubtitle", subsubtitle);
    formData.append("description", description);
    formData.append("whoIAm", whoIAm);
    formData.append("expertise", expertise);
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      const url = editingId
        ? `${import.meta.env.VITE_BASE_URL}herosection/update/${editingId}`
        : `${import.meta.env.VITE_BASE_URL}herosection/post`;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        toast.success(editingId ? "Updated successfully!" : "Added successfully!");
        fetchData();
        resetForm();
      } else {
        toast.error(result.message || "Operation failed!");
      }
    } catch (error) {
      toast.error("Error submitting data!");
    }
  };

  // Delete a record
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}herosection/delete/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Deleted successfully!");
        fetchData();
      } else {
        toast.error(result.message || "Failed to delete!");
      }
    } catch (error) {
      toast.error("Error deleting record!");
    }
  };

  // Edit a record
  const handleEdit = (item) => {
    setEditingId(item._id);
    setHeader(item.header);
    setTitle(item.title);
    setSubtitle(item.subtitle);
    setSubsubtitle(item.subsubtitle);
    setWhoIAm(item.whoIAm);
    setExpertise(item.expertise);
    setDescription(item.description);
    window.scrollTo({ top: 0, behavior: "smooth" });

  };

  // Reset form
  const resetForm = () => {
    setHeader("");
    setTitle("");
    setSubtitle("");
    setSubsubtitle("");
    setWhoIAm("");
    setExpertise("");
    setDescription("");
    setSelectedFile(null);
    setEditingId(null);
  };

  return (
    <div className="flex flex-col justify-start mx-64 space-y-4">
      <h2 className="text-xl font-bold">Hero & About Section</h2>

      {/* TinyMCE Editor */}
      <Editor
        apiKey={import.meta.env.VITE_TEXT_EDITOR_API_KEY}
        init={{ placeholder: "Enter Your Title here..." }}
        onEditorChange={(newValue) => setTitle(newValue)}
        value={title}
      />

      {/* File Upload */}
      <div>
        <label className="block text-gray-700 font-bold mb-2 text-start">Upload an Image:</label>
        <input type="file" accept="image/*" onChange={handleFileUpload} className="border rounded p-2 w-full" />
        {selectedFile && <p className="mt-2 text-gray-600">Image selected: {selectedFile.name}</p>}
      </div>

      {/* Input Fields */}
      <input type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="Welcome to Digidaal
" className="border rounded p-2 w-full" />
      <input type="text" value={subsubtitle} onChange={(e) => setSubsubtitle(e.target.value)} placeholder="Nice to meet you!

" className="border rounded p-2 w-full" />
      <input type="text" value={header} onChange={(e) => setHeader(e.target.value)} placeholder="About me" className="border rounded p-2 w-full" />
      <Editor apiKey={import.meta.env.VITE_TEXT_EDITOR_API_KEY} init={{ placeholder: "Description..." }} onEditorChange={(newValue) => setDescription(newValue)} value={description} />


      {/* Text Editors */}
      <Editor apiKey={import.meta.env.VITE_TEXT_EDITOR_API_KEY} init={{ placeholder: "Who I am..." }} onEditorChange={(newValue) => setWhoIAm(newValue)} value={whoIAm} />
      <Editor apiKey={import.meta.env.VITE_TEXT_EDITOR_API_KEY} init={{ placeholder: "Key Expertise..." }} onEditorChange={(newValue) => setExpertise(newValue)} value={expertise} />

      {/* Submit Button */}
      <button onClick={handleSubmit} className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
        {editingId ? "Update" : "Submit"}
      </button>

      {/* Display Data */}
      <h2 className="text-lg font-bold mt-6">Saved Data</h2>
      <div className="space-y-4">
        {data.length > 0 ? (
          data.map((item) => (
            <div key={item._id} className="border p-4 rounded shadow-md flex justify-between items-center">
              <div>
                <p><strong>Header:</strong> {item.header}</p>
                <p><strong>Subtitle:</strong> {item.subtitle}</p>
                <p><strong>title:</strong> {item.title}</p>
              </div>
              <div className="space-x-2">
                <button onClick={() => handleEdit(item)} className="bg-yellow-500 text-white px-3 py-1 rounded">
                  Edit
                </button>
                <button onClick={() => handleDelete(item._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default HeroAndAbout;
