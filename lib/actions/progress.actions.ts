import { db } from "../db";

export async function getProgress(
  userId: string,
  courseId: string
): Promise<number> {
  try {
    const publishedChapters = await db.chapter.findMany({
      where: {
        courseId,
        isPublished: true,
      },
      select: {
        id: true,
      },
    });

    const publishedChaptersId = publishedChapters.map((chapter) => chapter.id);

    const validCompletedChapters = await db.userProgress.count({
      where: {
        userId,
        chapterId: {
          in: publishedChaptersId,
        },
        isCompleted: true,
      },
    });

    const progressPercentage =
      (validCompletedChapters / publishedChaptersId.length) * 100;

    return progressPercentage;
  } catch (error) {
    console.log("PROGRESS", error);
    return 0;
  }
}
