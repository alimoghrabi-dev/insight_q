import { Category, Course } from "@prisma/client";
import CourseCard from "./CourseCard";

type courseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[] | null;
  progress: number | null;
};

interface CoursesListProps {
  items: courseWithProgressWithCategory[];
}

const CoursesList = ({ items }: CoursesListProps) => {
  return (
    <div className="mt-3.5">
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <CourseCard key={item.id} course={item} progress={item.progress} />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-lg text-muted-foreground mt-10">
          No courses found
        </div>
      )}
    </div>
  );
};

export default CoursesList;
