"use client"

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
  const [images, setImages] = useState([]);
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
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from("projects")
        .insert([{ name, description, link, images }]);
      if (error) throw error;
      alert("Project added successfully!");
      setName("");
      setDescription("");
      setLink("");
      setImages([]);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const fileExt = file.name.split(".").pop()
      const fileName = `${Math.random()}.${fileExt}`
      
      const { data, error } = await supabase.storage.from("project").upload(fileName, file)
  
      if (error) {
        alert(error.message)
      } else {
        // Fetch the public URL correctly
        const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/project/${fileName}`
        setImages([...images, imageUrl])
      }
    }
  }
  

  return (
    <div className="text-black container mx-auto px-6 py-8 bg-gradient-to-r from-purple-500 to-indigo-600 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-white">Add New Project</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-800 font-bold mb-2">
            Project Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-800 font-bold mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="link" className="block text-gray-800 font-bold mb-2">
            Project Link
          </label>
          <input
            type="url"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="images" className="block text-gray-800 font-bold mb-2">
            Images
          </label>
          <input
            type="file"
            id="images"
            onChange={handleImageUpload}
            accept="image/*"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            multiple
          />
        </div>
        <div className="mb-4 flex flex-wrap gap-2">
          {images.map((image, index) => (
            <img
              key={index}
              src={image || "/placeholder.svg"}
              alt={`Project image ${index + 1}`}
              className="w-24 h-24 object-cover rounded-md border shadow-sm"
            />
          ))}
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300"
        >
          Add Project
        </button>
      </form>
    </div>
  );
}