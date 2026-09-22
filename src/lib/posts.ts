import { supabase } from "@/lib/supabase";

export type Post = {
  id: string;
  title: string;
  author: string;
  content: string;
  createdAt: string;
  views: number;
};

type PostRow = {
  id: number;
  title: string;
  author: string;
  content: string;
  created_at: string;
  views: number;
};

function mapRow(row: PostRow): Post {
  return {
    id: String(row.id),
    title: row.title,
    author: row.author,
    content: row.content,
    createdAt: row.created_at,
    views: row.views,
  };
}

export async function getPosts(query?: string): Promise<Post[]> {
  let request = supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (query) {
    const escaped = query.replace(/[%,]/g, "");
    request = request.or(
      `title.ilike.%${escaped}%,content.ilike.%${escaped}%,author.ilike.%${escaped}%`
    );
  }

  const { data, error } = await request;
  if (error) throw new Error(error.message);
  return (data as PostRow[]).map(mapRow);
}

export async function getPost(id: string): Promise<Post | undefined> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data ? mapRow(data as PostRow) : undefined;
}

export async function createPost(input: {
  title: string;
  author: string;
  content: string;
}): Promise<Post> {
  const { data, error } = await supabase
    .from("posts")
    .insert(input)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return mapRow(data as PostRow);
}

export async function updatePost(
  id: string,
  input: { title: string; author: string; content: string }
): Promise<Post | undefined> {
  const { data, error } = await supabase
    .from("posts")
    .update(input)
    .eq("id", id)
    .select()
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data ? mapRow(data as PostRow) : undefined;
}

export async function deletePost(id: string): Promise<void> {
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function incrementViews(id: string): Promise<void> {
  const { data } = await supabase
    .from("posts")
    .select("views")
    .eq("id", id)
    .maybeSingle();
  if (!data) return;
  await supabase
    .from("posts")
    .update({ views: (data as { views: number }).views + 1 })
    .eq("id", id);
}
