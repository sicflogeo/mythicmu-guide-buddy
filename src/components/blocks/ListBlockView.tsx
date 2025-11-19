import { ListBlock } from "@/types/block";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, List, ListOrdered } from "lucide-react";

interface ListBlockViewProps {
  block: ListBlock;
  isEditable?: boolean;
  onUpdate?: (updates: Partial<ListBlock>) => void;
  onDelete?: () => void;
}

export function ListBlockView({ block, isEditable, onUpdate, onDelete }: ListBlockViewProps) {
  const addItem = () => {
    onUpdate?.({ items: [...block.items, ''] });
  };

  const updateItem = (index: number, value: string) => {
    const newItems = [...block.items];
    newItems[index] = value;
    onUpdate?.({ items: newItems });
  };

  const deleteItem = (index: number) => {
    const newItems = block.items.filter((_, i) => i !== index);
    onUpdate?.({ items: newItems });
  };

  if (!isEditable) {
    const ListTag = block.ordered ? 'ol' : 'ul';
    return (
      <ListTag className={`space-y-2 my-4 ${block.ordered ? 'list-decimal' : 'list-disc'} list-inside text-foreground/80`}>
        {block.items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ListTag>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={block.ordered ? 'default' : 'outline'}
            onClick={() => onUpdate?.({ ordered: true })}
          >
            <ListOrdered className="w-3 h-3" />
          </Button>
          <Button
            size="sm"
            variant={!block.ordered ? 'default' : 'outline'}
            onClick={() => onUpdate?.({ ordered: false })}
          >
            <List className="w-3 h-3" />
          </Button>
          <Button size="sm" variant="outline" onClick={addItem}>
            <Plus className="w-3 h-3 mr-1" />
            Item
          </Button>
        </div>
        <Button size="sm" variant="ghost" onClick={onDelete} className="text-destructive">
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
      <div className="space-y-2">
        {block.items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <span className="text-sm text-muted-foreground pt-2">{block.ordered ? `${i + 1}.` : '•'}</span>
            <Input
              value={item}
              onChange={(e) => updateItem(i, e.target.value)}
              placeholder="List item..."
              className="flex-1"
            />
            <Button size="icon" variant="ghost" onClick={() => deleteItem(i)}>
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
