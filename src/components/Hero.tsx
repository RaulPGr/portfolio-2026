import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section id="inicio" className="cinematic-scene">
      <div className="glow-element w-96 h-96 bg-primary -top-20 -left-20"></div>
      <div className="glow-element w-[500px] h-[500px] bg-accent-purple bottom-0 right-0 opacity-10"></div>
      <div className="atmospheric-overlay"></div>

      <div className="scene-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl"
        >
          <span className="font-label text-secondary uppercase tracking-[0.5em] text-[10px] mb-8 block">
            Desarrollador web
          </span>
          <h1 className="font-headline text-6xl md:text-9xl font-extrabold tracking-[-0.04em] leading-[0.85] mb-10">
            Construyendo el futuro digital con <span className="text-primary italic">precisión</span> y <span className="text-secondary">propósito.</span>
          </h1>
          <p className="font-body text-xl md:text-2xl text-white/60 max-w-2xl leading-relaxed mb-12">
            Transformando conceptos en experiencias web de alto rendimiento. Especialista en arquitecturas escalables y diseño centrado en el usuario.
          </p>
          <div className="flex flex-wrap gap-8">
            <a
              href="#proyectos"
              className="bg-primary text-black px-10 py-5 rounded-full font-headline font-bold uppercase text-xs tracking-[0.2em] flex items-center gap-3 hover:scale-105 transition-transform"
            >
              Ver Proyectos
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="#contacto"
              className="border border-white/20 hover:border-secondary/50 text-white px-10 py-5 rounded-full font-headline font-bold uppercase text-xs tracking-[0.2em] transition-colors"
            >
              Hablemos
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
