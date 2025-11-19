import { HeadingBlock } from "@/types/block";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2 } from "lucide-react";

interface HeadingBlockViewProps {
  block: HeadingBlock;
  isEditable?: boolean;
  onUpdate?: (updates: Partial<HeadingBlock>) => void;
  onDelete?: () => void;
}

export function HeadingBlockView({ block, isEditable, onUpdate, onDelete }: HeadingBlockViewProps) {
  const Tag = `h${block.level}` as keyof JSX.IntrinsicElements;
  const sizeClasses = {
    1: 'text-4xl',
    2: 'text-3xl',
    3: 'text-2xl',
    4: 'text-xl',
    5: 'text-lg',
    6: 'text-base',
  };

  if (!isEditable) {
    return (
      <Tag className={`font-bold text-primary mb-3 ${sizeClasses[block.level]} text-${block.align || 'left'}`}>
        {block.content}
      </Tag>
    );
  }

  return (
    <div className="group relative space-y-2">
      <div className="flex gap-2">
        <Input
          value={block.content}
          onChange={(e) => onUpdate?.({ content: e.target.value })}
          placeholder="Heading text..."
          className="flex-1"
        />
        <Select value={String(block.level)} onValueChange={(v) => onUpdate?.({ level: Number(v) as any })}>
          <SelectTrigger className="w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5, 6].map((l) => (
              <SelectItem key={l} value={String(l)}>H{l}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button size="icon" variant="ghost" onClick={onDelete} className="text-destructive">
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
      <Tag className={`font-bold text-primary ${sizeClasses[block.level]}`}>
        {block.content || 'Heading preview'}
      </Tag>
    </div>
  );
}
