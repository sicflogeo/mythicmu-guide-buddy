import { ImageBlock } from "@/types/block";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Trash2, Upload } from "lucide-react";
import { useRef } from "react";

interface ImageBlockViewProps {
  block: ImageBlock;
  isEditable?: boolean;
  onUpdate?: (updates: Partial<ImageBlock>) => void;
  onDelete?: () => void;
}

export function ImageBlockView({ block, isEditable, onUpdate, onDelete }: ImageBlockViewProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      onUpdate?.({ src: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  if (!isEditable) {
    return (
      <div className={`my-4 text-${block.align || 'left'}`}>
        <img 
          src={block.src} 
          alt={block.alt} 
          style={{ width: block.width ? `${block.width}%` : 'auto', maxWidth: '100%' }}
          className="rounded-lg"
        />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => fileInputRef.current?.click()}>
          <Upload className="w-3 h-3 mr-1" />
          Upload
        </Button>
        <Button size="sm" variant="ghost" onClick={onDelete} className="text-destructive ml-auto">
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
      <div className="space-y-2">
        <div>
          <Label className="text-xs">Image URL</Label>
          <Input
            value={block.src}
            onChange={(e) => onUpdate?.({ src: e.target.value })}
            placeholder="https://..."
          />
        </div>
        <div>
          <Label className="text-xs">Alt Text</Label>
          <Input
            value={block.alt}
            onChange={(e) => onUpdate?.({ alt: e.target.value })}
            placeholder="Image description"
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
      </div>
      {block.src && (
        <img src={block.src} alt={block.alt} className="rounded-lg max-w-full" style={{ width: `${block.width || 100}%` }} />
      )}
    </div>
  );
}
