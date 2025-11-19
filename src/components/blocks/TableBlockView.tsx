import { TableBlock } from "@/types/block";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, Plus } from "lucide-react";

interface TableBlockViewProps {
  block: TableBlock;
  isEditable?: boolean;
  onUpdate?: (updates: Partial<TableBlock>) => void;
  onDelete?: () => void;
}

export function TableBlockView({ block, isEditable, onUpdate, onDelete }: TableBlockViewProps) {
  const addColumn = () => {
    onUpdate?.({
      headers: [...block.headers, 'New Column'],
      rows: block.rows.map(row => [...row, '']),
    });
  };

  const addRow = () => {
    onUpdate?.({
      rows: [...block.rows, new Array(block.headers.length).fill('')],
    });
  };

  const updateHeader = (index: number, value: string) => {
    const newHeaders = [...block.headers];
    newHeaders[index] = value;
    onUpdate?.({ headers: newHeaders });
  };

  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    const newRows = [...block.rows];
    newRows[rowIndex][colIndex] = value;
    onUpdate?.({ rows: newRows });
  };

  if (!isEditable) {
    return (
      <div className="my-4 rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {block.headers.map((header, i) => (
                <TableHead key={i}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {block.rows.map((row, i) => (
              <TableRow key={i}>
                {row.map((cell, j) => (
                  <TableCell key={j}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={addRow}>
            <Plus className="w-3 h-3 mr-1" />
            Row
          </Button>
          <Button size="sm" variant="outline" onClick={addColumn}>
            <Plus className="w-3 h-3 mr-1" />
            Column
          </Button>
        </div>
        <Button size="sm" variant="ghost" onClick={onDelete} className="text-destructive">
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
      <div className="rounded-lg border overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {block.headers.map((header, i) => (
                <TableHead key={i}>
                  <Input
                    value={header}
                    onChange={(e) => updateHeader(i, e.target.value)}
                    className="h-7 text-xs"
                  />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {block.rows.map((row, i) => (
              <TableRow key={i}>
                {row.map((cell, j) => (
                  <TableCell key={j}>
                    <Input
                      value={cell}
                      onChange={(e) => updateCell(i, j, e.target.value)}
                      className="h-7 text-xs"
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
