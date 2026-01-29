import { useState, useCallback } from 'react';
import { LeftIconSidebar } from '@/components/LeftIconSidebar';
import { RightToolbar } from '@/components/RightToolbar';
import { TopHeader } from '@/components/TopHeader';
import { WorkflowCanvas } from '@/components/WorkflowCanvas';
import { NodeConfigPanel } from '@/components/NodeConfigPanel';
import { ZoomControls } from '@/components/ZoomControls';
import { LogsPanel } from '@/components/LogsPanel';
import { NodeSearchModal } from '@/components/NodeSearchModal';
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
  } = useWorkflow();

  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'executions' | 'evaluations'>('editor');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const handleAddNode = useCallback(() => {
    setIsSearchOpen(true);
  }, []);

  const handleSelectNode = useCallback((nodeType: NodeType) => {
    // Add node in the center of the visible canvas
    const centerX = (window.innerWidth / 2 - canvasState.pan.x) / canvasState.zoom - 100;
    const centerY = (window.innerHeight / 2 - canvasState.pan.y) / canvasState.zoom - 40;
    addNode(nodeType, { x: centerX, y: centerY });
    toast.success(`Added ${nodeType.name} node`);
  }, [addNode, canvasState.pan, canvasState.zoom]);

  const handleDrop = useCallback((nodeType: NodeType, position: { x: number; y: number }) => {
    addNode(nodeType, position);
    toast.success(`Added ${nodeType.name} node`);
  }, [addNode]);

  const handleRun = useCallback(async () => {
    setIsRunning(true);
    setLogs(prev => [...prev, `[${new Date().toISOString()}] Starting workflow execution...`]);
    toast.info('Executing workflow...');
    await runWorkflow();
    setLogs(prev => [...prev, `[${new Date().toISOString()}] Workflow execution complete.`]);
    setIsRunning(false);
    toast.success('Workflow execution complete');
  }, [runWorkflow]);

  return (
    <div className="h-screen w-full flex overflow-hidden bg-background">
      {/* Left icon sidebar */}
      <LeftIconSidebar 
        onAddNode={handleAddNode}
        onSearch={() => setIsSearchOpen(true)}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Top header */}
        <TopHeader
          workflowName="My workflow"
          projectName="My project"
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onRun={handleRun}
          isRunning={isRunning}
          hasNodes={nodes.length > 0}
        />

        {/* Canvas area */}
        <div className="flex-1 flex relative">
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
            onAddNode={handleAddNode}
          />

          {/* Right toolbar */}
          <RightToolbar onAddNode={handleAddNode} />
        </div>

        {/* Zoom controls */}
        <ZoomControls
          zoom={canvasState.zoom}
          onZoomIn={() => setZoom(canvasState.zoom + 0.1)}
          onZoomOut={() => setZoom(canvasState.zoom - 0.1)}
          onZoomFit={() => {
            setZoom(1);
            setPan({ x: 0, y: 0 });
          }}
          onUndo={resetWorkflow}
        />

        {/* Logs panel */}
        <LogsPanel logs={logs} />
      </div>

      {/* Right config panel */}
      {selectedNode && (
        <NodeConfigPanel
          node={selectedNode}
          onClose={() => selectNode(null)}
          onConfigChange={(config) => updateNodeConfig(selectedNode.id, config)}
          onDelete={() => deleteNode(selectedNode.id)}
        />
      )}

      {/* Node search modal */}
      <NodeSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectNode={handleSelectNode}
      />
    </div>
  );
}
