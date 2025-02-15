import { createClient } from "@supabase/supabase-js"
import ProjectCard from "./components/ProjectCard"
import ContactSection from "./components/ContactSection"
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default async function Home() {
  const { data: projects } = await supabase.from("projects").select("*")

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-2xl font-extrabold text-center mb-10 text-blue-400">My Work</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects?.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <ContactSection />
    </div>
  )
}

