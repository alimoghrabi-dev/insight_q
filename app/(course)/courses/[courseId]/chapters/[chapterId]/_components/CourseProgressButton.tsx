"use client";

import { Button } from "@/components/ui/button";
import { useConfetti } from "@/hooks/use-confetti";
import axios from "axios";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseProgressButtonProps {
  chapterId: string;
  courseId: string;
  nextChapterId?: string;
  isCompleted?: boolean;
}

const CourseProgressButton = ({
  chapterId,
  courseId,
  nextChapterId,
  isCompleted,
}: CourseProgressButtonProps) => {
  const router = useRouter();
  const confetti = useConfetti();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const Icon = isCompleted ? XCircle : CheckCircle;

  const handleClick = async () => {
    setIsLoading(true);

    try {
      await axios.put(
        `/api/courses/${courseId}/chapters/${chapterId}/progress`,
        {
          isCompleted: !isCompleted,
        }
      );

      if (!isCompleted && !nextChapterId) {
        confetti.onOpen();
      }

      if (!isCompleted && nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }

      toast.success("Progress Updated");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleClick}
      type="button"
      variant={isCompleted ? "outline" : "success"}
      className="w-full md:w-52">
      {isLoading ? (
        <Loader2 className="animate-spin h-4 w-4" />
      ) : (
        <>
          {isCompleted ? "Completed" : "Mark as Completed"}
          <Icon className="h-4 w-4 ml-2 mt-0.5" />
        </>
      )}
    </Button>
  );
};

export default CourseProgressButton;
