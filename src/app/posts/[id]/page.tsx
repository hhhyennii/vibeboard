import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, incrementViews } from "@/lib/posts";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DeletePostButton } from "@/components/delete-post-button";

function formatDateTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function PostDetailPage({
  params,
}: PageProps<"/posts/[id]">) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  await incrementViews(id);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <div className="flex flex-wrap gap-x-4 text-sm text-muted-foreground">
          <span>작성자: {post.author}</span>
          <span>작성일: {formatDateTime(post.createdAt)}</span>
          <span>조회수: {post.views + 1}</span>
        </div>
      </div>

      <Separator />

      <div className="min-h-40 whitespace-pre-wrap leading-relaxed">
        {post.content}
      </div>

      <Separator />

      <div className="flex justify-between">
        <Button
          variant="outline"
          render={<Link href="/" />}
          nativeButton={false}
        >
          목록으로
        </Button>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            render={<Link href={`/posts/${post.id}/edit`} />}
            nativeButton={false}
          >
            수정
          </Button>
          <DeletePostButton id={post.id} />
        </div>
      </div>
    </div>
  );
}
