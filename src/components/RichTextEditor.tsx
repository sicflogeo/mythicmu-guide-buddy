import { useMemo, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Sword, Shield, Sparkles, Star, Zap, Heart, Crown, Gem, Code, Grid3x3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

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
  const [htmlCode, setHtmlCode] = useState("");
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);
  const [showHtmlDialog, setShowHtmlDialog] = useState(false);
  const [showTableDialog, setShowTableDialog] = useState(false);
  const [showIconPicker, setShowIconPicker] = useState(false);

  const iconsList = [
    { name: 'sword', symbol: '⚔️', html: '<span class="inline-icon">⚔️</span>' },
    { name: 'shield', symbol: '🛡️', html: '<span class="inline-icon">🛡️</span>' },
    { name: 'star', symbol: '⭐', html: '<span class="inline-icon">⭐</span>' },
    { name: 'sparkles', symbol: '✨', html: '<span class="inline-icon">✨</span>' },
    { name: 'zap', symbol: '⚡', html: '<span class="inline-icon">⚡</span>' },
    { name: 'heart', symbol: '❤️', html: '<span class="inline-icon">❤️</span>' },
    { name: 'crown', symbol: '👑', html: '<span class="inline-icon">👑</span>' },
    { name: 'gem', symbol: '💎', html: '<span class="inline-icon">💎</span>' },
    { name: 'fire', symbol: '🔥', html: '<span class="inline-icon">🔥</span>' },
    { name: 'magic', symbol: '🪄', html: '<span class="inline-icon">🪄</span>' },
    { name: 'potion', symbol: '🧪', html: '<span class="inline-icon">🧪</span>' },
    { name: 'scroll', symbol: '📜', html: '<span class="inline-icon">📜</span>' },
    { name: 'trophy', symbol: '🏆', html: '<span class="inline-icon">🏆</span>' },
    { name: 'target', symbol: '🎯', html: '<span class="inline-icon">🎯</span>' },
  ];

  const insertIcon = (html: string) => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    const range = quill.getSelection();
    if (range) {
      const delta = quill.clipboard.convert(html);
      quill.updateContents({ ops: [{ retain: range.index }, ...delta.ops] } as any);
      quill.setSelection(range.index + 1, 0);
    }
    setShowIconPicker(false);
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

  const insertCustomHtml = () => {
    const quill = quillRef.current?.getEditor();
    if (!quill || !htmlCode.trim()) return;

    const range = quill.getSelection();
    if (range) {
      const delta = quill.clipboard.convert(htmlCode);
      quill.updateContents({ ops: [{ retain: range.index }, ...delta.ops] } as any);
      quill.setSelection(range.index + 1, 0);
    }
    setHtmlCode("");
    setShowHtmlDialog(false);
  };

  const insertTable = () => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    let tableHtml = '<table class="custom-table"><tbody>';
    for (let i = 0; i < tableRows; i++) {
      tableHtml += '<tr>';
      for (let j = 0; j < tableCols; j++) {
        tableHtml += i === 0 ? '<th>Header</th>' : '<td>Cell</td>';
      }
      tableHtml += '</tr>';
    }
    tableHtml += '</tbody></table>';

    const range = quill.getSelection();
    if (range) {
      const delta = quill.clipboard.convert(tableHtml);
      quill.updateContents({ ops: [{ retain: range.index }, ...delta.ops] } as any);
      quill.setSelection(range.index + 1, 0);
    }
    setShowTableDialog(false);
  };

  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': ['#ef4444', '#22c55e', '#3b82f6', '#eab308', '#a855f7', '#f97316'] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ],
    clipboard: {
      matchVisual: false
    }
  }), []);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => insertColoredBox('red')}
          className="px-3 py-1.5 text-xs rounded bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition"
        >
          Red Box
        </button>
        <button
          onClick={() => insertColoredBox('green')}
          className="px-3 py-1.5 text-xs rounded bg-green-500/20 border border-green-500/30 text-green-400 hover:bg-green-500/30 transition"
        >
          Green Box
        </button>
        <button
          onClick={() => insertColoredBox('blue')}
          className="px-3 py-1.5 text-xs rounded bg-blue-500/20 border border-blue-500/30 text-blue-400 hover:bg-blue-500/30 transition"
        >
          Blue Box
        </button>
        <button
          onClick={() => insertColoredBox('yellow')}
          className="px-3 py-1.5 text-xs rounded bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/30 transition"
        >
          Yellow Box
        </button>

        <Dialog open={showIconPicker} onOpenChange={setShowIconPicker}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Sparkles className="w-4 h-4" />
              Insert Icon
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Choose an Icon</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-7 gap-2 py-4">
              {iconsList.map((icon) => (
                <button
                  key={icon.name}
                  onClick={() => insertIcon(icon.html)}
                  className="p-3 text-2xl hover:bg-accent rounded border border-border hover:border-primary transition"
                  title={icon.name}
                >
                  {icon.symbol}
                </button>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showTableDialog} onOpenChange={setShowTableDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Grid3x3 className="w-4 h-4" />
              Insert Table
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Table</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label>Rows</Label>
                <Input
                  type="number"
                  min="1"
                  max="20"
                  value={tableRows}
                  onChange={(e) => setTableRows(parseInt(e.target.value) || 1)}
                />
              </div>
              <div>
                <Label>Columns</Label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={tableCols}
                  onChange={(e) => setTableCols(parseInt(e.target.value) || 1)}
                />
              </div>
              <Button onClick={insertTable} className="w-full">
                Insert Table
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showHtmlDialog} onOpenChange={setShowHtmlDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Code className="w-4 h-4" />
              Custom HTML
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Insert Custom HTML</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label>HTML Code</Label>
                <textarea
                  value={htmlCode}
                  onChange={(e) => setHtmlCode(e.target.value)}
                  className="w-full h-32 mt-2 p-2 rounded border border-border bg-background font-mono text-sm"
                  placeholder="<div>Your HTML here...</div>"
                />
              </div>
              <Button onClick={insertCustomHtml} className="w-full">
                Insert HTML
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        className="bg-background min-h-[300px]"
      />
    </div>
  );
}
