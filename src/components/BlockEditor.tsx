import { useState } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Block, BlockType } from "@/types/block";
import { SortableBlock } from "./SortableBlock";
import { BlockToolbar } from "./BlockToolbar";
import { Button } from "./ui/button";
import { Eye, Edit3 } from "lucide-react";

interface BlockEditorProps {
  blocks: Block[];
  onChange: (blocks: Block[]) => void;
}

export function BlockEditor({ blocks, onChange }: BlockEditorProps) {
  const [isPreview, setIsPreview] = useState(false);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = blocks.findIndex((b) => b.id === active.id);
      const newIndex = blocks.findIndex((b) => b.id === over.id);
      onChange(arrayMove(blocks, oldIndex, newIndex));
    }
  };

  const addBlock = (type: BlockType) => {
    const newBlock: Block = createEmptyBlock(type);
    onChange([...blocks, newBlock]);
  };

  const updateBlock = (index: number, updatedBlock: Block) => {
    const newBlocks = [...blocks];
    newBlocks[index] = updatedBlock;
    onChange(newBlocks);
  };

  const deleteBlock = (index: number) => {
    onChange(blocks.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center sticky top-0 bg-background/95 backdrop-blur z-10 py-2 border-b">
        <BlockToolbar onAddBlock={addBlock} />
        <Button
          variant={isPreview ? "default" : "outline"}
          size="sm"
          onClick={() => setIsPreview(!isPreview)}
          className="gap-2"
        >
          {isPreview ? (
            <>
              <Edit3 className="w-4 h-4" />
              Edit
            </>
          ) : (
            <>
              <Eye className="w-4 h-4" />
              Preview
            </>
          )}
        </Button>
      </div>

      {blocks.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No blocks yet. Add your first block using the toolbar above.</p>
        </div>
      )}

      {isPreview ? (
        <div className="space-y-4 p-4 border rounded-lg bg-card">
          {blocks.map((block) => (
            <SortableBlock
              key={block.id}
              id={block.id}
              block={block}
              isEditable={false}
            />
          ))}
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {blocks.map((block, index) => (
                <SortableBlock
                  key={block.id}
                  id={block.id}
                  block={block}
                  isEditable
                  onUpdate={(updated) => updateBlock(index, updated)}
                  onDelete={() => deleteBlock(index)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}

function createEmptyBlock(type: BlockType): Block {
  const id = `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  switch (type) {
    case 'text':
      return { id, type: 'text', content: '', align: 'left' };
    case 'heading':
      return { id, type: 'heading', content: '', level: 2, align: 'left' };
    case 'colored-box':
      return { id, type: 'colored-box', content: '', color: 'blue' };
    case 'image':
      return { id, type: 'image', src: '', alt: '', width: 100 };
    case 'video':
      return { id, type: 'video', src: '', width: 100 };
    case 'table':
      return { id, type: 'table', headers: ['Column 1', 'Column 2'], rows: [['', ''], ['', '']] };
    case 'columns':
      return { id, type: 'columns', columns: [
        { id: `col-1-${id}`, blocks: [] },
        { id: `col-2-${id}`, blocks: [] }
      ]};
    case 'quote':
      return { id, type: 'quote', content: '', author: '' };
    case 'list':
      return { id, type: 'list', items: [''], ordered: false };
    case 'divider':
      return { id, type: 'divider' };
  }
}
