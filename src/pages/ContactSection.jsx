import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactSection = () => {
  const [contact, setContact] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    image: null, // File input for image
  });

  const baseUrl = `${import.meta.env.VITE_BASE_URL}contact-section`;

  // Fetch Contact Section Data
  const fetchContact = async () => {
    try {
      const response = await fetch(`${baseUrl}/getAll`);
      const data = await response.json();
      if (response.ok && data.length > 0) {
        setContact(data[0]);
        setFormData({ title: data[0].title, image: null });
      } else {
        toast.error("No contact section found.");
      }
    } catch {
      toast.error("Error fetching contact section.");
    }
  };

  useEffect(() => {
    fetchContact();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Image Upload
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Handle Create
  const handleCreate = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    if (formData.image) formDataToSend.append("image", formData.image);

    try {
      const response = await fetch(`${baseUrl}/post`, {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        toast.success("Contact section created successfully!");
        fetchContact();
      } else {
        toast.error("Error creating contact section.");
      }
    } catch {
      toast.error("Error creating contact section.");
    }
  };

  // Handle Update
  const handleUpdate = async () => {
    if (!contact) return;

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    if (formData.image) formDataToSend.append("image", formData.image);

    try {
      const response = await fetch(`${baseUrl}/update/${contact._id}`, {
        method: "PUT",
        body: formDataToSend,
      });

      if (response.ok) {
        toast.success("Contact section updated successfully!");
        fetchContact();
      } else {
        toast.error("Error updating contact section.");
      }
    } catch {
      toast.error("Error updating contact section.");
    }
  };

  // Handle Delete
  const handleDelete = async () => {
    if (!contact) return;

    try {
      const response = await fetch(`${baseUrl}/delete/${contact._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Contact section deleted successfully!");
        setContact(null);
        setFormData({ title: "", image: null });
      } else {
        toast.error("Error deleting contact section.");
      }
    } catch {
      toast.error("Error deleting contact section.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Contact Section</h2>

      {/* Form */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium">Title</label>
          <textarea
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter title"
            className="p-2  py-12 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="p-2 border rounded-md"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        {!contact ? (
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Add Contact Section
          </button>
        ) : (
          <>
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Update Contact Section
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Delete Contact Section
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactSection;
