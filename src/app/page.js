import ProjectCard from "./components/ProjectCard"
import ContactSection from "./components/ContactSection"
import AboutUs from "./components/About"
import dbConnect from "@/lib/mongodb"
import Project from "@/models/Project"

export const dynamic = "force-dynamic";

export default async function Home() {
  let projects = [];
  try {
    await dbConnect();
    const projectsData = await Project.find({}).sort({ createdAt: -1 });
    // Convert Mongoose documents to plain objects specifically for Next.js Client Components
    projects = JSON.parse(JSON.stringify(projectsData)).map(p => ({
      ...p,
      id: p._id // JSON stringify already converted _id to string
    }));
  } catch (error) {
    console.error("Failed to connect to Database or fetch projects:", error);
    // Graceful fallback to empty array so the page still loads!
  }

  return (
    
    <div className="container mx-auto px-6 py-8">
      <AboutUs/>
      {/* <h1 className="text-2xl font-extrabold text-center mb-10 text-blue-400">My Work</h1> */}
      <div className="text-center mb-12">
          <h2 className="text-xl sm:text-1xl md:text-2xl font-bold mb-4 text-white font-poppins">My Work</h2>
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

