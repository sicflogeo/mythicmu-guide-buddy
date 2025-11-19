import { QuoteBlock } from "@/types/block";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Trash2, Quote } from "lucide-react";

interface QuoteBlockViewProps {
  block: QuoteBlock;
  isEditable?: boolean;
  onUpdate?: (updates: Partial<QuoteBlock>) => void;
  onDelete?: () => void;
}

export function QuoteBlockView({ block, isEditable, onUpdate, onDelete }: QuoteBlockViewProps) {
  if (!isEditable) {
    return (
      <blockquote className="border-l-4 border-primary pl-4 py-2 my-4 italic bg-muted/30 rounded-r-lg">
        <p className="text-foreground/90">{block.content}</p>
        {block.author && (
          <footer className="text-sm text-muted-foreground mt-2">— {block.author}</footer>
        )}
      </blockquote>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Quote className="w-4 h-4 text-primary" />
          <Label className="text-xs">Quote Block</Label>
        </div>
        <Button size="sm" variant="ghost" onClick={onDelete} className="text-destructive">
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
      <Textarea
        value={block.content}
        onChange={(e) => onUpdate?.({ content: e.target.value })}
        placeholder="Quote text..."
        className="min-h-[60px]"
      />
      <Input
        value={block.author || ''}
        onChange={(e) => onUpdate?.({ author: e.target.value })}
        placeholder="Author (optional)"
      />
      <blockquote className="border-l-4 border-primary pl-4 py-2 italic bg-muted/30 rounded-r-lg">
        <p className="text-foreground/90">{block.content || 'Quote preview'}</p>
        {block.author && (
          <footer className="text-sm text-muted-foreground mt-2">— {block.author}</footer>
        )}
      </blockquote>
    </div>
  );
}
