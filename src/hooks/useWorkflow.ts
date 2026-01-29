import { useState, useCallback } from 'react';
import { WorkflowNode, Connection, CanvasState, NodeType } from '@/types/workflow';

export function useWorkflow() {
  const [nodes, setNodes] = useState<WorkflowNode[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [canvasState, setCanvasState] = useState<CanvasState>({
    zoom: 1,
    pan: { x: 0, y: 0 },
    selectedNodeId: null,
    connectingFrom: null,
  });

  const addNode = useCallback((type: NodeType, position: { x: number; y: number }) => {
    const newNode: WorkflowNode = {
      id: `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      position,
      config: {},
      status: 'idle',
    };
    setNodes(prev => [...prev, newNode]);
    return newNode;
  }, []);

  const updateNodePosition = useCallback((nodeId: string, position: { x: number; y: number }) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId ? { ...node, position } : node
    ));
  }, []);

  const updateNodeConfig = useCallback((nodeId: string, config: Record<string, unknown>) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId ? { ...node, config: { ...node.config, ...config } } : node
    ));
  }, []);

  const deleteNode = useCallback((nodeId: string) => {
    setNodes(prev => prev.filter(node => node.id !== nodeId));
    setConnections(prev => prev.filter(
      conn => conn.sourceId !== nodeId && conn.targetId !== nodeId
    ));
    if (canvasState.selectedNodeId === nodeId) {
      setCanvasState(prev => ({ ...prev, selectedNodeId: null }));
    }
  }, [canvasState.selectedNodeId]);

  const addConnection = useCallback((
    sourceId: string, 
    sourceOutput: number, 
    targetId: string, 
    targetInput: number
  ) => {
    // Prevent self-connections
    if (sourceId === targetId) return;
    
    // Prevent duplicate connections
    const exists = connections.some(
      c => c.sourceId === sourceId && c.targetId === targetId
    );
    if (exists) return;

    const newConnection: Connection = {
      id: `conn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      sourceId,
      sourceOutput,
      targetId,
      targetInput,
    };
    setConnections(prev => [...prev, newConnection]);
  }, [connections]);

  const deleteConnection = useCallback((connectionId: string) => {
    setConnections(prev => prev.filter(conn => conn.id !== connectionId));
  }, []);

  const selectNode = useCallback((nodeId: string | null) => {
    setCanvasState(prev => ({ ...prev, selectedNodeId: nodeId }));
  }, []);

  const setZoom = useCallback((zoom: number) => {
    setCanvasState(prev => ({ 
      ...prev, 
      zoom: Math.max(0.25, Math.min(2, zoom)) 
    }));
  }, []);

  const setPan = useCallback((pan: { x: number; y: number }) => {
    setCanvasState(prev => ({ ...prev, pan }));
  }, []);

  const startConnecting = useCallback((nodeId: string, output: number) => {
    setCanvasState(prev => ({ 
      ...prev, 
      connectingFrom: { nodeId, output } 
    }));
  }, []);

  const endConnecting = useCallback((targetId?: string, targetInput?: number) => {
    if (canvasState.connectingFrom && targetId !== undefined && targetInput !== undefined) {
      addConnection(
        canvasState.connectingFrom.nodeId,
        canvasState.connectingFrom.output,
        targetId,
        targetInput
      );
    }
    setCanvasState(prev => ({ ...prev, connectingFrom: null }));
  }, [canvasState.connectingFrom, addConnection]);

  const updateNodeStatus = useCallback((nodeId: string, status: WorkflowNode['status']) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId ? { ...node, status } : node
    ));
  }, []);

  const runWorkflow = useCallback(async () => {
    // Find trigger nodes (nodes with no inputs or input count = 0)
    const triggerNodes = nodes.filter(n => n.type.inputs === 0);
    
    if (triggerNodes.length === 0) {
      console.warn('No trigger node found');
      return;
    }

    // Simple execution simulation
    const executeNode = async (nodeId: string, visited: Set<string>) => {
      if (visited.has(nodeId)) return;
      visited.add(nodeId);

      updateNodeStatus(nodeId, 'running');
      
      // Simulate execution time
      await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
      
      // Random success/failure for demo
      const success = Math.random() > 0.1;
      updateNodeStatus(nodeId, success ? 'success' : 'error');

      if (success) {
        // Find connected nodes and execute them
        const outgoingConnections = connections.filter(c => c.sourceId === nodeId);
        for (const conn of outgoingConnections) {
          await executeNode(conn.targetId, visited);
        }
      }
    };

    const visited = new Set<string>();
    for (const trigger of triggerNodes) {
      await executeNode(trigger.id, visited);
    }
  }, [nodes, connections, updateNodeStatus]);

  const resetWorkflow = useCallback(() => {
    setNodes(prev => prev.map(node => ({ ...node, status: 'idle' })));
  }, []);

  const clearWorkflow = useCallback(() => {
    setNodes([]);
    setConnections([]);
    setCanvasState({
      zoom: 1,
      pan: { x: 0, y: 0 },
      selectedNodeId: null,
      connectingFrom: null,
    });
  }, []);

  const selectedNode = nodes.find(n => n.id === canvasState.selectedNodeId);

  return {
    nodes,
    connections,
    canvasState,
    selectedNode,
    addNode,
    updateNodePosition,
    updateNodeConfig,
    deleteNode,
    addConnection,
    deleteConnection,
    selectNode,
    setZoom,
    setPan,
    startConnecting,
    endConnecting,
    runWorkflow,
    resetWorkflow,
    clearWorkflow,
  };
}
