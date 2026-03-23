import { motion } from "motion/react";
import { Terminal, Zap, Cpu, Brain } from "lucide-react";

const skills = [
  { name: "Desarrollo Web (Full-stack)", level: 95 },
  { name: "Diseño UI/UX & Sistemas", level: 85 },
  { name: "IA & Automatización de Flujos", level: 80 }
];

const cards = [
  { icon: Terminal, title: "Clean Code", desc: "Arquitectura sólida y legible.", color: "primary" },
  { icon: Zap, title: "Performance", desc: "Webs rápidas por defecto.", color: "secondary", offset: true },
  { icon: Cpu, title: "Scalability", desc: "Sistemas que crecen contigo.", color: "primary", negative: true },
  { icon: Brain, title: "IA First", desc: "Integración de modelos LLM.", color: "secondary" }
];

export default function Skills() {
  return (
    <section id="habilidades" className="cinematic-scene bg-[#050510]">
      <div className="glow-element w-[400px] h-[400px] bg-accent-purple top-0 left-1/4"></div>
      <div className="scene-container">
        <div className="flex flex-col lg:flex-row gap-24 items-center">
          <div className="lg:w-1/2">
            <h2 className="font-headline text-5xl font-extrabold tracking-tighter mb-8">Ecosistema Tecnológico</h2>
            <p className="font-body text-white/60 text-xl leading-relaxed mb-12">
              Mi stack no es solo una lista de herramientas, es una metodología. Elijo tecnologías que permiten el equilibrio entre rendimiento, mantenibilidad y estética.
            </p>
            
            <div className="space-y-10">
              {skills.map((skill, index) => (
                <div key={index} className="group">
                  <div className="flex justify-between items-end mb-4">
                    <span className="font-label text-xs uppercase tracking-[0.3em] text-white">{skill.name}</span>
                    <span className="font-label text-xs text-secondary">{skill.level}%</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="h-full bg-secondary shadow-[0_0_15px_rgba(102,217,204,0.5)]"
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2 grid grid-cols-2 gap-6">
            {cards.map((card, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`glass-panel group hover:border-${card.color}/40 transition-all duration-500 ${card.offset ? 'mt-12' : ''} ${card.negative ? '-mt-12' : ''}`}
              >
                <card.icon className={`text-${card.color} w-10 h-10 mb-6 group-hover:scale-110 transition-transform`} />
                <h5 className="font-headline font-bold text-xl mb-3">{card.title}</h5>
                <p className="font-body text-xs text-white/50">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
