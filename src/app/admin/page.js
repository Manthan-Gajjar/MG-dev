"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Admin() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [images, setImages] = useState([]); // Stores image URLs
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
      }
    };
    checkUser();
    fetchProjects();
  }, [router]);

  const fetchProjects = async () => {
    const { data, error } = await supabase.from("projects").select("*");
    if (error) {
      alert(error.message);
    } else {
      setProjects(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const projectData = { name, description, link, images }; // Store images as an array

      if (editingId) {
        await supabase.from("projects").update(projectData).eq("id", editingId);
      } else {
        await supabase.from("projects").insert([projectData]);
      }

      alert("Project saved successfully!");
      resetForm();
      fetchProjects();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (id) => {
    await supabase.from("projects").delete().eq("id", id);
    fetchProjects();
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setName(project.name);
    setDescription(project.description);
    setLink(project.link);
    setImages(project.images || []);
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;

    const uploadedImageUrls = [];

    for (let file of files) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { data, error } = await supabase.storage.from("project").upload(fileName, file);

      if (error) {
        alert(error.message);
        return;
      }

      const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/project/${fileName}`;
      uploadedImageUrls.push(imageUrl);
    }

    setImages((prevImages) => [...prevImages, ...uploadedImageUrls]); // Store all images
  };

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setDescription("");
    setLink("");
    setImages([]);
  };

  return (
    <div className="text-white container mx-auto px-6 py-8 bg-black min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8">Admin Panel</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-gray-900 p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block font-bold mb-2">Project Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-gray-500 bg-gray-800 text-white" required />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-gray-500 bg-gray-800 text-white" required></textarea>
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">Project Link</label>
          <input type="url" value={link} onChange={(e) => setLink(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-gray-500 bg-gray-800 text-white" required />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">Images</label>
          <input type="file" onChange={handleImageUpload} accept="image/*" className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-gray-500 bg-gray-800 text-white" multiple />
          {/* Show selected images before uploading */}
          {images.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {images.map((img, idx) => (
                <img key={idx} src={img} alt="Uploaded" className="w-16 h-16 rounded-md object-cover" />
              ))}
            </div>
          )}
        </div>
        <button type="submit" className="button-85 w-full">{editingId ? "Update Project" : "Add Project"}</button>
      </form>

      {/* Projects List */}
      <div className="w-full max-w-2xl mt-8">
        <h2 className="text-2xl font-bold mb-4">Projects</h2>
        {projects.map((project) => (
          <div key={project.id} className="bg-gray-800 p-4 rounded-lg shadow-md mb-4">
            <h3 className="text-lg font-bold">{project.name}</h3>
            <p>{project.description}</p>
            <a href={project.link} target="_blank" className="text-blue-400 hover:underline">View Project</a>
            
            {/* Show Uploaded Images */}
            {project.images && Array.isArray(project.images) && project.images.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {project.images.map((img, idx) => (
                  <img key={idx} src={img} alt="Project" className="w-16 h-16 rounded-md object-cover" />
                ))}
              </div>
            )}

            <div className="flex space-x-4 mt-2">
              <button onClick={() => handleEdit(project)} className="button-85">Edit</button>
              <button onClick={() => handleDelete(project.id)} className="button-85 bg-red-600 hover:bg-red-700">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
