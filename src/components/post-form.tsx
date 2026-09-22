"use client";

import { useRef } from "react";

export function PostForm({
  action,
  className,
  children,
}: {
  action: (formData: FormData) => void;
  className?: string;
  children: React.ReactNode;
}) {
  const submittedRef = useRef(false);

  return (
    <form
      action={action}
      className={className}
      onSubmit={(e) => {
        if (submittedRef.current) {
          e.preventDefault();
          return;
        }
        submittedRef.current = true;
      }}
    >
      {children}
    </form>
  );
}
