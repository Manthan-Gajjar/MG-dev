// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { createClient } from "@supabase/supabase-js";
// import css from "../components/button.css";

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// );

// export default function Admin() {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [link, setLink] = useState("");
//   const [images, setImages] = useState([]);
//   const [projects, setProjects] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     const checkUser = async () => {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();
//       if (!user) {
//         router.push("/login");
//       }
//     };
//     checkUser();
//     fetchProjects();
//   }, [router]);

//   const fetchProjects = async () => {
//     const { data, error } = await supabase.from("projects").select("*");
//     if (error) {
//       alert(error.message);
//     } else {
//       setProjects(data);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingId) {
//         await supabase.from("projects").update({ name, description, link, images }).eq("id", editingId);
//       } else {
//         await supabase.from("projects").insert([{ name, description, link, images }]);
//       }
//       alert("Project saved successfully!");
//       resetForm();
//       fetchProjects();
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   const handleDelete = async (id) => {
//     await supabase.from("projects").delete().eq("id", id);
//     fetchProjects();
//   };

//   const handleEdit = (project) => {
//     setEditingId(project.id);
//     setName(project.name);
//     setDescription(project.description);
//     setLink(project.link);
//     setImages(project.images);
//   };

//   const handleImageUpload = async (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const fileExt = file.name.split(".").pop();
//       const fileName = `${Math.random()}.${fileExt}`;
//       const { data, error } = await supabase.storage.from("project").upload(fileName, file);

//       if (error) {
//         alert(error.message);
//       } else {
//         const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/project/${fileName}`;
//         setImages([...images, imageUrl]);
//       }
//     }
//   };

//   const resetForm = () => {
//     setEditingId(null);
//     setName("");
//     setDescription("");
//     setLink("");
//     setImages([]);
//   };

//   return (
//     <div className="text-white container mx-auto px-6 py-8 bg-black min-h-screen flex flex-col items-center">
//       <h1 className="text-4xl font-bold mb-8">Admin Panel</h1>
//       <form onSubmit={handleSubmit} className="w-full max-w-lg bg-gray-900 p-6 rounded-lg shadow-lg">
//         <div className="mb-4">
//           <label className="block font-bold mb-2">Project Name</label>
//           <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-gray-500 bg-gray-800 text-white" required />
//         </div>
//         <div className="mb-4">
//           <label className="block font-bold mb-2">Description</label>
//           <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-gray-500 bg-gray-800 text-white" required></textarea>
//         </div>
//         <div className="mb-4">
//           <label className="block font-bold mb-2">Project Link</label>
//           <input type="url" value={link} onChange={(e) => setLink(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-gray-500 bg-gray-800 text-white" required />
//         </div>
//         <div className="mb-4">
//           <label className="block font-bold mb-2">Images</label>
//           <input type="file" onChange={handleImageUpload} accept="image/*" className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-gray-500 bg-gray-800 text-white" multiple />
//         </div>
//         <button type="submit" className="button-85 w-full">{editingId ? "Update Project" : "Add Project"}</button>
//       </form>

//       <div className="w-full max-w-2xl mt-8">
//         <h2 className="text-2xl font-bold mb-4">Projects</h2>
//         {projects.map((project) => (
//           <div key={project.id} className="bg-gray-800 p-4 rounded-lg shadow-md mb-4">
//             <h3 className="text-lg font-bold">{project.name}</h3>
//             <p>{project.description}</p>
//             <a href={project.link} target="_blank" className="text-blue-400 hover:underline">View Project</a>
//             <div className="flex space-x-4 mt-2">
//               <button onClick={() => handleEdit(project)} className="button-85">Edit</button>
//               <button onClick={() => handleDelete(project.id)} className="button-85 bg-red-600 hover:bg-red-700">Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// Updated: src/app/admin/page.js

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import css from "../components/button.css";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Admin() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [images, setImages] = useState([]);
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

    // Enable real-time updates
    const subscription = supabase
      .channel("realtime:projects")
      .on("postgres_changes", { event: "*", schema: "public", table: "projects" }, () => {
        fetchProjects();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
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
      if (editingId) {
        await supabase.from("projects").update({ name, description, link, images }).eq("id", editingId);
      } else {
        await supabase.from("projects").insert([{ name, description, link, images }]);
      }
      alert("Project saved successfully!");
      resetForm();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (id) => {
    await supabase.from("projects").delete().eq("id", id);
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setName(project.name);
    setDescription(project.description);
    setLink(project.link);
    setImages(project.images);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { data, error } = await supabase.storage.from("project").upload(fileName, file);

      if (error) {
        alert(error.message);
      } else {
        const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/project/${fileName}`;
        setImages([...images, imageUrl]);
      }
    }
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
        </div>
        <button type="submit" className="button-85 w-full">{editingId ? "Update Project" : "Add Project"}</button>
      </form>

      <div className="w-full max-w-2xl mt-8">
        <h2 className="text-2xl font-bold mb-4">Projects</h2>
        {projects.map((project) => (
          <div key={project.id} className="bg-gray-800 p-4 rounded-lg shadow-md mb-4">
            <h3 className="text-lg font-bold">{project.name}</h3>
            <p>{project.description}</p>
            <a href={project.link} target="_blank" className="text-blue-400 hover:underline">View Project</a>
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
