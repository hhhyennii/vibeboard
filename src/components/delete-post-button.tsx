"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deletePostAction } from "@/app/actions";
import { PostForm } from "@/components/post-form";

function ConfirmDeleteButton() {
  const { pending } = useFormStatus();
  return (
    <AlertDialogAction type="submit" variant="destructive" disabled={pending}>
      {pending ? "삭제 중..." : "삭제"}
    </AlertDialogAction>
  );
}

export function DeletePostButton({ id }: { id: string }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="destructive" />}>
        삭제
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>정말 삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            삭제된 글은 복구할 수 없습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <PostForm action={deletePostAction.bind(null, id)}>
            <ConfirmDeleteButton />
          </PostForm>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
