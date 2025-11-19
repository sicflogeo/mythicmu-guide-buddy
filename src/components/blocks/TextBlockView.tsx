import { TextBlock } from "@/types/block";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash2, AlignLeft, AlignCenter, AlignRight } from "lucide-react";

interface TextBlockViewProps {
  block: TextBlock;
  isEditable?: boolean;
  onUpdate?: (updates: Partial<TextBlock>) => void;
  onDelete?: () => void;
}

export function TextBlockView({ block, isEditable, onUpdate, onDelete }: TextBlockViewProps) {
  if (!isEditable) {
    return (
      <p className={`text-foreground/80 leading-relaxed text-${block.align || 'left'}`}>
        {block.content}
      </p>
    );
  }

  return (
    <div className="group relative">
      <Textarea
        value={block.content}
        onChange={(e) => onUpdate?.({ content: e.target.value })}
        className="min-h-[80px] resize-none"
        placeholder="Enter text..."
      />
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 flex gap-1 bg-background border rounded-md p-1">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onUpdate?.({ align: 'left' })}
          className={block.align === 'left' ? 'bg-accent' : ''}
        >
          <AlignLeft className="w-3 h-3" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onUpdate?.({ align: 'center' })}
          className={block.align === 'center' ? 'bg-accent' : ''}
        >
          <AlignCenter className="w-3 h-3" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onUpdate?.({ align: 'right' })}
          className={block.align === 'right' ? 'bg-accent' : ''}
        >
          <AlignRight className="w-3 h-3" />
        </Button>
        <Button size="sm" variant="ghost" onClick={onDelete} className="text-destructive">
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
}
