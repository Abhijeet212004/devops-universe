import { memo, useCallback } from 'react';
import { WorkflowNode, NodeCategory } from '@/types/workflow';
import { DynamicIcon } from './DynamicIcon';
import { cn } from '@/lib/utils';
import { X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface WorkflowNodeComponentProps {
  node: WorkflowNode;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onDragStart: (e: React.MouseEvent) => void;
  onOutputMouseDown: (outputIndex: number) => void;
  onInputMouseUp: (inputIndex: number) => void;
}

const getCategoryHeaderClass = (category: NodeCategory) => {
  const colorMap: Record<NodeCategory, string> = {
    cloud: 'node-header-cloud',
    cicd: 'node-header-cicd',
    container: 'node-header-container',
    monitoring: 'node-header-monitoring',
    security: 'node-header-security',
    database: 'node-header-database',
    messaging: 'node-header-messaging',
    config: 'node-header-config',
  };
  return colorMap[category];
};

const getStatusIcon = (status: WorkflowNode['status']) => {
  switch (status) {
    case 'running':
      return <Loader2 className="w-4 h-4 animate-spin text-primary" />;
    case 'success':
      return <CheckCircle className="w-4 h-4 text-node-cicd" />;
    case 'error':
      return <AlertCircle className="w-4 h-4 text-destructive" />;
    default:
      return null;
  }
};

export const WorkflowNodeComponent = memo(function WorkflowNodeComponent({
  node,
  isSelected,
  onSelect,
  onDelete,
  onDragStart,
  onOutputMouseDown,
  onInputMouseUp,
}: WorkflowNodeComponentProps) {
  const { type, status } = node;

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();
    if (e.button === 0) {
      onDragStart(e);
    }
  }, [onSelect, onDragStart]);

  return (
    <div
      className={cn(
        "node-base w-[200px] select-none",
        isSelected && "node-selected",
        status === 'running' && "ring-2 ring-primary/50",
        status === 'success' && "ring-2 ring-node-cicd/50",
        status === 'error' && "ring-2 ring-destructive/50"
      )}
      onMouseDown={handleMouseDown}
    >
      {/* Input handles */}
      {type.inputs > 0 && (
        <div className="absolute -left-[6px] top-1/2 -translate-y-1/2 flex flex-col gap-2">
          {Array.from({ length: type.inputs }).map((_, i) => (
            <div
              key={i}
              className="node-handle cursor-crosshair"
              onMouseUp={(e) => {
                e.stopPropagation();
                onInputMouseUp(i);
              }}
            />
          ))}
        </div>
      )}

      {/* Header */}
      <div className={cn(
        "px-3 py-2 rounded-t-lg flex items-center gap-2",
        getCategoryHeaderClass(type.category)
      )}>
        <DynamicIcon name={type.icon} size={16} className="text-white" />
        <span className="text-sm font-medium text-white flex-1 truncate">
          {type.name}
        </span>
        {status && getStatusIcon(status)}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="opacity-0 group-hover:opacity-100 hover:opacity-100 focus:opacity-100 p-0.5 rounded hover:bg-white/20 transition-opacity"
        >
          <X className="w-3.5 h-3.5 text-white" />
        </button>
      </div>

      {/* Body */}
      <div className="px-3 py-2.5 text-xs text-muted-foreground">
        {type.description}
      </div>

      {/* Output handles */}
      {type.outputs > 0 && (
        <div className="absolute -right-[6px] top-1/2 -translate-y-1/2 flex flex-col gap-2">
          {Array.from({ length: type.outputs }).map((_, i) => (
            <div
              key={i}
              className="node-handle cursor-crosshair"
              onMouseDown={(e) => {
                e.stopPropagation();
                onOutputMouseDown(i);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
});
