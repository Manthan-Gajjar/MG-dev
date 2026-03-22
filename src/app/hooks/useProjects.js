"use client";

import { useState, useEffect } from "react";

export default function useProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error.message);
      }
    };

    fetchProjects();
  }, []);

  return projects;
}
