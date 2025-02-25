// "use client";

// import { useState, useEffect } from "react";
// import { createClient } from "@supabase/supabase-js";

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// );

// export default function useProjects() {
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     const fetchProjects = async () => {
//       const { data, error } = await supabase
//         .from("project")
//         .select("*")
//         .order("created_at", { ascending: false });

//       if (error) {
//         console.error("Error fetching project:", error.message);
//       } else {
//         setProjects(data);
//       }
//     };

//     fetchProjects();

//     // Real-time listener for new, updated, and deleted projects
//     const subscription = supabase
//       .channel("realtime:project")
//       .on(
//         "postgres_changes",
//         { event: "*", schema: "public", table: "project" },
//         () => {
//           fetchProjects(); // Refresh data on any change
//         }
//       )
//       .subscribe();

//     return () => {
//       supabase.removeChannel(subscription);
//     };
//   }, []);

//   return projects;
// }


"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import useProjects from "@/app/hooks/useProjects"; // Import the hook
import css from "../components/button.css";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Admin() {
  const projects = useProjects(); // Get projects from the hook
  // ... (other state and functions for handling add/edit/delete)

  return (
    <div className="text-white container mx-auto px-6 py-8 bg-black min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8">Admin Panel</h1>
      {/* Your project form goes here */}
      <div className="w-full max-w-2xl mt-8">
        <h2 className="text-2xl font-bold mb-4">Projects</h2>
        {projects.map((project) => (
          <div key={project.id} className="bg-gray-800 p-4 rounded-lg shadow-md mb-4">
            <h3 className="text-lg font-bold">{project.name}</h3>
            <p>{project.description}</p>
            <a href={project.link} target="_blank" className="text-blue-400 hover:underline">View Project</a>
            <div className="flex space-x-4 mt-2">
              <button onClick={() => {/* handle edit */}} className="button-85">Edit</button>
              <button onClick={() => {/* handle delete */}} className="button-85 bg-red-600 hover:bg-red-700">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
