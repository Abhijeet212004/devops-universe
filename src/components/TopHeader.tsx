import { useState } from 'react';
import { 
  ChevronRight, 
  Plus, 
  MoreHorizontal, 
  History,
  Play,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TopHeaderProps {
  workflowName: string;
  projectName: string;
  activeTab: 'editor' | 'executions' | 'evaluations';
  onTabChange: (tab: 'editor' | 'executions' | 'evaluations') => void;
  onRun: () => void;
  isRunning: boolean;
  hasNodes: boolean;
}

export function TopHeader({
  workflowName,
  projectName,
  activeTab,
  onTabChange,
  onRun,
  isRunning,
  hasNodes,
}: TopHeaderProps) {
  return (
    <div className="h-14 bg-card border-b border-border flex items-center justify-between px-4">
      {/* Left - Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Zap className="w-4 h-4 text-primary" />
          <span className="hover:text-foreground cursor-pointer">{projectName}</span>
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
        <span className="font-medium text-foreground">{workflowName}</span>
        <button className="ml-2 text-xs text-primary hover:text-primary/80">
          + Add tag
        </button>
      </div>

      {/* Center - Tabs */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
        <div className="flex items-center bg-muted rounded-lg p-1">
          {(['editor', 'executions', 'evaluations'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={cn(
                "px-4 py-1.5 text-sm font-medium rounded-md transition-colors capitalize",
                activeTab === tab
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm"
          disabled={!hasNodes}
        >
          Publish
        </Button>
        
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <History className="w-4 h-4" />
        </Button>
        
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        <Button
          size="sm"
          onClick={onRun}
          disabled={!hasNodes || isRunning}
          className="bg-node-cicd hover:bg-node-cicd/90 gap-2"
        >
          <Play className="w-3.5 h-3.5" />
          {isRunning ? 'Running...' : 'Execute'}
        </Button>
      </div>
    </div>
  );
}
