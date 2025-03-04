import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProjectLists = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projects, setProjects] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  // Fetch all projects
  const fetchProjects = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}projects/getAll`);
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      toast.error("Error fetching projects");
      console.error("Error fetching projects:", error);
    }
  };

  // Create or Update project
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { title, description };
    const url = selectedId
      ? `${import.meta.env.VITE_BASE_URL}projects/update/${selectedId}`
      : `${import.meta.env.VITE_BASE_URL}projects/post`;
    const method = selectedId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success(selectedId ? "Project updated!" : "Project created!");
        setTitle("");
        setDescription("");
        setSelectedId(null);
        fetchProjects();
      } else {
        toast.error("Error processing request");
      }
    } catch (error) {
      toast.error("Error saving project");
      console.error("Error:", error);
    }
  };

  // Edit project
  const handleEdit = (project) => {
    setSelectedId(project._id);
    setTitle(project.title);
    setDescription(project.description || "");
  };

  // Delete project
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}projects/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Project deleted!");
        fetchProjects();
      } else {
        toast.error("Error deleting project");
      }
    } catch (error) {
      toast.error("Error deleting project");
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        {selectedId ? "Update Project" : "Create Project"}
      </h2>

      {/* Project Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Title</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            placeholder="Enter project title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Description</label>
          <textarea
            className="w-full p-2 border rounded-md"
            placeholder="Enter project description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          {selectedId ? "Update Project" : "Create Project"}
        </button>
      </form>

      {/* Project List */}
      <h2 className="text-xl font-semibold mt-6">Project List</h2>
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

export default ProjectLists;
