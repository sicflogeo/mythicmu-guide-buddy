export type BlockType = 
  | 'text'
  | 'heading'
  | 'colored-box'
  | 'image'
  | 'video'
  | 'table'
  | 'columns'
  | 'quote'
  | 'list'
  | 'divider';

export interface BaseBlock {
  id: string;
  type: BlockType;
}

export interface TextBlock extends BaseBlock {
  type: 'text';
  content: string;
  align?: 'left' | 'center' | 'right';
}

export interface HeadingBlock extends BaseBlock {
  type: 'heading';
  content: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  align?: 'left' | 'center' | 'right';
}

export interface ColoredBoxBlock extends BaseBlock {
  type: 'colored-box';
  content: string;
  color: 'red' | 'green' | 'blue' | 'yellow' | 'purple' | 'custom';
  customColor?: string;
}

export interface ImageBlock extends BaseBlock {
  type: 'image';
  src: string;
  alt: string;
  width?: number;
  align?: 'left' | 'center' | 'right';
}

export interface VideoBlock extends BaseBlock {
  type: 'video';
  src: string;
  width?: number;
}

export interface TableBlock extends BaseBlock {
  type: 'table';
  headers: string[];
  rows: string[][];
}

export interface ColumnsBlock extends BaseBlock {
  type: 'columns';
  columns: {
    id: string;
    blocks: Block[];
  }[];
}

export interface QuoteBlock extends BaseBlock {
  type: 'quote';
  content: string;
  author?: string;
}

export interface ListBlock extends BaseBlock {
  type: 'list';
  items: string[];
  ordered: boolean;
}

export interface DividerBlock extends BaseBlock {
  type: 'divider';
}

export type Block = 
  | TextBlock
  | HeadingBlock
  | ColoredBoxBlock
  | ImageBlock
  | VideoBlock
  | TableBlock
  | ColumnsBlock
  | QuoteBlock
  | ListBlock
  | DividerBlock;

export interface BlockGuideSubSection {
  id: string;
  title: string;
  description?: string;
  blocks: Block[];
}

export interface BlockGuideCategory {
  id: string;
  title: string;
  iconName: string;
  description: string;
  subSections: BlockGuideSubSection[];
}
