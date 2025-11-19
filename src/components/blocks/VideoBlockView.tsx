import { VideoBlock } from "@/types/block";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";

interface VideoBlockViewProps {
  block: VideoBlock;
  isEditable?: boolean;
  onUpdate?: (updates: Partial<VideoBlock>) => void;
  onDelete?: () => void;
}

export function VideoBlockView({ block, isEditable, onUpdate, onDelete }: VideoBlockViewProps) {
  if (!isEditable) {
    return (
      <div className="my-4">
        <video 
          src={block.src} 
          controls 
          style={{ width: block.width ? `${block.width}%` : '100%', maxWidth: '100%' }}
          className="rounded-lg"
        />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Label className="text-xs">Video Settings</Label>
        <Button size="sm" variant="ghost" onClick={onDelete} className="text-destructive">
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
      <div>
        <Label className="text-xs">Video URL</Label>
        <Input
          value={block.src}
          onChange={(e) => onUpdate?.({ src: e.target.value })}
          placeholder="https://..."
        />
      </div>
      <div>
        <Label className="text-xs">Width (%)</Label>
        <Input
          type="number"
          value={block.width || 100}
          onChange={(e) => onUpdate?.({ width: Number(e.target.value) })}
          min="10"
          max="100"
        />
      </div>
      {block.src && (
        <video src={block.src} controls className="rounded-lg max-w-full" style={{ width: `${block.width || 100}%` }} />
      )}
    </div>
  );
}
