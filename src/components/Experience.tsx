import { motion } from "motion/react";

const experiences = [
  {
    period: "2025 — Presente",
    role: " Desarrollador de Soluciones IA",
    company: "Prosoftom",
    description: "Prompt Engineering. Exploración y Automatización. I+D en IA",
    active: true
  },
  {
    period: "2024 — 2025",
    role: "Prácticas de Desarrollo Web",
    company: "NTT DATA",
    description: "Gestión y análisis de datos. Soporte técnico",
    active: false
  }
];

export default function Experience() {
  return (
    <section id="experiencia" className="cinematic-scene bg-[#080810]">
      <div className="glow-element w-[600px] h-[600px] bg-deep-green top-1/4 -right-1/4"></div>
      <div className="scene-container">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/3">
            <h2 className="font-headline text-5xl font-extrabold tracking-tighter mb-6">Experiencia Profesional</h2>
            <p className="font-body text-white/50 text-lg">Refinando el arte del desarrollo web.</p>
          </div>

          <div className="lg:w-2/3 space-y-24 border-l border-white/10 pl-12 relative">
            <div className="absolute left-[-1px] top-0 w-[2px] h-full bg-gradient-to-b from-primary via-secondary to-transparent"></div>

            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className={`absolute -left-[53px] top-2 w-2 h-2 rounded-full ${exp.active ? 'bg-primary shadow-[0_0_15px_rgba(176,198,255,1)]' : 'bg-white/20'}`}></div>
                <span className="font-label text-secondary text-xs tracking-widest mb-3 block">{exp.period}</span>
                <h3 className="font-headline text-3xl font-bold mb-2">{exp.role}</h3>
                <p className="font-body text-primary text-lg mb-6">{exp.company}</p>
                <p className="font-body text-white/60 leading-relaxed text-lg">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
