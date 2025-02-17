import Image from "next/image";

export default function ProjectModal({ project, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-lg">
        <div className="p-6 flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-4 text-center">{project.name}</h2>

          {/* Main Image Display */}
          {Array.isArray(project.images) && project.images.length > 0 ? (
            <div className="w-full flex flex-col items-center">
              <Image
                src={project.images[0] || "/placeholder.svg"}
                alt={`${project.name} main image`}
                width={900}
                height={500}
                className="rounded-lg object-cover mb-4 w-full max-h-[400px]"
              />

              {/* Thumbnail Images */}
              <div className="flex overflow-x-auto space-x-3 p-2">
                {project.images.slice(1).map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    width={120}
                    height={80}
                    className="rounded-md cursor-pointer hover:opacity-80 transition"
                  />
                ))}
              </div>
            </div>
          ) : (
            <Image
              src="/placeholder.svg"
              alt="Placeholder Image"
              width={900}
              height={500}
              className="rounded-lg object-cover mb-4 w-full max-h-[400px]"
            />
          )}

          <p className="text-gray-700 text-center text-lg my-4 px-4">{project.description}</p>

          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 font-semibold hover:underline mb-4"
          >
            View Project
          </a>

          <button
            onClick={onClose}
            className="button-85"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
