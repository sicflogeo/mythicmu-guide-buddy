import { ColoredBoxBlock } from "@/types/block";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

interface ColoredBoxBlockViewProps {
  block: ColoredBoxBlock;
  isEditable?: boolean;
  onUpdate?: (updates: Partial<ColoredBoxBlock>) => void;
  onDelete?: () => void;
}

export function ColoredBoxBlockView({ block, isEditable, onUpdate, onDelete }: ColoredBoxBlockViewProps) {
  const colorClasses = {
    red: 'bg-red-500/20 border-red-500/30 text-red-400',
    green: 'bg-green-500/20 border-green-500/30 text-green-400',
    blue: 'bg-blue-500/20 border-blue-500/30 text-blue-400',
    yellow: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400',
    purple: 'bg-purple-500/20 border-purple-500/30 text-purple-400',
    custom: '',
  };

  const boxStyle = block.color === 'custom' && block.customColor ? {
    backgroundColor: `${block.customColor}20`,
    borderColor: `${block.customColor}50`,
    color: block.customColor,
  } : {};

  if (!isEditable) {
    return (
      <div 
        className={`p-4 rounded-lg border ${block.color !== 'custom' ? colorClasses[block.color] : ''}`}
        style={boxStyle}
      >
        <p className="whitespace-pre-wrap">{block.content}</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <div className="flex gap-1">
          {(['red', 'green', 'blue', 'yellow', 'purple'] as const).map((color) => (
            <Button
              key={color}
              size="sm"
              variant={block.color === color ? 'default' : 'outline'}
              onClick={() => onUpdate?.({ color })}
              className={`w-8 h-8 p-0 ${colorClasses[color]}`}
            />
          ))}
          <Input
            type="color"
            value={block.customColor || '#3b82f6'}
            onChange={(e) => onUpdate?.({ color: 'custom', customColor: e.target.value })}
            className="w-8 h-8 p-0 cursor-pointer"
          />
        </div>
        <Button size="icon" variant="ghost" onClick={onDelete} className="text-destructive ml-auto">
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
      <div 
        className={`p-4 rounded-lg border ${block.color !== 'custom' ? colorClasses[block.color] : ''}`}
        style={boxStyle}
      >
        <Textarea
          value={block.content}
          onChange={(e) => onUpdate?.({ content: e.target.value })}
          placeholder="Box content..."
          className="min-h-[60px] bg-transparent border-0 focus-visible:ring-0"
        />
      </div>
    </div>
  );
}
