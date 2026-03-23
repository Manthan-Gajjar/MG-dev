import ProjectCard from "./components/ProjectCard"
import ContactSection from "./components/ContactSection"
import AboutUs from "./components/About"
import Services from "./components/Services"
import SectionHeading from "./components/SectionHeading"
import dbConnect from "@/lib/mongodb"
import Project from "@/models/Project"

// Enable ISR: Revalidate the content every hour
export const revalidate = 3600;

export default async function Home() {
  let projects = [];
  try {
    await dbConnect();
    const projectsData = await Project.find({}).sort({ createdAt: -1 }).lean();
    projects = projectsData.map(p => ({
      ...p,
      id: p._id.toString(),
      _id: p._id.toString(),
      createdAt: p.createdAt?.toISOString() || null,
      updatedAt: p.updatedAt?.toISOString() || null
    }));
  } catch (error) {
    console.error("Failed to fetch projects for Home page:", error);
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-8 md:py-12 relative overflow-hidden">
      <AboutUs />
      
      <div className="mt-20">
        <Services />
      </div>

      <SectionHeading 
        title="Selected" 
        highlight="Works" 
        gradientClass="from-purple-600 to-blue-600" 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects?.length > 0 ? (
          projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-gray-500">
            No projects available yet.
          </div>
        )}
      </div>
      <ContactSection />
    </div>
  )
}
