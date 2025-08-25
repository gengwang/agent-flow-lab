import { useCallback, useState } from 'react';
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
  const [isRunning, setIsRunning] = useState(false);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  // Define execution waves - groups of edges that animate together
  const executionWaves = [
    // Wave 1: Planner to research agents
    ['e1-2', 'e1-3', 'e1-4', 'e1-11'],
    // Wave 2: Research agents to Fact Checker
    ['e2-5', 'e3-5', 'e4-5', 'e11-5'],
    // Wave 3: Fact Checker to Analyst
    ['e5-6'],
    // Wave 4: Analyst to output generators
    ['e6-7', 'e6-8', 'e6-9'],
    // Wave 5: Output generators to Presenter
    ['e7-10', 'e8-10', 'e9-10'],
  ];

  const runWorkflow = useCallback(async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    
    // Reset all edges to non-animated state first
    setEdges(currentEdges => 
      currentEdges.map(edge => ({ ...edge, animated: false }))
    );

    // Process each wave sequentially
    for (let waveIndex = 0; waveIndex < executionWaves.length; waveIndex++) {
      const waveEdgeIds = executionWaves[waveIndex];
      
      // Animate edges in current wave
      setEdges(currentEdges => 
        currentEdges.map(edge => ({
          ...edge,
          animated: waveEdgeIds.includes(edge.id)
        }))
      );
      
      // Wait for 0.5 seconds
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Turn off animation for current wave
      setEdges(currentEdges => 
        currentEdges.map(edge => ({
          ...edge,
          animated: false
        }))
      );
      
      // Small pause between waves (except for the last wave)
      if (waveIndex < executionWaves.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    setIsRunning(false);
  }, [isRunning, setEdges, executionWaves]);

  return (
    <div className="w-full h-full relative">
      {/* Run Button */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={runWorkflow}
          disabled={isRunning}
          className={`
            flex min-w-30 items-center justify-center space-x-2 px-4 py-2 
            ${isRunning 
              ? 'bg-gray-500 cursor-not-allowed' 
              : 'bg-teal-600 hover:bg-teal-700 hover:shadow-xl'
            }
            text-white font-medium text-sm 
            rounded-lg shadow-lg border border-teal-500
            transition-colors duration-200
          `}
        >
          {isRunning ? (
            <>
              <span className="material-symbols-outlined text-lg animate-spin">refresh</span>
              <span>Running...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-lg">play_arrow</span>
              <span>Run</span>
            </>
          )}
        </button>
      </div>

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
