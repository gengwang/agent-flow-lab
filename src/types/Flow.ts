import { Node, Edge } from '@xyflow/react';

export interface FlowMetadata {
  name: string;
  description: string;
  category: string;
  tags: string[];
  version: string;
  author?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FlowTemplate {
  id: string;
  metadata: FlowMetadata;
  nodes: Node[];
  edges: Edge[];
  executionWaves: string[][];
  preview?: {
    thumbnail?: string;
    nodeCount: number;
    complexity: 'simple' | 'medium' | 'complex';
  };
}

export interface FlowInstance {
  id: string;
  templateId: string;
  instanceName: string;
  position: { x: number; y: number };
  nodes: Node[];
  edges: Edge[];
  executionWaves: string[][];
  status: 'idle' | 'running' | 'completed' | 'error';
  createdAt: Date;
  lastRunAt?: Date;
  metadata: FlowMetadata;
}

export class Flow {
  public readonly id: string;
  public readonly templateId: string;
  public instanceName: string;
  public position: { x: number; y: number };
  public nodes: Node[];
  public edges: Edge[];
  public executionWaves: string[][];
  public status: FlowInstance['status'];
  public readonly createdAt: Date;
  public lastRunAt?: Date;
  public readonly metadata: FlowMetadata;

  constructor(template: FlowTemplate, instanceName?: string, position?: { x: number; y: number }) {
    this.id = `flow_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.templateId = template.id;
    this.instanceName = instanceName || `${template.metadata.name} Instance`;
    this.position = position || { x: 0, y: 0 };
    this.status = 'idle';
    this.createdAt = new Date();
    this.metadata = { ...template.metadata };
    
    // Create namespaced copies of nodes and edges
    const nodeIdMap = new Map<string, string>();
    
    // Generate namespaced node IDs
    this.nodes = template.nodes.map(node => {
      const namespacedId = `${this.id}_${node.id}`;
      nodeIdMap.set(node.id, namespacedId);
      
      return {
        ...node,
        id: namespacedId,
        position: {
          x: node.position.x + this.position.x,
          y: node.position.y + this.position.y
        }
      };
    });
    
    // Generate namespaced edge IDs and update references
    this.edges = template.edges.map(edge => ({
      ...edge,
      id: `${this.id}_${edge.id}`,
      source: nodeIdMap.get(edge.source) || edge.source,
      target: nodeIdMap.get(edge.target) || edge.target
    }));
    
    // Update execution waves with namespaced edge IDs
    this.executionWaves = template.executionWaves.map(wave =>
      wave.map(edgeId => `${this.id}_${edgeId}`)
    );
  }

  public getNodes(): Node[] {
    return this.nodes;
  }

  public getEdges(): Edge[] {
    return this.edges;
  }

  public getExecutionWaves(): string[][] {
    return this.executionWaves;
  }

  public updatePosition(newPosition: { x: number; y: number }): void {
    const deltaX = newPosition.x - this.position.x;
    const deltaY = newPosition.y - this.position.y;
    
    // Update all node positions
    this.nodes = this.nodes.map(node => ({
      ...node,
      position: {
        x: node.position.x + deltaX,
        y: node.position.y + deltaY
      }
    }));
    
    this.position = newPosition;
  }

  public updateStatus(status: FlowInstance['status']): void {
    this.status = status;
    if (status === 'running') {
      this.lastRunAt = new Date();
    }
  }

  public clone(newPosition?: { x: number; y: number }): Flow {
    const template: FlowTemplate = {
      id: this.templateId,
      metadata: this.metadata,
      nodes: this.nodes.map(node => ({
        ...node,
        position: {
          x: node.position.x - this.position.x,
          y: node.position.y - this.position.y
        }
      })),
      edges: this.edges,
      executionWaves: this.executionWaves
    };
    
    return new Flow(template, `${this.instanceName} Copy`, newPosition);
  }

  public toInstance(): FlowInstance {
    return {
      id: this.id,
      templateId: this.templateId,
      instanceName: this.instanceName,
      position: this.position,
      nodes: this.nodes,
      edges: this.edges,
      executionWaves: this.executionWaves,
      status: this.status,
      createdAt: this.createdAt,
      lastRunAt: this.lastRunAt,
      metadata: this.metadata
    };
  }
}
