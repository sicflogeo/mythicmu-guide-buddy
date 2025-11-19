import { DividerBlock } from "@/types/block";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface DividerBlockViewProps {
  block: DividerBlock;
  isEditable?: boolean;
  onDelete?: () => void;
}

export function DividerBlockView({ isEditable, onDelete }: DividerBlockViewProps) {
  if (!isEditable) {
    return <hr className="my-6 border-border" />;
  }

  return (
    <div className="group relative py-2">
      <hr className="border-border" />
      <Button
        size="sm"
        variant="ghost"
        onClick={onDelete}
        className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 text-destructive"
      >
        <Trash2 className="w-3 h-3" />
      </Button>
    </div>
  );
}
