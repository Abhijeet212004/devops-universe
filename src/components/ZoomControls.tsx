import { 
  Maximize2, 
  ZoomIn, 
  ZoomOut, 
  Undo, 
  MousePointer2
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface ZoomControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomFit: () => void;
  onUndo: () => void;
}

export function ZoomControls({
  zoom,
  onZoomIn,
  onZoomOut,
  onZoomFit,
  onUndo,
}: ZoomControlsProps) {
  return (
    <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-card/95 backdrop-blur-sm rounded-lg border border-border shadow-lg p-1">
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onZoomFit}
            className="w-8 h-8 rounded-md hover:bg-accent flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent>Fit to Screen</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onZoomIn}
            className="w-8 h-8 rounded-md hover:bg-accent flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent>Zoom In</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onZoomOut}
            className="w-8 h-8 rounded-md hover:bg-accent flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent>Zoom Out</TooltipContent>
      </Tooltip>

      <div className="w-px h-5 bg-border mx-1" />

      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onUndo}
            className="w-8 h-8 rounded-md hover:bg-accent flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <Undo className="w-4 h-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent>Undo</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <button className="w-8 h-8 rounded-md hover:bg-accent flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <MousePointer2 className="w-4 h-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent>Select Mode</TooltipContent>
      </Tooltip>
    </div>
  );
}
