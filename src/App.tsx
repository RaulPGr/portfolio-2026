import { useState } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminPanel from "./components/AdminPanel";
import Login from "./components/Login";

function AppContent() {
  const { session, loading } = useAuth();
  const [showAdmin, setShowAdmin] = useState(() => window.location.pathname === '/login');

  // Mientras carga la sesión, mostramos pantalla en blanco
  if (loading) {
    return (
      <div className="min-h-screen bg-[#05050a] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  // Si quieren acceder al admin pero no están autenticados → Login
  if (showAdmin && !session) {
    return <Login onSuccess={() => {}} />;
  }

  // Si están autenticados y quieren ver el admin → AdminPanel
  if (showAdmin && session) {
    return <AdminPanel onBack={() => setShowAdmin(false)} />;
  }

  // Vista pública
  return (
    <div className="selection:bg-secondary selection:text-[#003732]">
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
