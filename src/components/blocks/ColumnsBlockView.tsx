import { ColumnsBlock, Block } from "@/types/block";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { BlockRenderer } from "./BlockRenderer";

interface ColumnsBlockViewProps {
  block: ColumnsBlock;
  isEditable?: boolean;
  onUpdate?: (updates: Partial<ColumnsBlock>) => void;
  onDelete?: () => void;
}

export function ColumnsBlockView({ block, isEditable, onUpdate, onDelete }: ColumnsBlockViewProps) {
  const updateColumnBlock = (columnIndex: number, blockIndex: number, updatedBlock: Block) => {
    const newColumns = [...block.columns];
    newColumns[columnIndex].blocks[blockIndex] = updatedBlock;
    onUpdate?.({ columns: newColumns });
  };

  const deleteColumnBlock = (columnIndex: number, blockIndex: number) => {
    const newColumns = [...block.columns];
    newColumns[columnIndex].blocks.splice(blockIndex, 1);
    onUpdate?.({ columns: newColumns });
  };

  if (!isEditable) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        {block.columns.map((column) => (
          <div key={column.id} className="space-y-3">
            {column.blocks.map((b) => (
              <BlockRenderer key={b.id} block={b} />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-sm font-medium">Two Columns</span>
        <Button size="sm" variant="ghost" onClick={onDelete} className="text-destructive">
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
        {block.columns.map((column, colIndex) => (
          <div key={column.id} className="space-y-3 min-h-[100px] p-3 border rounded bg-muted/30">
            <span className="text-xs text-muted-foreground">Column {colIndex + 1}</span>
            {column.blocks.map((b, blockIndex) => (
              <BlockRenderer
                key={b.id}
                block={b}
                isEditable
                onUpdate={(updated) => updateColumnBlock(colIndex, blockIndex, updated)}
                onDelete={() => deleteColumnBlock(colIndex, blockIndex)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
