import { 
  Plus, 
  Search, 
  Copy, 
  LayoutGrid,
  Sparkles
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface RightToolbarProps {
  onAddNode: () => void;
}

export function RightToolbar({ onAddNode }: RightToolbarProps) {
  return (
    <div className="w-12 h-full bg-card border-l border-border flex flex-col items-center py-3 gap-1">
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onAddNode}
            className="w-9 h-9 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 flex items-center justify-center text-muted-foreground hover:text-primary transition-all"
          >
            <Plus className="w-5 h-5" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="left">Add Node</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <button className="w-9 h-9 rounded-lg hover:bg-accent flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <Search className="w-4 h-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="left">Search Nodes</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <button className="w-9 h-9 rounded-lg hover:bg-accent flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <Copy className="w-4 h-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="left">Templates</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <button className="w-9 h-9 rounded-lg hover:bg-accent flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <LayoutGrid className="w-4 h-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="left">Node Library</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <button className="w-9 h-9 rounded-lg bg-accent border border-primary/20 hover:border-primary/40 flex items-center justify-center text-primary hover:text-primary/80 transition-all">
            <Sparkles className="w-4 h-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="left">Build with AI</TooltipContent>
      </Tooltip>
    </div>
  );
}
