import { BlockType } from "@/types/block";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "./ui/dropdown-menu";
import { Plus, Type, Heading, Box, Image, Video, Table, Columns, Quote, List, Minus } from "lucide-react";

interface BlockToolbarProps {
  onAddBlock: (type: BlockType) => void;
}

export function BlockToolbar({ onAddBlock }: BlockToolbarProps) {
  const blockTypes: { type: BlockType; label: string; icon: any }[] = [
    { type: 'text', label: 'Text', icon: Type },
    { type: 'heading', label: 'Heading', icon: Heading },
    { type: 'colored-box', label: 'Colored Box', icon: Box },
    { type: 'image', label: 'Image', icon: Image },
    { type: 'video', label: 'Video', icon: Video },
    { type: 'table', label: 'Table', icon: Table },
    { type: 'columns', label: 'Two Columns', icon: Columns },
    { type: 'quote', label: 'Quote', icon: Quote },
    { type: 'list', label: 'List', icon: List },
    { type: 'divider', label: 'Divider', icon: Minus },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Add Block
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {blockTypes.map((bt, i) => (
          <div key={bt.type}>
            <DropdownMenuItem onClick={() => onAddBlock(bt.type)} className="gap-2 cursor-pointer">
              <bt.icon className="w-4 h-4" />
              {bt.label}
            </DropdownMenuItem>
            {(i === 2 || i === 6) && <DropdownMenuSeparator />}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
