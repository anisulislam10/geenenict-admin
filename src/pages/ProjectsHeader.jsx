import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Editor } from "@tinymce/tinymce-react";

const ProjectSectionForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projects, setProjects] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}project-section/getAll`);
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { title, description };
    const url = selectedId
      ? `${import.meta.env.VITE_BASE_URL}project-section/update/${selectedId}`
      : `${import.meta.env.VITE_BASE_URL}project-section/post`;

    const method = selectedId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success(selectedId ? "Project updated successfully" : "Project created successfully");
        setTitle("");
        setDescription("");
        setSelectedId(null);
        fetchProjects();
      } else {
        toast.error("Error processing request");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    }
  };

  const handleEdit = (project) => {
    setSelectedId(project._id);
    setTitle(project.title);
    setDescription(project.description || "");
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}project-section/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Project deleted successfully");
        fetchProjects();
      } else {
        toast.error("Error deleting project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-2xl font-semibold mb-4 text-center">
        {selectedId ? "Update Project Header Section" : "Create Project Header Section"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium text-start">Title</label>
          {/* TinyMCE Editor */}
             <Editor
               apiKey={import.meta.env.VITE_TEXT_EDITOR_API_KEY}
               init={{ placeholder: "Enter Your Title here..." }}
               onEditorChange={(newValue) => setTitle(newValue)}
               value={title}
             />
        </div>
        <div>
          <label className="block text-gray-700 font-medium text-start">Description</label>
          <textarea
            className="w-full p-2 border rounded-md"
            placeholder="Enter project Section description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          {selectedId ? "Update Project" : "Submit"}
        </button>
      </form>
      <h2 className="text-xl font-semibold mt-6">Project Header List</h2>
      <ul className="mt-4 space-y-2">
        {projects.map((project) => (
          <li key={project._id} className="p-4 bg-gray-100 rounded-lg shadow-sm">
            <h3 className="font-medium">{project.title}</h3>
            <p className="text-gray-600">{project.description}</p>
            <div className="mt-2 space-x-2">
              <button
                className="px-4 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                onClick={() => handleEdit(project)}
              >
                Edit
              </button>
              <button
                className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                onClick={() => handleDelete(project._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectSectionForm;