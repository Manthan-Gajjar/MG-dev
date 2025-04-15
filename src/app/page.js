import { createClient } from "@supabase/supabase-js"
import ProjectCard from "./components/ProjectCard"
import ContactSection from "./components/ContactSection"
import AboutUs from "./components/About"
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default async function Home() {
  const { data: projects } = await supabase.from("projects").select("*")

  return (
    
    <div className="container mx-auto px-6 py-8">
      <AboutUs/>
      {/* <h1 className="text-2xl font-extrabold text-center mb-10 text-blue-400">My Work</h1> */}
      <div className="text-center mb-12">
          <h2 className="text-xl sm:text-1xl md:text-2xl font-bold mb-4 font-poppins">My Work</h2>
          <div className="w-16 sm:w-24 h-1 bg-blue-500 mx-auto"></div>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects?.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <ContactSection />
    </div>
  )
}

