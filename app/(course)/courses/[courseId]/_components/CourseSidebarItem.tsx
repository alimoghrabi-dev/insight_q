"use client";

import { cn } from "@/lib/utils";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface CourseSidebarItemProps {
  id: string;
  title: string;
  isCompletd: boolean;
  courseId: string;
  isLocked: boolean;
}

const CourseSidebarItem = ({
  id,
  title,
  isCompletd,
  courseId,
  isLocked,
}: CourseSidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const Icon = isLocked ? Lock : isCompletd ? CheckCircle : PlayCircle;

  const isActive = pathname?.includes(id);

  const handleClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className={cn(
        "relative flex rounded-md items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-700 hover:bg-slate-300/25",
        isActive &&
          "text-slate-800 bg-slate-300/40 hover:bg-slate-300/40 hover:text-slate-800 cursor-default",
        isCompletd && "text-emerald-700 hover:text-emerald-700",
        isCompletd && isActive && "bg-emerald-200/25 cursor-default"
      )}>
      <div className="flex item-center capitalize py-4 gap-x-2">
        <Icon
          size={22}
          className={cn(
            "text-slate-500",
            isActive && "text-slate-800",
            isCompletd && "text-emerald-700"
          )}
        />
        {title}
      </div>
      <div
        className={cn(
          "ml-auto absolute right-0 rounded-r-md opacity-0 border-2 border-slate-700 h-full transition-all",
          isActive && "opacity-100",
          isCompletd && "border-emerald-700"
        )}
      />
    </button>
  );
};

export default CourseSidebarItem;
