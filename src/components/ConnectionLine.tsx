import { memo } from 'react';
import { Connection, WorkflowNode } from '@/types/workflow';

interface ConnectionLineProps {
  connection: Connection;
  nodes: WorkflowNode[];
  isSelected?: boolean;
  onSelect?: () => void;
}

const getNodeHandlePosition = (
  node: WorkflowNode,
  isOutput: boolean,
  handleIndex: number,
  totalHandles: number
) => {
  const nodeWidth = 200;
  const nodeHeight = 80; // Approximate
  const handleOffset = 12;
  
  const x = node.position.x + (isOutput ? nodeWidth : 0);
  const baseY = node.position.y + nodeHeight / 2;
  
  // If multiple handles, space them out
  if (totalHandles > 1) {
    const spacing = 20;
    const totalHeight = (totalHandles - 1) * spacing;
    const startY = baseY - totalHeight / 2;
    return { x: x + (isOutput ? handleOffset : -handleOffset), y: startY + handleIndex * spacing };
  }
  
  return { x: x + (isOutput ? handleOffset : -handleOffset), y: baseY };
};

const createBezierPath = (
  start: { x: number; y: number },
  end: { x: number; y: number }
) => {
  const controlPointOffset = Math.min(Math.abs(end.x - start.x) / 2, 150);
  
  return `M ${start.x} ${start.y} 
          C ${start.x + controlPointOffset} ${start.y}, 
            ${end.x - controlPointOffset} ${end.y}, 
            ${end.x} ${end.y}`;
};

export const ConnectionLine = memo(function ConnectionLine({
  connection,
  nodes,
  isSelected,
  onSelect,
}: ConnectionLineProps) {
  const sourceNode = nodes.find(n => n.id === connection.sourceId);
  const targetNode = nodes.find(n => n.id === connection.targetId);
  
  if (!sourceNode || !targetNode) return null;

  const start = getNodeHandlePosition(
    sourceNode,
    true,
    connection.sourceOutput,
    sourceNode.type.outputs
  );
  
  const end = getNodeHandlePosition(
    targetNode,
    false,
    connection.targetInput,
    targetNode.type.inputs
  );

  const path = createBezierPath(start, end);

  // Determine color based on source node status
  const getStrokeColor = () => {
    switch (sourceNode.status) {
      case 'running':
        return 'hsl(var(--primary))';
      case 'success':
        return 'hsl(var(--node-cicd))';
      case 'error':
        return 'hsl(var(--destructive))';
      default:
        return isSelected ? 'hsl(var(--primary))' : 'hsl(var(--connection-default))';
    }
  };

  return (
    <g className="cursor-pointer" onClick={onSelect}>
      {/* Invisible wider path for easier clicking */}
      <path
        d={path}
        fill="none"
        stroke="transparent"
        strokeWidth={20}
      />
      {/* Visible path */}
      <path
        d={path}
        fill="none"
        stroke={getStrokeColor()}
        strokeWidth={isSelected ? 3 : 2}
        strokeLinecap="round"
        className={sourceNode.status === 'running' ? 'animate-pulse-soft' : ''}
        style={{
          strokeDasharray: sourceNode.status === 'running' ? '5 5' : 'none',
        }}
      />
      {/* Arrow at the end */}
      <circle
        cx={end.x}
        cy={end.y}
        r={4}
        fill={getStrokeColor()}
      />
    </g>
  );
});

interface TempConnectionLineProps {
  start: { x: number; y: number };
  end: { x: number; y: number };
}

export const TempConnectionLine = memo(function TempConnectionLine({
  start,
  end,
}: TempConnectionLineProps) {
  const path = createBezierPath(start, end);

  return (
    <path
      d={path}
      fill="none"
      stroke="hsl(var(--primary))"
      strokeWidth={2}
      strokeLinecap="round"
      strokeDasharray="5 5"
      className="pointer-events-none"
    />
  );
});
