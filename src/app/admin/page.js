"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Edit2, Image as ImageIcon, ExternalLink, LogOut, Loader2, X } from "lucide-react";

export default function Admin() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [images, setImages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await fetch('/api/auth/me');
        const data = await response.json();
        if (!data.user) {
          router.push("/login");
        }
      } catch (error) {
        router.push("/login");
      }
    };
    checkUser();
    fetchProjects();
  }, [router]);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const projectData = { name, description, link, images };

      if (editingId) {
        const res = await fetch(`/api/projects/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(projectData),
        });
        if (!res.ok) throw new Error("Failed to update project");
      } else {
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(projectData),
        });
        if (!res.ok) throw new Error("Failed to add project");
      }

      resetForm();
      fetchProjects();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await fetch(`/api/projects/${id}`, { method: "DELETE" });
      fetchProjects();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setName(project.name);
    setDescription(project.description);
    setLink(project.link);
    setImages(project.images || []);
    
    // Scroll to top elegantly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const removeImage = (indexToRemove) => {
    setImages(images.filter((_, idx) => idx !== indexToRemove));
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;

    setIsUploading(true);

    const formData = new FormData();
    for (let file of files) {
      formData.append("files", file);
    }

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to upload images");
      
      setImages((prevImages) => [...prevImages, ...data.urls]);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsUploading(false);
      e.target.value = null;
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setDescription("");
    setLink("");
    setImages([]);
  };

  const cancelEdit = () => {
    resetForm();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-poppins selection:bg-blue-500/30">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center font-bold text-lg shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              MG
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Admin <span className="text-blue-400">Dashboard</span></h1>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-red-500/10 hover:text-red-400 border border-white/5 hover:border-red-500/20 transition-all duration-300"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12">
        {/* Left Column: Form */}
        <div className="w-full lg:w-1/3 flex-shrink-0">
          <div className="bg-[#111111] border border-white/10 p-6 sm:p-8 rounded-2xl shadow-2xl sticky top-28">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">{editingId ? "Update Project" : "Create New Project"}</h2>
              <p className="text-gray-400 text-sm">Fill in the details to {editingId ? "update the existing" : "add a new"} project to your portfolio.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Project Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all placeholder:text-gray-600" 
                  placeholder="e.g. E-Commerce Platform"
                  required 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Description</label>
                <textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  rows={4} 
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all placeholder:text-gray-600 resize-none" 
                  placeholder="Describe your project, technologies used, and challenges solved..."
                  required
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Live Demo / Repo Link</label>
                <input 
                  type="url" 
                  value={link} 
                  onChange={(e) => setLink(e.target.value)} 
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all placeholder:text-gray-600" 
                  placeholder="https://yourproject.com"
                  required 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Media</label>
                
                {/* Custom File Upload Button */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                  <label className="relative flex items-center justify-center gap-2 w-full px-4 py-4 bg-[#1a1a1a] border border-white/10 border-dashed rounded-xl cursor-pointer hover:bg-[#222] transition-all">
                    {isUploading ? <Loader2 className="animate-spin text-blue-400" size={20} /> : <ImageIcon className="text-gray-400 group-hover:text-blue-400 transition-colors" size={20} />}
                    <span className="text-sm font-medium text-gray-300">
                      {isUploading ? "Uploading to Cloudinary..." : "Click to browse images"}
                    </span>
                    <input 
                      type="file" 
                      onChange={handleImageUpload} 
                      accept="image/*" 
                      className="hidden" 
                      multiple 
                      disabled={isUploading}
                    />
                  </label>
                </div>

                {/* Image Previews */}
                {images.length > 0 && (
                  <div className="grid grid-cols-4 gap-3 mt-4">
                    {images.map((img, idx) => (
                      <div key={idx} className="relative group rounded-lg overflow-hidden border border-white/10 aspect-square">
                        <img src={img} alt="Preview" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                        <button 
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                        >
                          <X size={18} className="text-red-400 hover:text-red-300" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 flex gap-3">
                {editingId && (
                  <button 
                    type="button"
                    onClick={cancelEdit}
                    className="flex-1 py-3 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 font-medium transition-colors"
                  >
                    Cancel
                  </button>
                )}
                <button 
                  type="submit" 
                  disabled={isUploading}
                  className="flex-[2] py-3 px-4 rounded-xl relative group overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transition-transform duration-300 group-hover:scale-[1.02]"></div>
                  <div className="relative flex items-center justify-center gap-2 font-semibold">
                    {isUploading ? (
                      <><Loader2 size={18} className="animate-spin" /> Processing...</>
                    ) : (
                      <><Plus size={18} /> {editingId ? "Save Changes" : "Publish Project"}</>
                    )}
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Projects List */}
        <div className="w-full lg:w-2/3">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              Published Projects
              <span className="bg-white/10 text-xs px-3 py-1 rounded-full text-gray-300">{projects.length}</span>
            </h2>
          </div>

          {projects.length === 0 ? (
            <div className="w-full p-12 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                <ImageIcon className="text-gray-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">No projects found</h3>
              <p className="text-gray-400 max-w-sm">You haven't added any projects yet. Use the form to create your very first portfolio entry.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="group bg-[#111] border border-white/5 hover:border-blue-500/30 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] flex flex-col h-full">
                  {/* Card Media Header */}
                  <div className="h-48 relative overflow-hidden bg-black flex items-center justify-center border-b border-white/5">
                    {project.images && project.images.length > 0 ? (
                      <img src={project.images[0]} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="text-gray-600 flex flex-col items-center gap-2">
                        <ImageIcon size={32} />
                        <span className="text-xs font-medium uppercase tracking-wider">No Media</span>
                      </div>
                    )}
                    
                    {/* Floating Action Buttons layered over the image */}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <button 
                        onClick={() => handleEdit(project)} 
                        className="w-10 h-10 bg-black/60 backdrop-blur-md hover:bg-blue-500/80 rounded-full flex items-center justify-center transition-colors border border-white/10"
                        title="Edit Project"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(project.id)} 
                        className="w-10 h-10 bg-black/60 backdrop-blur-md hover:bg-red-500/80 rounded-full flex items-center justify-center transition-colors border border-white/10"
                        title="Delete Project"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors">{project.name}</h3>
                    <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-grow">{project.description}</p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex -space-x-2">
                        {project.images?.slice(0, 3).map((img, i) => (
                          <div key={i} className="w-8 h-8 rounded-full border-2 border-[#111] overflow-hidden">
                            <img src={img} className="w-full h-full object-cover" alt="" />
                          </div>
                        ))}
                        {project.images?.length > 3 && (
                          <div className="w-8 h-8 rounded-full border-2 border-[#111] bg-gray-800 flex items-center justify-center text-[10px] font-bold">
                            +{project.images.length - 3}
                          </div>
                        )}
                      </div>
                      
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-sm font-medium text-gray-300 hover:text-white transition-colors bg-white/5 py-2 px-4 rounded-full border border-white/5 hover:bg-white/10"
                      >
                        Visit <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
