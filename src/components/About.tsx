import { motion } from "motion/react";

export default function About() {
  return (
    <section id="sobre-mi" className="cinematic-scene">
      <div className="glow-element w-[800px] h-[800px] bg-deep-blue -bottom-1/2 -left-1/4 opacity-30"></div>
      <div className="scene-container">
        <div className="flex flex-col md:flex-row items-center gap-24">
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute -inset-10 bg-primary/5 blur-3xl rounded-full animate-pulse"></div>
              <motion.img
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative rounded-3xl w-full aspect-[4/5] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                src="img/raul.jpg"
                alt="Raúl Piqueras"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none mix-blend-overlay"></div>
            </div>
          </div>

          <div className="md:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-headline text-5xl font-extrabold tracking-tighter mb-10">Raúl Piqueras</h2>
              <div className="space-y-8 font-body text-white/70 leading-relaxed text-xl">
                <p>
                  Mi viaje en la tecnología no comenzó frente a un monitor, sino optimizando procesos en el mundo real. Hoy, me defino como un Desarrollador Junior especializado en IA y Automatización, capaz de unir la lógica del desarrollo Fullstack con la potencia de la inteligencia artificial generativa.                </p>
                <p>
                  No solo escribo código; diseño flujos de trabajo que ahorran tiempo y resuelven problemas reales. He pasado de gestionar equipos y logística a implementar arquitecturas con n8n y optimizar modelos LLM, aportando siempre un enfoque analítico y una búsqueda constante de la eficiencia técnica.                </p>
                <p>
                  Cuando no estoy frente a la terminal, me encontrarás explorando nuevas herramientas de I+D en IA o analizando datos. Mi mayor fuente de inspiración es transformar la complejidad en simplicidad a través de la tecnología.</p>
              </div>

              <div className="mt-16 flex items-center gap-12">
                <div>
                  <span className="block font-headline text-5xl font-bold text-primary mb-1">2+</span>
                  <span className="font-label text-[10px] uppercase tracking-widest opacity-60">Años de Exp.</span>
                </div>
                <div className="w-px h-12 bg-white/10"></div>
                <div>
                  <span className="block font-headline text-5xl font-bold text-secondary mb-1">5+</span>
                  <span className="font-label text-[10px] uppercase tracking-widest opacity-60">Proyectos</span>
                </div>
                <div className="w-px h-12 bg-white/10"></div>

              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
