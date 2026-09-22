import { promises as fs } from "fs";
import path from "path";

export type Post = {
  id: string;
  title: string;
  author: string;
  content: string;
  createdAt: string;
  views: number;
};

const DATA_FILE = path.join(process.cwd(), "data", "posts.json");

async function readPosts(): Promise<Post[]> {
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(raw) as Post[];
}

async function writePosts(posts: Post[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(posts, null, 2), "utf-8");
}

export async function getPosts(query?: string): Promise<Post[]> {
  const posts = await readPosts();
  const sorted = [...posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  if (!query) return sorted;
  const q = query.toLowerCase();
  return sorted.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.content.toLowerCase().includes(q) ||
      p.author.toLowerCase().includes(q)
  );
}

export async function getPost(id: string): Promise<Post | undefined> {
  const posts = await readPosts();
  return posts.find((p) => p.id === id);
}

export async function createPost(input: {
  title: string;
  author: string;
  content: string;
}): Promise<Post> {
  const posts = await readPosts();
  const newPost: Post = {
    id: Date.now().toString(),
    title: input.title,
    author: input.author,
    content: input.content,
    createdAt: new Date().toISOString(),
    views: 0,
  };
  posts.push(newPost);
  await writePosts(posts);
  return newPost;
}

export async function updatePost(
  id: string,
  input: { title: string; author: string; content: string }
): Promise<Post | undefined> {
  const posts = await readPosts();
  const idx = posts.findIndex((p) => p.id === id);
  if (idx === -1) return undefined;
  posts[idx] = { ...posts[idx], ...input };
  await writePosts(posts);
  return posts[idx];
}

export async function deletePost(id: string): Promise<void> {
  const posts = await readPosts();
  await writePosts(posts.filter((p) => p.id !== id));
}

export async function incrementViews(id: string): Promise<void> {
  const posts = await readPosts();
  const idx = posts.findIndex((p) => p.id === id);
  if (idx === -1) return;
  posts[idx].views += 1;
  await writePosts(posts);
}
