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
    type: 'input',
    data: { label: 'Agent Start' },
    position: { x: 250, y: 25 },
    className: 'border-2 border-gray-500 bg-gray-50 rounded-lg p-2 text-sm',
  },
  {
    id: '2',
    type: 'agentBase',
    data: { label: 'Agent 1' },
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    data: { label: 'Decision Node' },
    position: { x: 400, y: 125 },
    className: 'border-2 border-gray-500 bg-gray-50 rounded-lg p-2 text-sm',
  },
  {
    id: '4',
    type: 'output',
    data: { label: 'Agent End' },
    position: { x: 250, y: 250 },
    className: 'border-2 border-gray-500 bg-gray-50 rounded-lg p-2 text-sm',
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', type: 'smoothstep' },
  { id: 'e1-3', source: '1', target: '3', type: 'smoothstep' },
  { id: 'e2-4', source: '2', target: '4', type: 'smoothstep' },
  { id: 'e3-4', source: '3', target: '4', type: 'smoothstep' },
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
        <MiniMap className="bg-white border border-gray-300 rounded-lg shadow-sm" />
        <Background color="#e2e8f0" gap={16} />
      </ReactFlow>
    </div>
  );
}
