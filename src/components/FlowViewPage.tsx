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
  // Planner to parallel research agents - using bezier for smoother fan-out
  { id: 'e1-2', source: '1', target: '2', type: 'default' },
  { id: 'e1-3', source: '1', target: '3', type: 'default' },
  { id: 'e1-4', source: '1', target: '4', type: 'default' },
  { id: 'e1-11', source: '1', target: '11', type: 'default' },
  
  // Research agents directly to Fact Checker - using default for cleaner convergence
  { id: 'e2-5', source: '2', target: '5', type: 'default' },
  { id: 'e3-5', source: '3', target: '5', type: 'default' },
  { id: 'e4-5', source: '4', target: '5', type: 'default' },
  { id: 'e11-5', source: '11', target: '5', type: 'default' },
  
  // Sequential flow - straight for clean horizontal flow
  { id: 'e5-6', source: '5', target: '6', type: 'default' },
  
  // Analyst to parallel output generators - default for clean fan-out
  { id: 'e6-7', source: '6', target: '7', type: 'default' },
  { id: 'e6-8', source: '6', target: '8', type: 'default' },
  { id: 'e6-9', source: '6', target: '9', type: 'default' },
  
  // Output generators to Presenter - default for final convergence
  { id: 'e7-10', source: '7', target: '10', type: 'default' },
  { id: 'e8-10', source: '8', target: '10', type: 'default' },
  { id: 'e9-10', source: '9', target: '10', type: 'default' },
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
