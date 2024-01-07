"use client";

import ConfirmModel from "@/components/models/confirm-model";
import { Button } from "@/components/ui/button";
import { useConfetti } from "@/hooks/use-confetti";
import axios from "axios";
import { Loader2, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseActionsProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}

const CourseActions = ({
  disabled,
  courseId,
  isPublished,
}: CourseActionsProps) => {
  const router = useRouter();

  const confetti = useConfetti();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCoursePublishing, setIsCoursePublishing] = useState<boolean>(false);
  const [isCourseUnpublishing, setIsCourseUnpublishing] =
    useState<boolean>(false);

  const handlePublish = async () => {
    try {
      if (isPublished) {
        setIsCourseUnpublishing(true);
        await axios.patch(`/api/courses/${courseId}/unpublish`);
        toast.success("Course Unpublished successfully.");
      } else {
        setIsCoursePublishing(true);

        await axios.patch(`/api/courses/${courseId}/publish`);
        toast.success("Course Published successfully.");

        confetti.onOpen();
      }

      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsCoursePublishing(false);
      setIsCourseUnpublishing(false);
    }
  };

  const onDelete = async () => {
    setIsLoading(true);

    try {
      await axios.delete(`/api/courses/${courseId}`);
      toast.success("Course deleted successfully.");

      router.refresh();
      router.push(`/teacher/courses`);
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        disabled={disabled || isLoading}
        onClick={handlePublish}
        variant={"outline"}
        size={"sm"}
        className="border-slate-300 hover:bg-slate-100">
        {isPublished ? (
          isCourseUnpublishing ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Unpublish"
          )
        ) : isCoursePublishing ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          "Publish"
        )}
      </Button>
      <ConfirmModel onConfirm={onDelete}>
        <Button
          disabled={isLoading}
          size={"sm"}
          variant={"destructive"}
          className="bg-red-600">
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Trash className="w-4 h-4" />
          )}
        </Button>
      </ConfirmModel>
    </div>
  );
};

export default CourseActions;
