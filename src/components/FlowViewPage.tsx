import { useCallback } from 'react';
import {
  ReactFlow,
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  ConnectionMode,
  Node,
} from '@xyflow/react';

import { AgentBaseNode } from './AgentBaseNode';

const nodeTypes = {
  agentBase: AgentBaseNode,
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'agentBase',
    data: { label: 'Planner' },
    position: { x: 50, y: 150 },
  },
  // Parallel Research Phase - Spread out for cleaner connections
  {
    id: '2',
    type: 'agentBase',
    data: { label: 'Researcher' },
    position: { x: 300, y: 50 },
  },
  {
    id: '3',
    type: 'agentBase',
    data: { label: 'Web Searcher' },
    position: { x: 300, y: 120 },
  },
  {
    id: '4',
    type: 'agentBase',
    data: { label: 'Domain Expert 1' },
    position: { x: 300, y: 190 },
  },
  {
    id: '11',
    type: 'agentBase',
    data: { label: 'Domain Expert 2' },
    position: { x: 300, y: 260 },
  },
  // Validation Phase - Centered for multiple inputs
  {
    id: '5',
    type: 'agentBase',
    data: { label: 'Fact Checker' },
    position: { x: 580, y: 155 },
  },
  // Analysis Phase
  {
    id: '6',
    type: 'agentBase',
    data: { label: 'Analyst' },
    position: { x: 780, y: 155 },
  },
  // Output Phase - Parallel Outputs with better spacing
  {
    id: '7',
    type: 'agentBase',
    data: { label: 'Report Writer' },
    position: { x: 980, y: 70 },
  },
  {
    id: '8',
    type: 'agentBase',
    data: { label: 'Presentation Designer' },
    position: { x: 980, y: 155 },
  },
  {
    id: '9',
    type: 'agentBase',
    data: { label: 'Summary Generator' },
    position: { x: 980, y: 240 },
  },
  {
    id: '10',
    type: 'agentBase',
    data: { label: 'Presenter' },
    position: { x: 1220, y: 155 },
  },
];

const initialEdges: Edge[] = [
  // Planner to parallel research agents - connecting to 'context' port
  { id: 'e1-2', source: '1', sourceHandle: 'output', target: '2', targetHandle: 'context', type: 'default' },
  { id: 'e1-3', source: '1', sourceHandle: 'output', target: '3', targetHandle: 'context', type: 'default' },
  { id: 'e1-4', source: '1', sourceHandle: 'output', target: '4', targetHandle: 'context', type: 'default' },
  { id: 'e1-11', source: '1', sourceHandle: 'output', target: '11', targetHandle: 'context', type: 'default' },
  
  // Research agents directly to Fact Checker - connecting to 'context' port
  { id: 'e2-5', source: '2', sourceHandle: 'output', target: '5', targetHandle: 'context', type: 'default' },
  { id: 'e3-5', source: '3', sourceHandle: 'output', target: '5', targetHandle: 'context', type: 'default' },
  { id: 'e4-5', source: '4', sourceHandle: 'output', target: '5', targetHandle: 'context', type: 'default' },
  { id: 'e11-5', source: '11', sourceHandle: 'output', target: '5', targetHandle: 'context', type: 'default' },
  
  // Sequential flow - connecting to 'context' port
  { id: 'e5-6', source: '5', sourceHandle: 'output', target: '6', targetHandle: 'context', type: 'default' },
  
  // Analyst to parallel output generators - connecting to 'context' port
  { id: 'e6-7', source: '6', sourceHandle: 'output', target: '7', targetHandle: 'context', type: 'default' },
  { id: 'e6-8', source: '6', sourceHandle: 'output', target: '8', targetHandle: 'context', type: 'default' },
  { id: 'e6-9', source: '6', sourceHandle: 'output', target: '9', targetHandle: 'context', type: 'default' },
  
  // Output generators to Presenter - connecting to 'context' port
  { id: 'e7-10', source: '7', sourceHandle: 'output', target: '10', targetHandle: 'context', type: 'default' },
  { id: 'e8-10', source: '8', sourceHandle: 'output', target: '10', targetHandle: 'context', type: 'default' },
  { id: 'e9-10', source: '9', sourceHandle: 'output', target: '10', targetHandle: 'context', type: 'default' },
];

export function FlowViewPage() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        fitView
        className="w-full h-full bg-gray-50"
      >
        <Controls className="bg-white border border-gray-300 rounded-lg shadow-sm" />
        {/* <MiniMap className="bg-white border border-gray-300 rounded-lg shadow-sm" /> */}
        <Background color="#e2e8f0" gap={16} />
      </ReactFlow>
    </div>
  );
}
