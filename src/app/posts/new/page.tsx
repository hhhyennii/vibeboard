import { createPostAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NewPostPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">새 글 작성</h1>
      <Card>
        <CardHeader>
          <CardTitle>글 정보 입력</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createPostAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">제목</Label>
              <Input id="title" name="title" required maxLength={100} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">작성자</Label>
              <Input id="author" name="author" required maxLength={30} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">내용</Label>
              <Textarea
                id="content"
                name="content"
                required
                rows={10}
                className="resize-y"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="submit">등록</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
