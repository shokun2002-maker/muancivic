// src/lib/admin/issue-details.ts
// CRUD helpers for issue_principles and issue_updates (admin side)

import { createClient } from '@/lib/supabase/client';
/**
 * Returns a guaranteed non‑null Supabase client.
 * Throws if the client cannot be created.
 */
function getSupabaseClient() {
  const supabase = createClient();
  if (!supabase) {
    throw new Error('Supabase client is not available.');
  }
  return supabase;
}

// ---------- Issue Principles ----------
export async function getIssuePrinciples(issueId: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('issue_principles')
    .select('*')
    .eq('issue_id', issueId)
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return data as any[]; // rows contain id, issue_id, content, sort_order, created_at
}

export async function createIssuePrinciple(issueId: string, content: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('issue_principles')
    .insert({ issue_id: issueId, content, sort_order: 0 })
    .single();
  if (error) throw error;
  return data as any;
}

export async function updateIssuePrinciple(id: string, payload: { content?: string; sort_order?: number }) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('issue_principles')
    .update(payload)
    .eq('id', id)
    .single();
  if (error) throw error;
  return data as any;
}

export async function deleteIssuePrinciple(id: string) {
  const supabase = getSupabaseClient();
  const { error } = await supabase.from('issue_principles').delete().eq('id', id);
  if (error) throw error;
  return true;
}

// ---------- Issue Updates ----------
export async function getIssueUpdates(issueId: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('issue_updates')
    .select('*')
    .eq('issue_id', issueId)
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return data as any[];
}

export async function createIssueUpdate(issueId: string, eventDate: string, title: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('issue_updates')
    .insert({ issue_id: issueId, event_date: eventDate, title, sort_order: 0 })
    .single();
  if (error) throw error;
  return data as any;
}

export async function updateIssueUpdate(id: string, payload: { event_date?: string; title?: string; sort_order?: number }) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('issue_updates')
    .update(payload)
    .eq('id', id)
    .single();
  if (error) throw error;
  return data as any;
}

export async function deleteIssueUpdate(id: string) {
  const supabase = getSupabaseClient();
  const { error } = await supabase.from('issue_updates').delete().eq('id', id);
  if (error) throw error;
  return true;
}
