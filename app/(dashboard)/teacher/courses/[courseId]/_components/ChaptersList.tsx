import { Chapter } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { Grip, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ChaptersListProps {
  onEdit: (id: string) => void;
  onRedorder: (updateData: { id: string; position: number }[]) => void;
  items: Chapter[];
}

const ChaptersList = ({ onEdit, onRedorder, items }: ChaptersListProps) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [chapters, setChapters] = useState<Chapter[]>(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setChapters(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(chapters);
    const reorderedItem = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem[0]);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedChapters = items.slice(startIndex, endIndex + 1);

    setChapters(items);

    const bulkUpdateData = updatedChapters.map((chapter) => ({
      id: chapter.id,
      position: items.findIndex((item) => item.id === chapter.id),
    }));

    onRedorder(bulkUpdateData);
  };

  if (!isMounted) return null;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapters">
        {(provided) => {
          return (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {chapters.map((chapter, index) => (
                <Draggable
                  key={chapter.id}
                  draggableId={chapter.id}
                  index={index}>
                  {(provided) => {
                    return (
                      <div
                        className={cn(
                          "flex items-center gap-x-2 bg-slate-200 border-slate-300 border text-slate-700 rounded-md mb-4 text-sm",
                          chapter.isPublished &&
                            "bg-sky-200 border-sky-300 text-sky-700"
                        )}
                        ref={provided.innerRef}
                        {...provided.draggableProps}>
                        <div
                          className={cn(
                            "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                            chapter.isPublished &&
                              "hover:bg-sky-200 border-r-sky-300"
                          )}
                          {...provided.dragHandleProps}>
                          <Grip className="h-5 w-5" />
                        </div>
                        {chapter.title}
                        <div className="ml-auto pr-2 flex items-center gap-x-2">
                          {chapter.isFree && <Badge>Free</Badge>}

                          <Badge
                            className={cn(
                              "bg-slate-500",
                              chapter.isPublished && "bg-sky-700"
                            )}>
                            {chapter.isPublished ? "Published" : "Draft"}
                          </Badge>
                          <Pencil
                            onClick={() => onEdit(chapter.id)}
                            className="w-4 h-4 cursor-pointer hover:opacity-75 transition-all"
                          />
                        </div>
                      </div>
                    );
                  }}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};

export default ChaptersList;
