import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Block } from "@/types/block";
import { BlockRenderer } from "./blocks/BlockRenderer";
import { GripVertical } from "lucide-react";

interface SortableBlockProps {
  id: string;
  block: Block;
  isEditable?: boolean;
  onUpdate?: (block: Block) => void;
  onDelete?: () => void;
}

export function SortableBlock({ id, block, isEditable, onUpdate, onDelete }: SortableBlockProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  if (!isEditable) {
    return <BlockRenderer block={block} isEditable={false} />;
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative bg-card border rounded-lg p-4 hover:border-primary/50 transition"
    >
      <div
        {...attributes}
        {...listeners}
        className="absolute left-2 top-2 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition"
      >
        <GripVertical className="w-4 h-4 text-muted-foreground" />
      </div>
      <div className="pl-6">
        <BlockRenderer
          block={block}
          isEditable={isEditable}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}
