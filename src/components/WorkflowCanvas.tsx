import { useRef, useState, useCallback, useEffect } from 'react';
import { WorkflowNode, Connection, NodeType } from '@/types/workflow';
import { WorkflowNodeComponent } from './WorkflowNode';
import { ConnectionLine, TempConnectionLine } from './ConnectionLine';
import { cn } from '@/lib/utils';

interface WorkflowCanvasProps {
  nodes: WorkflowNode[];
  connections: Connection[];
  selectedNodeId: string | null;
  connectingFrom: { nodeId: string; output: number } | null;
  zoom: number;
  pan: { x: number; y: number };
  onNodeSelect: (nodeId: string | null) => void;
  onNodeDelete: (nodeId: string) => void;
  onNodeMove: (nodeId: string, position: { x: number; y: number }) => void;
  onConnectionStart: (nodeId: string, output: number) => void;
  onConnectionEnd: (targetId?: string, targetInput?: number) => void;
  onZoomChange: (zoom: number) => void;
  onPanChange: (pan: { x: number; y: number }) => void;
  onDrop: (nodeType: NodeType, position: { x: number; y: number }) => void;
}

export function WorkflowCanvas({
  nodes,
  connections,
  selectedNodeId,
  connectingFrom,
  zoom,
  pan,
  onNodeSelect,
  onNodeDelete,
  onNodeMove,
  onConnectionStart,
  onConnectionEnd,
  onZoomChange,
  onPanChange,
  onDrop,
}: WorkflowCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Get canvas-relative position from mouse event
  const getCanvasPosition = useCallback((clientX: number, clientY: number) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: (clientX - rect.left - pan.x) / zoom,
      y: (clientY - rect.top - pan.y) / zoom,
    };
  }, [pan, zoom]);

  // Handle wheel zoom
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    onZoomChange(Math.max(0.25, Math.min(2, zoom + delta)));
  }, [zoom, onZoomChange]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.addEventListener('wheel', handleWheel, { passive: false });
    return () => canvas.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  // Handle panning
  const handleCanvasMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.target === canvasRef.current || (e.target as HTMLElement).closest('.canvas-grid-bg')) {
      onNodeSelect(null);
      if (e.button === 0) {
        setIsPanning(true);
        setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
      }
    }
  }, [pan, onNodeSelect]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });

    if (isPanning) {
      onPanChange({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y,
      });
    }

    if (draggedNode) {
      const pos = getCanvasPosition(e.clientX, e.clientY);
      onNodeMove(draggedNode, {
        x: pos.x - dragOffset.x,
        y: pos.y - dragOffset.y,
      });
    }
  }, [isPanning, panStart, draggedNode, dragOffset, getCanvasPosition, onPanChange, onNodeMove]);

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
    setDraggedNode(null);
    if (connectingFrom) {
      onConnectionEnd();
    }
  }, [connectingFrom, onConnectionEnd]);

  // Handle node dragging
  const handleNodeDragStart = useCallback((nodeId: string) => (e: React.MouseEvent) => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;
    
    const pos = getCanvasPosition(e.clientX, e.clientY);
    setDraggedNode(nodeId);
    setDragOffset({
      x: pos.x - node.position.x,
      y: pos.y - node.position.y,
    });
  }, [nodes, getCanvasPosition]);

  // Handle drop from palette
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const nodeTypeData = e.dataTransfer.getData('nodeType');
    if (!nodeTypeData) return;
    
    try {
      const nodeType = JSON.parse(nodeTypeData) as NodeType;
      const pos = getCanvasPosition(e.clientX, e.clientY);
      onDrop(nodeType, { x: pos.x - 100, y: pos.y - 40 }); // Center node on drop
    } catch {
      console.error('Failed to parse node type');
    }
  }, [getCanvasPosition, onDrop]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  // Get temp connection line end position
  const getTempLineEnd = () => {
    if (!canvasRef.current || !connectingFrom) return { x: 0, y: 0 };
    return getCanvasPosition(mousePos.x, mousePos.y);
  };

  // Get temp connection line start position
  const getTempLineStart = () => {
    if (!connectingFrom) return { x: 0, y: 0 };
    const node = nodes.find(n => n.id === connectingFrom.nodeId);
    if (!node) return { x: 0, y: 0 };
    
    const nodeWidth = 200;
    const nodeHeight = 80;
    return {
      x: node.position.x + nodeWidth + 6,
      y: node.position.y + nodeHeight / 2,
    };
  };

  return (
    <div
      ref={canvasRef}
      className={cn(
        "flex-1 overflow-hidden relative bg-canvas-bg",
        isPanning && "cursor-grabbing",
        !isPanning && !draggedNode && "cursor-grab"
      )}
      onMouseDown={handleCanvasMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {/* Grid background */}
      <div 
        className="canvas-grid-bg absolute inset-0 canvas-grid"
        style={{
          backgroundPosition: `${pan.x}px ${pan.y}px`,
          backgroundSize: `${20 * zoom}px ${20 * zoom}px`,
        }}
      />

      {/* Transform container */}
      <div
        className="absolute"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: '0 0',
        }}
      >
        {/* Connections SVG */}
        <svg
          className="absolute inset-0 pointer-events-none"
          style={{
            width: '10000px',
            height: '10000px',
            overflow: 'visible',
          }}
        >
          <g className="pointer-events-auto">
            {connections.map(conn => (
              <ConnectionLine
                key={conn.id}
                connection={conn}
                nodes={nodes}
              />
            ))}
            {connectingFrom && (
              <TempConnectionLine
                start={getTempLineStart()}
                end={getTempLineEnd()}
              />
            )}
          </g>
        </svg>

        {/* Nodes */}
        {nodes.map(node => (
          <div
            key={node.id}
            className="absolute"
            style={{
              left: node.position.x,
              top: node.position.y,
            }}
          >
            <WorkflowNodeComponent
              node={node}
              isSelected={selectedNodeId === node.id}
              onSelect={() => onNodeSelect(node.id)}
              onDelete={() => onNodeDelete(node.id)}
              onDragStart={handleNodeDragStart(node.id)}
              onOutputMouseDown={(output) => onConnectionStart(node.id, output)}
              onInputMouseUp={(input) => {
                if (connectingFrom && connectingFrom.nodeId !== node.id) {
                  onConnectionEnd(node.id, input);
                }
              }}
            />
          </div>
        ))}
      </div>

      {/* Zoom indicator */}
      <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-card/90 backdrop-blur-sm rounded-lg border border-border shadow-sm">
        <span className="text-sm font-medium text-muted-foreground">
          {Math.round(zoom * 100)}%
        </span>
      </div>
    </div>
  );
}
