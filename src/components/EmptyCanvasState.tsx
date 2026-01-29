import { Plus, Sparkles } from 'lucide-react';

interface EmptyCanvasStateProps {
  onAddNode: () => void;
}

export function EmptyCanvasState({ onAddNode }: EmptyCanvasStateProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="flex items-center gap-6 pointer-events-auto">
        {/* Add first step */}
        <button
          onClick={onAddNode}
          className="group flex flex-col items-center gap-3"
        >
          <div className="w-20 h-20 rounded-xl border-2 border-dashed border-muted-foreground/30 group-hover:border-primary/50 flex items-center justify-center transition-colors bg-card/50 group-hover:bg-primary/5">
            <Plus className="w-8 h-8 text-muted-foreground/50 group-hover:text-primary transition-colors" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              Add first step...
            </p>
            <p className="text-xs text-primary mt-0.5 cursor-pointer hover:underline">
              or start from a template
            </p>
          </div>
        </button>

        <span className="text-sm text-muted-foreground">or</span>

        {/* Build with AI */}
        <button className="group flex flex-col items-center gap-3">
          <div className="w-20 h-20 rounded-xl border-2 border-dashed border-primary/30 group-hover:border-primary/50 flex items-center justify-center transition-colors bg-primary/5 group-hover:bg-primary/10">
            <Sparkles className="w-8 h-8 text-primary/50 group-hover:text-primary transition-colors" />
          </div>
          <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
            Build with AI
          </p>
        </button>
      </div>
    </div>
  );
}
