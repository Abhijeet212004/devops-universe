import { useState } from 'react';
import { ChevronUp, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogsPanelProps {
  logs: string[];
}

export function LogsPanel({ logs }: LogsPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={cn(
      "absolute bottom-0 left-16 right-14 bg-card border-t border-border transition-all duration-200",
      isExpanded ? "h-48" : "h-10"
    )}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full h-10 px-4 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <Terminal className="w-4 h-4" />
        <span>Logs</span>
        <ChevronUp className={cn(
          "w-4 h-4 ml-auto transition-transform",
          isExpanded && "rotate-180"
        )} />
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 h-[calc(100%-2.5rem)] overflow-auto custom-scrollbar">
          {logs.length === 0 ? (
            <div className="text-xs text-muted-foreground">
              No logs yet. Execute a workflow to see logs here.
            </div>
          ) : (
            <div className="space-y-1 font-mono text-xs">
              {logs.map((log, i) => (
                <div key={i} className="text-muted-foreground">
                  {log}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
