import Image from "next/image"

export default function ProjectModal({ project, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{project.name}</h2>
          <div className="mb-4">
            {project.images.map((image, index) => (
              <Image
                key={index}
                src={image || "/placeholder.svg"}
                alt={`${project.name} image ${index + 1}`}
                width={800}
                height={600}
                className="w-full h-auto mb-2"
              />
            ))}
          </div>
          <p className="text-gray-700 mb-4">{project.description}</p>
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            View Project
          </a>
          <button
            onClick={onClose}
            className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

