import { useState, useCallback } from 'react';
import { NodePalette } from '@/components/NodePalette';
import { WorkflowCanvas } from '@/components/WorkflowCanvas';
import { NodeConfigPanel } from '@/components/NodeConfigPanel';
import { Toolbar } from '@/components/Toolbar';
import { useWorkflow } from '@/hooks/useWorkflow';
import { NodeType } from '@/types/workflow';
import { toast } from 'sonner';

export default function WorkflowEditor() {
  const {
    nodes,
    connections,
    canvasState,
    selectedNode,
    addNode,
    updateNodePosition,
    updateNodeConfig,
    deleteNode,
    selectNode,
    setZoom,
    setPan,
    startConnecting,
    endConnecting,
    runWorkflow,
    resetWorkflow,
    clearWorkflow,
  } = useWorkflow();

  const [isRunning, setIsRunning] = useState(false);

  const handleDragStart = useCallback(() => {
    // Optional: could show a ghost preview
  }, []);

  const handleDrop = useCallback((nodeType: NodeType, position: { x: number; y: number }) => {
    addNode(nodeType, position);
    toast.success(`Added ${nodeType.name} node`);
  }, [addNode]);

  const handleRun = useCallback(async () => {
    setIsRunning(true);
    toast.info('Executing workflow...');
    await runWorkflow();
    setIsRunning(false);
    toast.success('Workflow execution complete');
  }, [runWorkflow]);

  const handleStop = useCallback(() => {
    setIsRunning(false);
    resetWorkflow();
    toast.info('Workflow stopped');
  }, [resetWorkflow]);

  const handleSave = useCallback(() => {
    const workflow = {
      nodes,
      connections,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem('opsflow-workflow', JSON.stringify(workflow));
    toast.success('Workflow saved');
  }, [nodes, connections]);

  const handleLoad = useCallback(() => {
    const saved = localStorage.getItem('opsflow-workflow');
    if (saved) {
      toast.info('Load functionality coming soon');
    } else {
      toast.error('No saved workflow found');
    }
  }, []);

  const handleClear = useCallback(() => {
    clearWorkflow();
    toast.success('Canvas cleared');
  }, [clearWorkflow]);

  return (
    <div className="h-screen w-full flex overflow-hidden">
      {/* Left sidebar - Node palette */}
      <div className="w-64 flex-shrink-0">
        <NodePalette onDragStart={handleDragStart} />
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <Toolbar
          zoom={canvasState.zoom}
          isRunning={isRunning}
          hasNodes={nodes.length > 0}
          onZoomIn={() => setZoom(canvasState.zoom + 0.1)}
          onZoomOut={() => setZoom(canvasState.zoom - 0.1)}
          onZoomFit={() => {
            setZoom(1);
            setPan({ x: 0, y: 0 });
          }}
          onRun={handleRun}
          onStop={handleStop}
          onReset={resetWorkflow}
          onClear={handleClear}
          onSave={handleSave}
          onLoad={handleLoad}
        />

        {/* Canvas */}
        <WorkflowCanvas
          nodes={nodes}
          connections={connections}
          selectedNodeId={canvasState.selectedNodeId}
          connectingFrom={canvasState.connectingFrom}
          zoom={canvasState.zoom}
          pan={canvasState.pan}
          onNodeSelect={selectNode}
          onNodeDelete={deleteNode}
          onNodeMove={updateNodePosition}
          onConnectionStart={startConnecting}
          onConnectionEnd={endConnecting}
          onZoomChange={setZoom}
          onPanChange={setPan}
          onDrop={handleDrop}
        />
      </div>

      {/* Right sidebar - Config panel */}
      {selectedNode && (
        <NodeConfigPanel
          node={selectedNode}
          onClose={() => selectNode(null)}
          onConfigChange={(config) => updateNodeConfig(selectedNode.id, config)}
          onDelete={() => deleteNode(selectedNode.id)}
        />
      )}
    </div>
  );
}
