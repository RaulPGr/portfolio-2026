import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Linkedin, Check } from "lucide-react";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleEmailClick = () => {
    navigator.clipboard.writeText("raulpiquerasgarcia0@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    // Intentar abrir el cliente de correo también
    window.location.href = "mailto:raulpiquerasgarcia0@gmail.com";
  };

  return (
    <section id="contacto" className="cinematic-scene bg-deep-blue/30">
      <div className="atmospheric-overlay opacity-40"></div>
      <div className="scene-container max-w-5xl">
        <div className="text-center mb-20 relative z-10">
          <h2 className="font-headline text-6xl font-extrabold tracking-tighter mb-6">¿Hablamos de tu próximo proyecto?</h2>
          <p className="font-body text-white/50 text-xl">Actualmente aceptando nuevas colaboraciones y consultorías estratégicas.</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center relative z-10 mt-12">
          <motion.button 
            onClick={handleEmailClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full md:w-auto bg-primary text-black px-10 py-5 rounded-full font-headline font-bold uppercase text-sm tracking-[0.2em] hover:shadow-[0_0_30px_rgba(176,198,255,0.4)] transition-all flex items-center justify-center gap-4" 
          >
            {copied ? <Check className="w-5 h-5" /> : <Mail className="w-5 h-5" />}
            {copied ? "¡Correo copiado!" : "Escríbeme"}
          </motion.button>
          
          <motion.a 
            href="https://www.linkedin.com/in/raulpiquerasgarcia/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full md:w-auto bg-transparent border-2 border-primary text-primary px-10 py-5 rounded-full font-headline font-bold uppercase text-sm tracking-[0.2em] hover:bg-primary/10 transition-all flex items-center justify-center gap-4" 
          >
            <Linkedin className="w-5 h-5" />
            LinkedIn
          </motion.a>
        </div>
      </div>
    </section>
  );
}
