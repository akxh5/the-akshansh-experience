import { supabase } from "./supabase";

export interface SubmissionData {
  userId: string;
  authorEmail: string;
  title: string;
  authorName: string;
  content: string;
  mood: string[];
}

export const toggleLike = async (userId: string, poemSlug: string) => {
  if (!supabase) return { error: new Error("Supabase not initialized") };

  const { data: existingLike } = await supabase
    .from("likes")
    .select("id")
    .eq("user_id", userId)
    .eq("poem_slug", poemSlug)
    .maybeSingle();

  if (existingLike) {
    const { error } = await supabase
      .from("likes")
      .delete()
      .eq("id", existingLike.id);
    return { liked: false, error };
  } else {
    const { error } = await supabase
      .from("likes")
      .insert({ user_id: userId, poem_slug: poemSlug });
    return { liked: true, error };
  }
};

export const toggleSave = async (userId: string, poemSlug: string) => {
  if (!supabase) return { error: new Error("Supabase not initialized") };

  const { data: existingSave } = await supabase
    .from("saves")
    .select("id")
    .eq("user_id", userId)
    .eq("poem_slug", poemSlug)
    .maybeSingle();

  if (existingSave) {
    const { error } = await supabase
      .from("saves")
      .delete()
      .eq("id", existingSave.id);
    return { saved: false, error };
  } else {
    const { error } = await supabase
      .from("saves")
      .insert({ user_id: userId, poem_slug: poemSlug });
    return { saved: true, error };
  }
};

export const getLikeCount = async (poemSlug: string) => {
  if (!supabase) return { count: 0, error: null };
  const { count, error } = await supabase
    .from("likes")
    .select("id", { count: "exact", head: true })
    .eq("poem_slug", poemSlug);
  return { count: count || 0, error };
};

export const checkUserInteractions = async (userId: string, poemSlug: string) => {
  if (!supabase) return { liked: false, saved: false };
  
  const [likeRes, saveRes] = await Promise.all([
    supabase.from("likes").select("id").eq("user_id", userId).eq("poem_slug", poemSlug).maybeSingle(),
    supabase.from("saves").select("id").eq("user_id", userId).eq("poem_slug", poemSlug).maybeSingle()
  ]);

  return {
    liked: !!likeRes.data,
    saved: !!saveRes.data
  };
};

export const getUserLikes = async (userId: string) => {
  if (!supabase) return { data: [], error: null };
  return await supabase
    .from("likes")
    .select("poem_slug")
    .eq("user_id", userId);
};

export const getUserSaves = async (userId: string) => {
  if (!supabase) return { data: [], error: null };
  return await supabase
    .from("saves")
    .select("poem_slug")
    .eq("user_id", userId);
};

export const submitPoem = async (data: SubmissionData) => {
  if (!supabase) return { error: new Error("Supabase not initialized") };
  
  return await supabase
    .from("submissions")
    .insert({
      user_id: data.userId,
      author_email: data.authorEmail,
      title: data.title,
      author_name: data.authorName,
      content: data.content,
      mood: data.mood,
      status: "pending"
    });
};
