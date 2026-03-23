import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Project = {
  id: string;
  title: string;
  description: string | null;
  tags: string[];
  image_url: string | null;
  project_url: string | null;
  status: 'published' | 'draft' | 'archived';
  created_at: string;
  updated_at: string;
};

export type ProjectInsert = Omit<Project, 'id' | 'created_at' | 'updated_at'>;
