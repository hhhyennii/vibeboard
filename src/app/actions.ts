"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createPost, deletePost, updatePost } from "@/lib/posts";

export async function createPostAction(formData: FormData) {
  const title = (formData.get("title") as string)?.trim();
  const author = (formData.get("author") as string)?.trim();
  const content = (formData.get("content") as string)?.trim();

  if (!title || !author || !content) {
    throw new Error("모든 항목을 입력해주세요.");
  }

  const post = await createPost({ title, author, content });
  revalidatePath("/");
  redirect(`/posts/${post.id}`);
}

export async function updatePostAction(id: string, formData: FormData) {
  const title = (formData.get("title") as string)?.trim();
  const author = (formData.get("author") as string)?.trim();
  const content = (formData.get("content") as string)?.trim();

  if (!title || !author || !content) {
    throw new Error("모든 항목을 입력해주세요.");
  }

  await updatePost(id, { title, author, content });
  revalidatePath("/");
  revalidatePath(`/posts/${id}`);
  redirect(`/posts/${id}`);
}

export async function deletePostAction(id: string) {
  await deletePost(id);
  revalidatePath("/");
  redirect("/");
}
