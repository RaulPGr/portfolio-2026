export default function Footer() {
  return (
    <footer className="bg-[#05050a] w-full py-16 px-6 lg:px-[8.5rem] border-t border-white/5">
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-[1440px] mx-auto gap-12">
        <div className="font-headline font-bold text-white text-2xl tracking-tighter">
          Raúl Piqueras
        </div>
        <p className="font-body text-sm opacity-40 text-center md:text-left">
          Raúl Piqueras — Desarrollador web. Todos los derechos reservados.
        </p>
        <div className="flex gap-10">
          <a className="text-white/60 hover:text-secondary transition-colors font-label text-[10px] uppercase tracking-[0.2em]" href="https://www.linkedin.com/in/raulpiquerasgarcia/">LinkedIn</a>
          {/*<a className="text-white/60 hover:text-secondary transition-colors font-label text-[10px] uppercase tracking-[0.2em]" href="#">GitHub</a>
          <a className="text-white/60 hover:text-secondary transition-colors font-label text-[10px] uppercase tracking-[0.2em]" href="#">Twitter</a>
          <a className="text-white/60 hover:text-secondary transition-colors font-label text-[10px] uppercase tracking-[0.2em]" href="#">Email</a>
        */}
        </div>
      </div>
    </footer>
  );
}
