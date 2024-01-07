import { Category, Course } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import IconBadge from "./icon-badge";
import { BookOpen } from "lucide-react";
import { formatPrice } from "@/lib/format";
import CourseProgress from "./CourseProgress";

const CourseCard = ({
  course,
  progress,
}: {
  course: Course & {
    category: Category | null;
    chapters: { id: string }[] | null;
  };
  progress: number | null;
}) => {
  return (
    <Link href={`/courses/${course.id}`}>
      <div className="group hover:shadow-lg hover:shadow-primary/20 shadow-md shadow-primary/10 transition overflow-hidden border rounded-lg p-3 h-full border-slate-300">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image
            src={course.imageUrl || ""}
            alt={course.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
            {course.title}
          </div>
          <p className="text-[13px] text-muted-foreground">
            {course.category?.name}
          </p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size={"sm"} icon={BookOpen} />
              <span>
                {course.chapters?.length}{" "}
                {course.chapters?.length === 1 ? "Chapter" : "Chapters"}
              </span>
            </div>
          </div>

          {progress !== null ? (
            <CourseProgress
              size="sm"
              progress={progress}
              variant={progress === 100 ? "success" : "default"}
            />
          ) : (
            <p className="text-base md:text-sm font-medium text-slate-700">
              {formatPrice(course.price)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
