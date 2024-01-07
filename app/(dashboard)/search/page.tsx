import { db } from "@/lib/db";
import Categories from "./_components/Categories";
import SearchInput from "../_components/SearchInput";
import { getCourses } from "@/lib/actions/course.actions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import CoursesList from "@/components/CoursesList";

interface SearchPageProps {
  searchParams: {
    categoryId: string;
    title: string;
  };
}

const Page = async ({ searchParams }: SearchPageProps) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const courses = await getCourses({
    userId,
    ...searchParams,
  });

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6">
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default Page;
