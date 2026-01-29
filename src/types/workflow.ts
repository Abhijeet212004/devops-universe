export type NodeCategory = 
  | 'cloud' 
  | 'cicd' 
  | 'container' 
  | 'monitoring' 
  | 'security' 
  | 'database' 
  | 'messaging' 
  | 'config';

export interface NodeType {
  id: string;
  name: string;
  category: NodeCategory;
  icon: string;
  description: string;
  inputs: number;
  outputs: number;
  config?: NodeConfigField[];
}

export interface NodeConfigField {
  id: string;
  label: string;
  type: 'text' | 'select' | 'number' | 'boolean' | 'textarea' | 'secret';
  placeholder?: string;
  options?: { label: string; value: string }[];
  required?: boolean;
  defaultValue?: string | number | boolean;
}

export interface WorkflowNode {
  id: string;
  type: NodeType;
  position: { x: number; y: number };
  config: Record<string, unknown>;
  status?: 'idle' | 'running' | 'success' | 'error';
}

export interface Connection {
  id: string;
  sourceId: string;
  sourceOutput: number;
  targetId: string;
  targetInput: number;
}

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  nodes: WorkflowNode[];
  connections: Connection[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CanvasState {
  zoom: number;
  pan: { x: number; y: number };
  selectedNodeId: string | null;
  connectingFrom: { nodeId: string; output: number } | null;
}
