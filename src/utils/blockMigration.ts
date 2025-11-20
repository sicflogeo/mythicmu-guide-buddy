import { Block, BlockGuideCategory, BlockGuideSubSection } from "@/types/block";
import { GuideCategory } from "@/types/guide";
import { ReactElement } from "react";

// Migration utility to convert old JSX content to block format
export function migrateGuideContent(oldCategories: GuideCategory[]): BlockGuideCategory[] {
  return oldCategories.map(category => {
    // Extract icon name from icon component
    let iconName = 'BookOpen';
    if (category.icon) {
      if (typeof category.icon === 'string') {
        iconName = category.icon;
      } else if (category.icon.name) {
        iconName = category.icon.name;
      } else if (category.icon.displayName) {
        iconName = category.icon.displayName;
      }
    }
    
    return {
      id: category.id,
      title: category.title,
      iconName,
      description: category.description,
      subSections: category.subSections.map(subSection => 
        migrateSubSection(subSection)
      ),
    };
  });
}

function migrateSubSection(subSection: any): BlockGuideSubSection {
  const blocks: Block[] = [];
  
  // If content is a string (HTML), convert it
  if (typeof subSection.content === 'string') {
    blocks.push(...htmlToBlocks(subSection.content));
  } 
  // If content is JSX, extract text and structure
  else if (subSection.content) {
    blocks.push(...jsxToBlocks(subSection.content));
  }

  return {
    id: subSection.id,
    title: subSection.title,
    description: subSection.description,
    blocks,
  };
}

function htmlToBlocks(html: string): Block[] {
  const blocks: Block[] = [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  // Convert HTML elements to blocks
  const elements = doc.body.children;
  for (let i = 0; i < elements.length; i++) {
    const el = elements[i];
    const block = elementToBlock(el, i);
    if (block) blocks.push(block);
  }
  
  return blocks.length > 0 ? blocks : [createTextBlock('', 0)];
}

function jsxToBlocks(jsx: ReactElement): Block[] {
  const blocks: Block[] = [];
  
  // Extract props.children recursively
  const extractContent = (node: any, index: number = 0): void => {
    if (!node) return;
    
    if (typeof node === 'string') {
      if (node.trim()) {
        blocks.push(createTextBlock(node.trim(), blocks.length));
      }
      return;
    }
    
    if (Array.isArray(node)) {
      node.forEach((child, i) => extractContent(child, i));
      return;
    }
    
    if (node.props) {
      const { children, className = '' } = node.props;
      const type = node.type;
      
      // Detect element type
      if (type === 'h1' || type === 'h2' || type === 'h3' || type === 'h4' || type === 'h5' || type === 'h6') {
        const level = parseInt(type.charAt(1)) as 1 | 2 | 3 | 4 | 5 | 6;
        blocks.push(createHeadingBlock(extractText(children), level, blocks.length));
      } else if (type === 'p') {
        blocks.push(createTextBlock(extractText(children), blocks.length));
      } else if (type === 'ul') {
        blocks.push(createListBlock(extractListItems(children), false, blocks.length));
      } else if (type === 'ol') {
        blocks.push(createListBlock(extractListItems(children), true, blocks.length));
      } else if (type === 'div' && className.includes('colored-box')) {
        const color = detectColor(className);
        blocks.push(createColoredBoxBlock(extractText(children), color, blocks.length));
      } else if (type === 'img') {
        blocks.push(createImageBlock(node.props.src || '', node.props.alt || '', blocks.length));
      } else if (type === 'blockquote') {
        blocks.push(createQuoteBlock(extractText(children), blocks.length));
      } else if (type === 'table') {
        blocks.push(createTableBlock(children, blocks.length));
      } else if (children) {
        extractContent(children, index);
      }
    }
  };
  
  extractContent(jsx);
  return blocks.length > 0 ? blocks : [createTextBlock('Start editing...', 0)];
}

function elementToBlock(el: Element, index: number): Block | null {
  const tagName = el.tagName.toLowerCase();
  const textContent = el.textContent?.trim() || '';
  
  if (tagName.match(/^h[1-6]$/)) {
    const level = parseInt(tagName.charAt(1)) as 1 | 2 | 3 | 4 | 5 | 6;
    return createHeadingBlock(textContent, level, index);
  } else if (tagName === 'p') {
    return createTextBlock(textContent, index);
  } else if (tagName === 'ul' || tagName === 'ol') {
    const items = Array.from(el.querySelectorAll('li')).map(li => li.textContent?.trim() || '');
    return createListBlock(items, tagName === 'ol', index);
  } else if (tagName === 'div' && el.classList.contains('colored-box')) {
    const color = detectColorFromElement(el);
    return createColoredBoxBlock(textContent, color, index);
  } else if (tagName === 'img') {
    return createImageBlock((el as HTMLImageElement).src, (el as HTMLImageElement).alt, index);
  } else if (tagName === 'blockquote') {
    return createQuoteBlock(textContent, index);
  } else if (tagName === 'hr') {
    return createDividerBlock(index);
  }
  
  return null;
}

function extractText(node: any): string {
  if (typeof node === 'string') return node;
  if (Array.isArray(node)) return node.map(extractText).join(' ');
  if (node?.props?.children) return extractText(node.props.children);
  return '';
}

function extractListItems(node: any): string[] {
  const items: string[] = [];
  
  const extract = (n: any) => {
    if (!n) return;
    if (Array.isArray(n)) {
      n.forEach(extract);
      return;
    }
    if (n.type === 'li') {
      items.push(extractText(n.props.children));
    } else if (n.props?.children) {
      extract(n.props.children);
    }
  };
  
  extract(node);
  return items.length > 0 ? items : [''];
}

function detectColor(className: string): 'red' | 'green' | 'blue' | 'yellow' | 'purple' {
  if (className.includes('red')) return 'red';
  if (className.includes('green')) return 'green';
  if (className.includes('blue')) return 'blue';
  if (className.includes('yellow')) return 'yellow';
  if (className.includes('purple')) return 'purple';
  return 'blue';
}

function detectColorFromElement(el: Element): 'red' | 'green' | 'blue' | 'yellow' | 'purple' {
  const className = el.className;
  return detectColor(className);
}

// Block creators
function createTextBlock(content: string, index: number): Block {
  return {
    id: `text-${Date.now()}-${index}`,
    type: 'text',
    content,
    align: 'left',
  };
}

function createHeadingBlock(content: string, level: 1 | 2 | 3 | 4 | 5 | 6, index: number): Block {
  return {
    id: `heading-${Date.now()}-${index}`,
    type: 'heading',
    content,
    level,
    align: 'left',
  };
}

function createColoredBoxBlock(content: string, color: 'red' | 'green' | 'blue' | 'yellow' | 'purple', index: number): Block {
  return {
    id: `box-${Date.now()}-${index}`,
    type: 'colored-box',
    content,
    color,
  };
}

function createImageBlock(src: string, alt: string, index: number): Block {
  return {
    id: `image-${Date.now()}-${index}`,
    type: 'image',
    src,
    alt,
    width: 100,
  };
}

function createQuoteBlock(content: string, index: number): Block {
  return {
    id: `quote-${Date.now()}-${index}`,
    type: 'quote',
    content,
  };
}

function createListBlock(items: string[], ordered: boolean, index: number): Block {
  return {
    id: `list-${Date.now()}-${index}`,
    type: 'list',
    items,
    ordered,
  };
}

function createTableBlock(children: any, index: number): Block {
  // Basic table extraction - can be enhanced
  return {
    id: `table-${Date.now()}-${index}`,
    type: 'table',
    headers: ['Column 1', 'Column 2'],
    rows: [['', '']],
  };
}

function createDividerBlock(index: number): Block {
  return {
    id: `divider-${Date.now()}-${index}`,
    type: 'divider',
  };
}
