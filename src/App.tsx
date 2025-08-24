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
    style: { 
      background: '#f9fafb', 
      border: '2px solid #6b7280', 
      borderRadius: '8px',
      padding: '10px',
      fontSize: '12px'
    },
  },
  {
    id: '2',
    data: { label: 'Processing Node' },
    position: { x: 100, y: 125 },
    style: { 
      background: '#f9fafb', 
      border: '2px solid #6b7280', 
      borderRadius: '8px',
      padding: '10px',
      fontSize: '12px'
    },
  },
  {
    id: '3',
    data: { label: 'Decision Node' },
    position: { x: 400, y: 125 },
    style: { 
      background: '#f9fafb', 
      border: '2px solid #6b7280', 
      borderRadius: '8px',
      padding: '10px',
      fontSize: '12px'
    },
  },
  {
    id: '4',
    type: 'output',
    data: { label: 'Agent End' },
    position: { x: 250, y: 250 },
    style: { 
      background: '#f9fafb', 
      border: '2px solid #6b7280', 
      borderRadius: '8px',
      padding: '10px',
      fontSize: '12px'
    },
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
    <div style={{ width: '100vw', height: '100vh' }}>
      <div style={{ 
        position: 'absolute', 
        top: '16px', 
        left: '16px', 
        zIndex: 10, 
        background: 'white', 
        padding: '16px', 
        borderRadius: '8px', 
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', 
        border: '1px solid #e5e7eb' 
      }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>
          Agent Flow Lab
        </h1>
        <p style={{ color: '#6b7280', fontSize: '14px' }}>
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
        style={{ width: '100%', height: '100%', background: '#f9fafb' }}
      >
        <Controls style={{ background: 'white', border: '1px solid #d1d5db', borderRadius: '8px' }} />
        <MiniMap style={{ background: 'white', border: '1px solid #d1d5db', borderRadius: '8px' }} />
        <Background color="#e2e8f0" gap={16} />
      </ReactFlow>
    </div>
  );
}

export default App;
