import ProjectCard from "./components/ProjectCard"
import ContactSection from "./components/ContactSection"
import AboutUs from "./components/About"
import dbConnect from "@/lib/mongodb"
import Project from "@/models/Project"

// Enable ISR: Revalidate the content every hour (or longer if work doesn't change often)
export const revalidate = 3600;

export default async function Home() {
  let projects = [];
  try {
    await dbConnect();

    // lean() returns plain JS objects, faster than Mongoose documents
    const projectsData = await Project.find({}).sort({ createdAt: -1 }).lean();

    // Map data to ensure it's fully serializable for Client Components
    projects = projectsData.map(p => ({
      ...p,
      id: p._id.toString(),
      _id: p._id.toString(),
      // Ensure all fields are standard serializable types
      createdAt: p.createdAt?.toISOString() || null,
      updatedAt: p.updatedAt?.toISOString() || null
    }));

  } catch (error) {
    console.error("Failed to fetch projects for Home page:", error);
    // Graceful fallback to empty array so the page still loads!
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <AboutUs />
      <div className="text-center mt-6 mb-16">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-white font-poppins">My Work</h2>
        <div className="w-16 sm:w-24 h-1 bg-blue-500 mx-auto"></div>
      </div>
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


