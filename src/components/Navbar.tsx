export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#05050a]/40 backdrop-blur-md border-b border-white/5">
      <div className="flex justify-between items-center px-6 lg:px-[8.5rem] py-5 w-full max-w-[1440px] mx-auto">
        <div className="text-xl font-black tracking-tighter text-primary font-headline">
          Raúl Piqueras
        </div>
        <div className="hidden md:flex gap-10 items-center">
          <a className="font-label tracking-widest text-[10px] uppercase text-white/60 hover:text-primary transition-colors" href="#inicio">Inicio</a>
          <a className="font-label tracking-widest text-[10px] uppercase text-white/60 hover:text-primary transition-colors" href="#experiencia">Experiencia</a>
          <a className="font-label tracking-widest text-[10px] uppercase text-white/60 hover:text-primary transition-colors" href="#proyectos">Proyectos</a>
          <a className="font-label tracking-widest text-[10px] uppercase text-white/60 hover:text-primary transition-colors" href="#habilidades">Habilidades</a>
          <a className="font-label tracking-widest text-[10px] uppercase text-white/60 hover:text-primary transition-colors" href="#sobre-mi">Sobre Mí</a>
          <a className="font-label tracking-widest text-[10px] uppercase text-white/60 hover:text-primary transition-colors" href="#contacto">Contacto</a>
        </div>
      </div>
    </nav>
  );
}
