import { cn } from "@/lib/utils";
import { Progress } from "./ui/progress";

interface CourseProgressProps {
  variant: "success" | "default";
  progress: number;
  size?: "sm" | "default";
}

const colorByVariant = {
  default: "text-sky-700",
  success: "text-emerald-700",
};

const sizeByVariant = {
  default: "text-sm",
  sm: "text-xs",
};

const CourseProgress = ({ variant, progress, size }: CourseProgressProps) => {
  return (
    <div>
      <Progress
        className="h-2 bg-slate-300/60"
        value={progress}
        variant={variant}
      />
      <p
        className={cn(
          "font-medium mt-2 text-sky-700",
          colorByVariant[variant || "default"],
          sizeByVariant[size || "default"]
        )}>
        {Math.round(progress)}% Complete
      </p>
    </div>
  );
};

export default CourseProgress;
