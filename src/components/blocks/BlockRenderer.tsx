import { Block } from "@/types/block";
import { TextBlockView } from "./TextBlockView";
import { HeadingBlockView } from "./HeadingBlockView";
import { ColoredBoxBlockView } from "./ColoredBoxBlockView";
import { ImageBlockView } from "./ImageBlockView";
import { VideoBlockView } from "./VideoBlockView";
import { TableBlockView } from "./TableBlockView";
import { ColumnsBlockView } from "./ColumnsBlockView";
import { QuoteBlockView } from "./QuoteBlockView";
import { ListBlockView } from "./ListBlockView";
import { DividerBlockView } from "./DividerBlockView";

interface BlockRendererProps {
  block: Block;
  isEditable?: boolean;
  onUpdate?: (block: Block) => void;
  onDelete?: () => void;
}

export function BlockRenderer({ block, isEditable = false, onUpdate, onDelete }: BlockRendererProps) {
  const commonProps = {
    isEditable,
    onUpdate: onUpdate ? (updated: any) => onUpdate({ ...block, ...updated }) : undefined,
    onDelete,
  };

  switch (block.type) {
    case 'text':
      return <TextBlockView block={block} {...commonProps} />;
    case 'heading':
      return <HeadingBlockView block={block} {...commonProps} />;
    case 'colored-box':
      return <ColoredBoxBlockView block={block} {...commonProps} />;
    case 'image':
      return <ImageBlockView block={block} {...commonProps} />;
    case 'video':
      return <VideoBlockView block={block} {...commonProps} />;
    case 'table':
      return <TableBlockView block={block} {...commonProps} />;
    case 'columns':
      return <ColumnsBlockView block={block} {...commonProps} />;
    case 'quote':
      return <QuoteBlockView block={block} {...commonProps} />;
    case 'list':
      return <ListBlockView block={block} {...commonProps} />;
    case 'divider':
      return <DividerBlockView block={block} {...commonProps} />;
    default:
      return null;
  }
}
