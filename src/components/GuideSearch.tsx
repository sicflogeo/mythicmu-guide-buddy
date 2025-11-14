import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface GuideSearchProps {
  value: string;
  onChange: (value: string) => void;
  resultsCount?: number;
}

export function GuideSearch({ value, onChange, resultsCount }: GuideSearchProps) {
  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search guides... (e.g., 'character classes', 'equipment', 'dungeons')"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10 pr-20 h-12 bg-card/50 border-border focus:border-primary focus:ring-primary"
        />
        {value && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {resultsCount !== undefined && (
              <span className="text-xs text-muted-foreground">
                {resultsCount} {resultsCount === 1 ? 'match' : 'matches'}
              </span>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onChange("")}
              className="h-8 w-8 p-0 hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
