import { notFound } from "next/navigation";
import { getPost } from "@/lib/posts";
import { updatePostAction } from "@/app/actions";
import { PostForm } from "@/components/post-form";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function EditPostPage({
  params,
}: PageProps<"/posts/[id]/edit">) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  const updateWithId = updatePostAction.bind(null, id);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">글 수정</h1>
      <Card>
        <CardHeader>
          <CardTitle>글 정보 수정</CardTitle>
        </CardHeader>
        <CardContent>
          <PostForm action={updateWithId} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">제목</Label>
              <Input
                id="title"
                name="title"
                required
                maxLength={100}
                defaultValue={post.title}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">작성자</Label>
              <Input
                id="author"
                name="author"
                required
                maxLength={30}
                defaultValue={post.author}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">내용</Label>
              <Textarea
                id="content"
                name="content"
                required
                rows={10}
                className="resize-y"
                defaultValue={post.content}
              />
            </div>
            <div className="flex justify-end gap-2">
              <SubmitButton pendingText="저장 중...">저장</SubmitButton>
            </div>
          </PostForm>
        </CardContent>
      </Card>
    </div>
  );
}
