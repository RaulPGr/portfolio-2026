import { motion } from "motion/react";
import { ArrowRight, Loader2 } from "lucide-react";
import { useProjects } from "../hooks/useProjects";

export default function Projects() {
  const { projects, loading } = useProjects();

  return (
    <section id="proyectos" className="cinematic-scene">
      <div className="scene-container">
        <div className="mb-16">
          <h2 className="font-headline text-5xl font-extrabold tracking-tighter mb-4">Proyectos Destacados</h2>
          <p className="font-body text-white/50 text-xl">Conceptualización y ejecución de vanguardia.</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-24 text-white/30 font-body">
            <p className="text-xl">No hay proyectos publicados todavía.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects
              .filter((p) => p.status === 'published')
              .map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative h-[614px] overflow-hidden rounded-2xl cursor-pointer"
                >
                  {project.image_url ? (
                    <img
                      className="absolute inset-0 z-0 transition-all duration-1000 scale-105 group-hover:scale-110 object-cover w-full h-full"
                      src={project.image_url}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="absolute inset-0 z-0 bg-gradient-to-br from-deep-purple to-deep-green" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05050a] via-transparent to-transparent opacity-80 transition-opacity duration-700" />

                  <div className="absolute bottom-0 p-8 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="font-label text-[10px] uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full backdrop-blur-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h4 className="font-headline text-2xl font-bold mb-2">{project.title}</h4>
                    <p className="font-body text-sm text-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {project.description}
                    </p>
                    {project.project_url && (
                      <a
                        href={project.project_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 flex items-center text-secondary font-label text-[10px] tracking-widest uppercase font-bold group/link"
                      >
                        Ver Proyecto
                        <ArrowRight className="w-3 h-3 ml-2 group-hover/link:translate-x-1 transition-transform" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
          </div>
        )}
      </div>
    </section>
  );
}
