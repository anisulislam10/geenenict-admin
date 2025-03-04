import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Editor } from "@tinymce/tinymce-react";

const WordMethod = () => {
  const [workMethods, setWorkMethods] = useState([]);
  const [header, setHeader] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchWorkMethods();
  }, []);

  const fetchWorkMethods = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}workmethod/get`);
      const result = await response.json();
      console.log("Fetched Data:", result);
  
      if (response.ok) {
        setWorkMethods(Array.isArray(result) ? result : [result]);
      } else {
        toast.error("Failed to fetch work methods");
      }
    } catch (error) {
      toast.error("Error fetching work methods");
    }
  };
  
  const handleSubmit = async () => {
    if (!header || !title || !description) {
      toast.error("All fields are required!");
      return;
    }
  
    const payload = { header, title, description };
    const url = editingId
      ? `${import.meta.env.VITE_BASE_URL}workmethod/update/${editingId}`
      : `${import.meta.env.VITE_BASE_URL}workmethod/create`;
  
    const method = editingId ? "PUT" : "POST";
  
   
  
    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        toast.success(editingId ? "Work method updated!" : "Work method added!");
        fetchWorkMethods();
        resetForm();
      } else {
        toast.error(result.message || "Failed to save work method");
      }
    } catch (error) {
      toast.error("Error submitting data");
    }
  };
  
  const handleEdit = (method) => {
    setEditingId(method._id);
    setHeader(method.header);
    setTitle(method.title);
    setDescription(method.description);

    // Scroll to top smoothly when editing
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}workmethod/delete/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Work method deleted!");
        fetchWorkMethods();
      } else {
        toast.error("Failed to delete");
      }
    } catch (error) {
      toast.error("Error deleting work method");
    }
  };

  const resetForm = () => {
    setHeader("");
    setTitle("");
    setDescription("");
    setEditingId(null);
  };

  return (
    <div className="flex flex-col justify-start mx-64 space-y-4">
      <h2 className="text-xl font-bold">Work Method Section</h2>

      <input
        type="text"
        value={header}
        onChange={(e) => setHeader(e.target.value)}
        placeholder="Header"
        className="border rounded p-2 w-full"
      />

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

      <button onClick={handleSubmit} className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
        {editingId ? "Update" : "Submit"}
      </button>

      <h2 className="text-lg font-bold mt-6">Saved Work Methods</h2>
      <div className="space-y-4">
        {workMethods.length > 0 ? (
          workMethods.map((method) => (
            <div key={method._id} className="border p-4 rounded shadow-md flex justify-between items-center">
              <div>
                <p><strong>Header:</strong> {method.header}</p>
                <p><strong>Title:</strong> {method.title}</p>
                <p><strong>Description:</strong> {method.description}</p>
              </div>
              <div className="space-x-2 space-y-3">
                <button onClick={() => handleEdit(method)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                <button onClick={() => handleDelete(method._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No work methods available</p>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default WordMethod;
