"use client";

import ConfirmModel from "@/components/models/confirm-model";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ChapterActionsProps {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
}

const ChapterActions = ({
  disabled,
  courseId,
  chapterId,
  isPublished,
}: ChapterActionsProps) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isChapterPublishing, setIsChapterPublishing] =
    useState<boolean>(false);
  const [isChapterUnpublishing, setIsChapterUnpublishing] =
    useState<boolean>(false);

  const handlePublish = async () => {
    try {
      if (isPublished) {
        setIsChapterUnpublishing(true);
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/unpublish`
        );
        toast.success("Chapter Unpublished successfully.");
      } else {
        setIsChapterPublishing(true);

        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/publish`
        );
        toast.success("Chapter Published successfully.");
      }

      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsChapterPublishing(false);
      setIsChapterUnpublishing(false);
    }
  };

  const onDelete = async () => {
    setIsLoading(true);

    try {
      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);
      toast.success("Chapter deleted successfully.");

      router.refresh();
      router.push(`/teacher/courses/${courseId}`);
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
          isChapterUnpublishing ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Unpublish"
          )
        ) : isChapterPublishing ? (
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

export default ChapterActions;
