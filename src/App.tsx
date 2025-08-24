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
    data: { label: 'Processing Node' },
    position: { x: 100, y: 125 },
    className: 'border-2 border-gray-500 bg-gray-50 rounded-lg p-2 text-sm',
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

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div className="w-screen h-screen">
      <div className="absolute top-4 left-4 z-10 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          AI Colab
        </h1>
        <p className="text-gray-600 text-sm">
          Drag to pan • Scroll to zoom • Connect nodes by dragging from handles
        </p>
      </div>
      
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
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

export default App;
