import { useState, useEffect, useCallback } from 'react';
import { supabase, Project, ProjectInsert } from '../lib/supabase';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setProjects(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const createProject = async (projectData: ProjectInsert): Promise<{ error: string | null }> => {
    const { error } = await supabase.from('projects').insert([projectData]);
    if (error) return { error: error.message };
    await fetchProjects();
    return { error: null };
  };

  const updateProject = async (id: string, projectData: Partial<ProjectInsert>): Promise<{ error: string | null }> => {
    const { error } = await supabase.from('projects').update(projectData).eq('id', id);
    if (error) return { error: error.message };
    await fetchProjects();
    return { error: null };
  };

  const deleteProject = async (id: string): Promise<{ error: string | null }> => {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) return { error: error.message };
    await fetchProjects();
    return { error: null };
  };

  return { projects, loading, error, fetchProjects, createProject, updateProject, deleteProject };
}
