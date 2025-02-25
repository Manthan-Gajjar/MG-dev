"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function useProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("project") // ✅ Ensure correct table name
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching projects:", error.message);
      } else {
        setProjects(data);
      }
    };

    fetchProjects();

    // ✅ Ensure real-time works on Vercel
    const channel = supabase
      .channel("realtime:project")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "project" },
        (payload) => {
          console.log("🔄 Realtime update:", payload);
          fetchProjects(); // Fetch new data on change
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []); // ✅ Empty dependency array to prevent infinite calls

  return projects;
}
