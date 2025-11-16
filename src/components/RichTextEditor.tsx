import { useMemo, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Sword, Shield, Sparkles, Star, Zap, Heart, Crown, Gem } from "lucide-react";

// Register custom formats
const Block = Quill.import('blots/block');

class ColoredBoxBlot extends Block {
  static create(value: string) {
    const node = super.create();
    node.setAttribute('data-box-color', value);
    node.classList.add('colored-box', `box-${value}`);
    return node;
  }

  static formats(node: HTMLElement) {
    return node.getAttribute('data-box-color');
  }
}

ColoredBoxBlot.blotName = 'coloredBox';
ColoredBoxBlot.tagName = 'div';
ColoredBoxBlot.className = 'colored-box';

Quill.register(ColoredBoxBlot);

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const quillRef = useRef<ReactQuill>(null);

  const insertIcon = (iconName: string, iconSvg: string) => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    const range = quill.getSelection();
    if (range) {
      quill.insertEmbed(range.index, 'html', `<span class="inline-icon" data-icon="${iconName}">${iconSvg}</span>`);
      quill.setSelection(range.index + 1, 0);
    }
  };

  const insertColoredBox = (color: string) => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    const range = quill.getSelection();
    if (range) {
      quill.insertText(range.index, '\n', 'user');
      quill.formatLine(range.index + 1, 1, 'coloredBox', color);
      quill.setSelection(range.index + 1, 0);
    }
  };

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': ['#ef4444', '#22c55e', '#3b82f6', '#eab308', '#a855f7', '#f97316'] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['link', 'image'],
        ['clean'],
        ['colored-box-red', 'colored-box-green', 'colored-box-blue', 'colored-box-yellow'],
        ['icon-sword', 'icon-shield', 'icon-sparkles', 'icon-star', 'icon-zap', 'icon-heart', 'icon-crown', 'icon-gem']
      ],
      handlers: {
        'colored-box-red': () => insertColoredBox('red'),
        'colored-box-green': () => insertColoredBox('green'),
        'colored-box-blue': () => insertColoredBox('blue'),
        'colored-box-yellow': () => insertColoredBox('yellow'),
        'icon-sword': () => insertIcon('sword', '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 17.5 3 6V3h3l11.5 11.5"/><path d="M13 19 9 15"/><path d="m16 16 5 5"/><path d="m19 14 2 2"/></svg>'),
        'icon-shield': () => insertIcon('shield', '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>'),
        'icon-sparkles': () => insertIcon('sparkles', '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>'),
        'icon-star': () => insertIcon('star', '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'),
        'icon-zap': () => insertIcon('zap', '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>'),
        'icon-heart': () => insertIcon('heart', '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>'),
        'icon-crown': () => insertIcon('crown', '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/></svg>'),
        'icon-gem': () => insertIcon('gem', '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/></svg>')
      }
    }
  }), []);

  return (
    <div>
      <div className="mb-2 flex flex-wrap gap-2 p-2 bg-muted/50 rounded border border-border">
        <div className="text-xs font-semibold text-muted-foreground">Quick Insert:</div>
        <button
          onClick={() => insertColoredBox('red')}
          className="px-2 py-1 text-xs rounded bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30"
        >
          Red Box
        </button>
        <button
          onClick={() => insertColoredBox('green')}
          className="px-2 py-1 text-xs rounded bg-green-500/20 border border-green-500/30 text-green-400 hover:bg-green-500/30"
        >
          Green Box
        </button>
        <button
          onClick={() => insertColoredBox('blue')}
          className="px-2 py-1 text-xs rounded bg-blue-500/20 border border-blue-500/30 text-blue-400 hover:bg-blue-500/30"
        >
          Blue Box
        </button>
        <button
          onClick={() => insertColoredBox('yellow')}
          className="px-2 py-1 text-xs rounded bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/30"
        >
          Yellow Box
        </button>
        <div className="border-l border-border mx-1"></div>
        <button onClick={() => insertIcon('sword', '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 17.5 3 6V3h3l11.5 11.5"/></svg>')} className="p-1 hover:bg-accent rounded"><Sword className="w-4 h-4" /></button>
        <button onClick={() => insertIcon('shield', '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>')} className="p-1 hover:bg-accent rounded"><Shield className="w-4 h-4" /></button>
        <button onClick={() => insertIcon('sparkles', '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>')} className="p-1 hover:bg-accent rounded"><Sparkles className="w-4 h-4" /></button>
        <button onClick={() => insertIcon('star', '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>')} className="p-1 hover:bg-accent rounded"><Star className="w-4 h-4" /></button>
        <button onClick={() => insertIcon('zap', '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>')} className="p-1 hover:bg-accent rounded"><Zap className="w-4 h-4" /></button>
        <button onClick={() => insertIcon('heart', '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>')} className="p-1 hover:bg-accent rounded"><Heart className="w-4 h-4" /></button>
        <button onClick={() => insertIcon('crown', '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/></svg>')} className="p-1 hover:bg-accent rounded"><Crown className="w-4 h-4" /></button>
        <button onClick={() => insertIcon('gem', '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3h12l4 6-10 13L2 9Z"/></svg>')} className="p-1 hover:bg-accent rounded"><Gem className="w-4 h-4" /></button>
      </div>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        className="bg-background"
      />
      <p className="text-xs text-muted-foreground mt-2">
        Use colored boxes and icons to make your content more engaging. Images can be added via URL or uploaded.
      </p>
    </div>
  );
}
