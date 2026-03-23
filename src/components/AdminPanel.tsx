import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard, FolderHeart, Plus, LogOut, Search,
  ChevronLeft, ChevronRight, Pencil, Trash2, X, Loader2,
  CheckCircle, AlertCircle, ExternalLink, ImageIcon
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useProjects } from "../hooks/useProjects";
import { Project, ProjectInsert } from "../lib/supabase";

// ─── Toast ──────────────────────────────────────────────────────────────────
type ToastProps = { message: string; type: 'success' | 'error' };
function Toast({ message, type }: ToastProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl border backdrop-blur-md font-body text-sm
        ${type === 'success'
          ? 'bg-secondary/10 border-secondary/20 text-secondary'
          : 'bg-red-500/10 border-red-500/20 text-red-400'}`}
    >
      {type === 'success'
        ? <CheckCircle className="w-4 h-4 shrink-0" />
        : <AlertCircle className="w-4 h-4 shrink-0" />}
      {message}
    </motion.div>
  );
}

// ─── Modal Confirmación ───────────────────────────────────────────────────────
function DeleteModal({ projectName, onConfirm, onCancel, loading }: {
  projectName: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onCancel} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative z-10 bg-[#0e0e0e] border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl"
      >
        <h3 className="font-headline text-xl font-bold text-white mb-3">¿Eliminar proyecto?</h3>
        <p className="font-body text-white/50 mb-6 text-sm leading-relaxed">
          Vas a eliminar <span className="text-white font-medium">"{projectName}"</span>. Esta acción no se puede deshacer.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 border border-white/10 text-white/60 hover:text-white py-3 rounded-lg font-label text-sm tracking-wide transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 bg-red-500/80 hover:bg-red-500 text-white py-3 rounded-lg font-label text-sm tracking-wide transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
            Eliminar
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Modal Formulario Proyecto ─────────────────────────────────────────────────
const STATUS_OPTIONS = [
  { value: 'published', label: 'Publicado' },
  { value: 'draft', label: 'Borrador' },
  { value: 'archived', label: 'Archivado' },
];

const EMPTY_FORM: ProjectInsert = {
  title: '',
  description: '',
  tags: [],
  image_url: '',
  project_url: '',
  status: 'published',
};

function ProjectModal({ project, onSave, onClose, loading }: {
  project: Project | null;
  onSave: (data: ProjectInsert) => Promise<void>;
  onClose: () => void;
  loading: boolean;
}) {
  const isEdit = project !== null;
  const [form, setForm] = useState<ProjectInsert>(
    project
      ? { title: project.title, description: project.description || '', tags: project.tags, image_url: project.image_url || '', project_url: project.project_url || '', status: project.status }
      : EMPTY_FORM
  );
  const [tagsInput, setTagsInput] = useState(project?.tags.join(', ') ?? '');
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setFormError('El título es obligatorio.');
      return;
    }
    setFormError(null);
    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    await onSave({ ...form, tags });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative z-10 bg-[#0e0e0e] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        <div className="flex items-center justify-between p-8 border-b border-white/5">
          <div>
            <h3 className="font-headline text-2xl font-bold text-white">
              {isEdit ? 'Editar Proyecto' : 'Nuevo Proyecto'}
            </h3>
            <p className="font-body text-xs text-white/40 mt-1">
              {isEdit ? 'Modifica los datos del proyecto.' : 'Rellena el formulario para añadir un nuevo proyecto.'}
            </p>
          </div>
          <button onClick={onClose} className="p-2 text-white/40 hover:text-white transition-colors rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {formError && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-center gap-3">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <p className="text-red-400 text-sm">{formError}</p>
            </div>
          )}

          {/* Título */}
          <div>
            <label className="font-label text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2 block">
              Título *
            </label>
            <input
              type="text"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              placeholder="Nombre del proyecto"
              className="w-full bg-white/5 border border-white/10 focus:border-primary/50 rounded-lg px-4 py-3 font-body text-white placeholder:text-white/20 outline-none transition-colors"
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="font-label text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2 block">
              Descripción
            </label>
            <textarea
              value={form.description || ''}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="Describe el proyecto..."
              rows={3}
              className="w-full bg-white/5 border border-white/10 focus:border-primary/50 rounded-lg px-4 py-3 font-body text-white placeholder:text-white/20 outline-none transition-colors resize-none"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="font-label text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2 block">
              Tecnologías (separadas por coma)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={e => setTagsInput(e.target.value)}
              placeholder="React, Supabase, TypeScript"
              className="w-full bg-white/5 border border-white/10 focus:border-primary/50 rounded-lg px-4 py-3 font-body text-white placeholder:text-white/20 outline-none transition-colors"
            />
          </div>

          {/* URL imagen */}
          <div>
            <label className="font-label text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2 block">
              URL de Imagen
            </label>
            <div className="relative">
              <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="url"
                value={form.image_url || ''}
                onChange={e => setForm({ ...form, image_url: e.target.value })}
                placeholder="https://..."
                className="w-full bg-white/5 border border-white/10 focus:border-primary/50 rounded-lg px-4 py-3 pl-12 font-body text-white placeholder:text-white/20 outline-none transition-colors"
              />
            </div>
            {form.image_url && (
              <div className="mt-3 rounded-lg overflow-hidden h-32 bg-white/5">
                <img src={form.image_url} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            )}
          </div>

          {/* URL proyecto */}
          <div>
            <label className="font-label text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2 block">
              URL del Proyecto
            </label>
            <div className="relative">
              <ExternalLink className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="url"
                value={form.project_url || ''}
                onChange={e => setForm({ ...form, project_url: e.target.value })}
                placeholder="https://..."
                className="w-full bg-white/5 border border-white/10 focus:border-primary/50 rounded-lg px-4 py-3 pl-12 font-body text-white placeholder:text-white/20 outline-none transition-colors"
              />
            </div>
          </div>

          {/* Estado */}
          <div>
            <label className="font-label text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2 block">
              Estado
            </label>
            <div className="flex gap-3">
              {STATUS_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setForm({ ...form, status: opt.value as Project['status'] })}
                  className={`flex-1 py-3 rounded-lg font-label text-xs uppercase tracking-wider transition-all border
                    ${form.status === opt.value
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-white/10 text-white/40 hover:border-white/20'}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-white/10 text-white/60 hover:text-white py-3 rounded-lg font-label text-sm tracking-wide transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 primary-gradient text-black py-3 rounded-lg font-headline font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {isEdit ? 'Guardar Cambios' : 'Crear Proyecto'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// ─── Status Badge ───────────────────────────────────────────────────────────
const STATUS_COLORS: Record<string, { dot: string; label: string }> = {
  published: { dot: 'bg-secondary shadow-[0_0_8px_rgba(102,217,204,0.8)]', label: 'Publicado' },
  draft: { dot: 'bg-white/40', label: 'Borrador' },
  archived: { dot: 'bg-red-500', label: 'Archivado' },
};

// ─── Admin Panel Principal ─────────────────────────────────────────────────────
const PAGE_SIZE = 8;

export default function AdminPanel({ onBack }: { onBack: () => void }) {
  const { user, signOut } = useAuth();
  const { projects, loading, createProject, updateProject, deleteProject } = useProjects();

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [modal, setModal] = useState<'create' | 'edit' | 'delete' | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState<ToastProps | null>(null);
  const [toastKey, setToastKey] = useState(0);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setToastKey(k => k + 1);
    setTimeout(() => setToast(null), 3500);
  };

  const filtered = useMemo(() => {
    if (!search.trim()) return projects;
    const q = search.toLowerCase();
    return projects.filter(p =>
      p.title.toLowerCase().includes(q) ||
      (p.description?.toLowerCase() ?? '').includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  }, [projects, search]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const handleCreate = async (data: ProjectInsert) => {
    setActionLoading(true);
    const { error } = await createProject(data);
    setActionLoading(false);
    if (error) {
      showToast('Error al crear el proyecto.', 'error');
    } else {
      setModal(null);
      showToast('Proyecto creado correctamente.', 'success');
    }
  };

  const handleEdit = async (data: ProjectInsert) => {
    if (!selectedProject) return;
    setActionLoading(true);
    const { error } = await updateProject(selectedProject.id, data);
    setActionLoading(false);
    if (error) {
      showToast('Error al actualizar el proyecto.', 'error');
    } else {
      setModal(null);
      setSelectedProject(null);
      showToast('Proyecto actualizado correctamente.', 'success');
    }
  };

  const handleDelete = async () => {
    if (!selectedProject) return;
    setActionLoading(true);
    const { error } = await deleteProject(selectedProject.id);
    setActionLoading(false);
    if (error) {
      showToast('Error al eliminar el proyecto.', 'error');
    } else {
      setModal(null);
      setSelectedProject(null);
      showToast('Proyecto eliminado correctamente.', 'success');
    }
  };

  const handleLogout = async () => {
    await signOut();
    onBack();
  };

  return (
    <div className="flex min-h-screen bg-[#05050a]">
      {/* Sidebar */}
      <aside className="h-screen w-64 fixed left-0 top-0 bg-[#0e0e0e] border-r border-white/5 flex flex-col py-8 z-50">
        <div className="px-6 mb-10">
          <h1 className="text-xl font-bold text-primary font-headline tracking-tighter">Panel Admin</h1>
          <div className="flex items-center gap-3 mt-6 p-3 bg-[#131313] rounded-lg">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold font-headline text-sm">
              {user?.email?.[0]?.toUpperCase() ?? 'A'}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-white font-headline truncate">Raúl Piqueras</p>
              <p className="text-[10px] uppercase tracking-wider text-white/40 font-label truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          <a className="flex items-center gap-4 px-6 py-3 text-white/60 hover:bg-[#131313] hover:text-white font-label text-sm tracking-tight transition-colors duration-200" href="#">
            <LayoutDashboard className="w-4 h-4" />
            <span>Panel Control</span>
          </a>
          <a className="flex items-center gap-4 px-6 py-3 bg-[#131313] text-secondary border-l-4 border-secondary font-label text-sm tracking-tight" href="#">
            <FolderHeart className="w-4 h-4" />
            <span>Mis Proyectos</span>
          </a>
        </nav>

        <div className="px-6 mt-auto">
          <button
            onClick={() => setModal('create')}
            className="w-full primary-gradient text-black py-3 px-4 rounded-md font-headline font-bold text-sm shadow-lg hover:shadow-primary/10 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Nuevo Proyecto
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 px-0 py-3 mt-6 text-white/60 hover:text-white font-label text-sm tracking-tight transition-colors duration-200 w-full"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="pl-64 flex-1">
        <div className="max-w-[1440px] mx-auto px-12 py-12">
          <header className="mb-12 flex justify-between items-end">
            <div>
              <span className="text-secondary font-label text-xs uppercase tracking-[0.2em] mb-2 block">
                Repositorio de Trabajo
              </span>
              <h2 className="text-4xl font-headline font-extrabold tracking-[-0.04em] text-white">
                Mis Proyectos
              </h2>
            </div>
            <div className="flex gap-4">
              <div className="bg-[#131313] px-4 py-2 flex items-center gap-3 border-b border-white/10">
                <Search className="text-white/40 w-4 h-4" />
                <input
                  className="bg-transparent border-none focus:ring-0 text-sm font-body w-48 text-white placeholder:text-white/20 outline-none"
                  placeholder="Buscar proyecto..."
                  type="text"
                  value={search}
                  onChange={e => { setSearch(e.target.value); setPage(0); }}
                />
              </div>
            </div>
          </header>

          {/* Stats */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {[
              { label: 'Total Proyectos', value: projects.length.toString(), color: 'primary' },
              { label: 'Publicados', value: projects.filter(p => p.status === 'published').length.toString(), color: 'secondary' },
              { label: 'Borradores', value: projects.filter(p => p.status === 'draft').length.toString(), color: 'white' },
              { label: 'Archivados', value: projects.filter(p => p.status === 'archived').length.toString(), color: 'primary' },
            ].map((stat, i) => (
              <div key={i} className="bg-[#131313] p-6 transition-transform duration-300 hover:scale-[1.02] border border-white/5">
                <p className="text-white/40 text-xs font-label uppercase tracking-widest mb-1">{stat.label}</p>
                <p className={`text-3xl font-headline font-bold ${stat.color === 'white' ? 'text-white' : stat.color === 'primary' ? 'text-primary' : 'text-secondary'}`}>
                  {stat.value}
                </p>
              </div>
            ))}
          </section>

          {/* Table */}
          <section className="bg-[#131313] overflow-hidden border border-white/5">
            {loading ? (
              <div className="flex items-center justify-center py-24">
                <Loader2 className="w-6 h-6 text-primary animate-spin" />
              </div>
            ) : paginated.length === 0 ? (
              <div className="text-center py-24 text-white/30 font-body">
                <p>{search ? 'No se encontraron proyectos.' : 'No hay proyectos. ¡Crea el primero!'}</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#1a1a1a] border-b border-white/5">
                    <th className="px-8 py-5 text-xs font-label uppercase tracking-widest text-white/40">Proyecto</th>
                    <th className="px-8 py-5 text-xs font-label uppercase tracking-widest text-white/40">Tecnologías</th>
                    <th className="px-8 py-5 text-xs font-label uppercase tracking-widest text-white/40">Estado</th>
                    <th className="px-8 py-5 text-xs font-label uppercase tracking-widest text-white/40 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {paginated.map((p) => {
                    const st = STATUS_COLORS[p.status] ?? STATUS_COLORS.draft;
                    return (
                      <tr key={p.id} className="hover:bg-[#1a1a1a] transition-colors duration-150 group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#202020] flex items-center justify-center overflow-hidden rounded shrink-0">
                              {p.image_url
                                ? <img alt={p.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" src={p.image_url} referrerPolicy="no-referrer" />
                                : <FolderHeart className="w-5 h-5 text-white/20" />}
                            </div>
                            <div className="min-w-0">
                              <p className="font-headline font-bold text-white truncate">{p.title}</p>
                              <p className="text-xs text-white/40 font-body truncate max-w-[240px]">{p.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex flex-wrap gap-2">
                            {p.tags.slice(0, 3).map((t, j) => (
                              <span key={j} className="text-[10px] font-label px-2 py-1 bg-white/5 text-secondary">{t}</span>
                            ))}
                            {p.tags.length > 3 && (
                              <span className="text-[10px] font-label px-2 py-1 bg-white/5 text-white/40">+{p.tags.length - 3}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${st.dot}`} />
                            <span className="text-xs font-medium text-white">{st.label}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex justify-end gap-3">
                            <button
                              onClick={() => { setSelectedProject(p); setModal('edit'); }}
                              className="p-2 text-primary/60 hover:text-primary hover:bg-primary/10 rounded transition-all"
                              title="Editar"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => { setSelectedProject(p); setModal('delete'); }}
                              className="p-2 text-red-500/60 hover:text-red-500 hover:bg-red-500/10 rounded transition-all"
                              title="Eliminar"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}

            {/* Paginación */}
            {totalPages > 1 && (
              <footer className="px-8 py-4 bg-[#1a1a1a] flex justify-between items-center border-t border-white/5">
                <p className="text-[10px] font-label text-white/40 uppercase tracking-widest">
                  Mostrando {Math.min(page * PAGE_SIZE + 1, filtered.length)}–{Math.min((page + 1) * PAGE_SIZE, filtered.length)} de {filtered.length} proyectos
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(p => Math.max(0, p - 1))}
                    disabled={page === 0}
                    className="p-2 bg-[#202020] text-white/40 hover:text-secondary disabled:opacity-30 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                    disabled={page === totalPages - 1}
                    className="p-2 bg-[#202020] text-white/40 hover:text-secondary disabled:opacity-30 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </footer>
            )}
          </section>
        </div>
      </main>

      {/* Modales */}
      <AnimatePresence>
        {modal === 'create' && (
          <ProjectModal
            project={null}
            onSave={handleCreate}
            onClose={() => setModal(null)}
            loading={actionLoading}
          />
        )}
        {modal === 'edit' && selectedProject && (
          <ProjectModal
            project={selectedProject}
            onSave={handleEdit}
            onClose={() => { setModal(null); setSelectedProject(null); }}
            loading={actionLoading}
          />
        )}
        {modal === 'delete' && selectedProject && (
          <DeleteModal
            projectName={selectedProject.title}
            onConfirm={handleDelete}
            onCancel={() => { setModal(null); setSelectedProject(null); }}
            loading={actionLoading}
          />
        )}
        {toast && <React.Fragment key={toastKey}><Toast message={toast.message} type={toast.type} /></React.Fragment>}
      </AnimatePresence>
    </div>
  );
}
