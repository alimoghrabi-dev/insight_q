import { Category, Chapter, Course } from "@prisma/client";
import { db } from "../db";
import { getProgress } from "@/lib/actions/progress.actions";

type courseWithProgressWithCategory = Course & {
  progress: number | null;
  category: Category | null;
  chapters: { id: string }[] | null;
};

type getCourses = {
  userId: string;
  title?: string;
  categoryId?: string;
};

type DashboardCourseWithProgressWithCategory = Course & {
  progress: number | null;
  category: Category;
  chapters: Chapter[];
};

type DashboradCourses = {
  completedCourses: DashboardCourseWithProgressWithCategory[];
  coursesInProgress: DashboardCourseWithProgressWithCategory[];
};

export async function getCourses({
  userId,
  title,
  categoryId,
}: getCourses): Promise<courseWithProgressWithCategory[]> {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
        categoryId,
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
        purshases: {
          where: {
            userId,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const coursesWithProgress: courseWithProgressWithCategory[] =
      await Promise.all(
        courses.map(async (course) => {
          if (course.purshases.length === 0) {
            return {
              ...course,
              progress: null,
            };
          }

          const progressPercentage = await getProgress(userId, course.id);

          return {
            ...course,
            progress: progressPercentage,
          };
        })
      );

    return coursesWithProgress;
  } catch (error) {
    console.log("[COURSES]", error);
    return [];
  }
}

export const getDashboardCourses = async (
  userId: string
): Promise<DashboradCourses> => {
  try {
    const purshasedCourses = await db.purchase.findMany({
      where: {
        userId,
      },
      select: {
        course: {
          include: {
            category: true,
            chapters: {
              where: {
                isPublished: true,
              },
            },
          },
        },
      },
    });

    const courses = purshasedCourses.map(
      (purchase) => purchase.course
    ) as DashboardCourseWithProgressWithCategory[];

    for (let course of courses) {
      const progress = await getProgress(userId, course.id);

      course["progress"] = progress;
    }

    const completedCourses = courses.filter(
      (course) => course.progress === 100
    );

    const inProgressCourses = courses.filter(
      (course) => (course.progress ?? 0) < 100
    );

    return {
      completedCourses,
      coursesInProgress: inProgressCourses,
    };
  } catch (error) {
    console.log("[DASHBOARD]", error);
    return {
      completedCourses: [],
      coursesInProgress: [],
    };
  }
};
