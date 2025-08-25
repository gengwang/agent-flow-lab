import { useCallback, useState, useEffect, useRef } from 'react';
import * as Toast from '@radix-ui/react-toast';
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge, Controls,
  Background,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Connection,
  Edge,
  ConnectionMode,
  Node
} from '@xyflow/react';

import { AgentBaseNode } from './AgentBaseNode';
import { TextNode } from './TextNode';

const nodeTypes = {
  agentBase: AgentBaseNode,
  textNode: TextNode,
};

const initialNodes: Node[] = [
  // System prompt for Planner
  {
    id: 'system-prompt',
    type: 'textNode',
    data: { 
      label: 'System Prompt', 
      placeholder: 'Type your prompt here...',
      text: 'You are a data scientist specializing in experimental design. You are given a project brief and you need to come up with a plan to execute the project.'
    },
    position: { x: -250, y: 0 },
  },
  // Text input for initial prompt
  {
    id: 'text-1',
    type: 'textNode',
    data: { 
      label: 'Project Brief', 
      placeholder: 'Enter your project requirements and goals...',
      text: 'How would you A/B test a 1-click job apply feature for LinkedIn?'
    },
    position: { x: -250, y: 150 },
  },
  // Web Scraper positioned before Planner
  {
    id: '3',
    type: 'agentBase',
    data: { label: 'Web Scraper' },
    position: { x: -250, y: 250 },
  },
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
    id: '4',
    type: 'agentBase',
    data: { label: 'Domain Expert 1' },
    position: { x: 300, y: 120 },
  },
  {
    id: '11',
    type: 'agentBase',
    data: { label: 'Domain Expert 2' },
    position: { x: 300, y: 190 },
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
  {
    id: '101',
    type: 'output',
    data: { label: 'Presentation' },
    position: { x: 1220, y: 240 },
  },
];

const initialEdges: Edge[] = [
  // System prompt to Planner Rules
  { id: 'e-system-prompt', source: 'system-prompt', sourceHandle: 'output', target: '1', targetHandle: 'systemPrompt', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
  // Text input to Planner
  { id: 'e-text-1', source: 'text-1', sourceHandle: 'output', target: '1', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
  // Web Scraper to Planner Tools
  { id: 'e3-1', source: '3', sourceHandle: 'output', target: '1', targetHandle: 'tools', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
  
  // Planner to parallel research agents - connecting to 'context' port
  { id: 'e1-2', source: '1', sourceHandle: 'output', target: '2', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
  { id: 'e1-4', source: '1', sourceHandle: 'output', target: '4', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
  { id: 'e1-11', source: '1', sourceHandle: 'output', target: '11', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
  
  // Research agents directly to Fact Checker - connecting to 'context' port
  { id: 'e2-5', source: '2', sourceHandle: 'output', target: '5', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
  { id: 'e4-5', source: '4', sourceHandle: 'output', target: '5', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
  { id: 'e11-5', source: '11', sourceHandle: 'output', target: '5', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
  
  // Sequential flow - connecting to 'context' port
  { id: 'e5-6', source: '5', sourceHandle: 'output', target: '6', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
  
  // Analyst to parallel output generators - connecting to 'context' port
  { id: 'e6-7', source: '6', sourceHandle: 'output', target: '7', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
  { id: 'e6-8', source: '6', sourceHandle: 'output', target: '8', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
  { id: 'e6-9', source: '6', sourceHandle: 'output', target: '9', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
  
    // Output generators to Presenter - connecting to 'context' port
  { id: 'e7-10', source: '7', sourceHandle: 'output', target: '10', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
  { id: 'e8-10', source: '8', sourceHandle: 'output', target: '10', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
  { id: 'e9-10', source: '9', sourceHandle: 'output', target: '10', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
  
  // Presenter to final Presentation output
  { id: 'e10-101', source: '10', sourceHandle: 'output', target: '101', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
   
];

function FlowView() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isRunning, setIsRunning] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const { fitView, fitBounds } = useReactFlow();
  const timerRef = useRef(0);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  // Helper function to get nodes involved in a wave
  const getNodesFromWave = useCallback((waveEdgeIds: string[]) => {
    const nodeIds = new Set<string>();
    
    waveEdgeIds.forEach(edgeId => {
      const edge = initialEdges.find(e => e.id === edgeId);
      if (edge) {
        nodeIds.add(edge.source);
        nodeIds.add(edge.target);
      }
    });
    
    return Array.from(nodeIds).map(id => 
      initialNodes.find(node => node.id === id)
    ).filter(Boolean) as Node[];
  }, []);

  // Helper function to calculate bounding box for nodes
  const calculateBounds = useCallback((nodes: Node[]) => {
    if (nodes.length === 0) return null;
    
    const padding = 150; // Extra padding around nodes
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    
    nodes.forEach(node => {
      const x = node.position.x;
      const y = node.position.y;
      const width = 200; // Approximate node width
      const height = 100; // Approximate node height
      
      minX = Math.min(minX, x - padding);
      minY = Math.min(minY, y - padding);
      maxX = Math.max(maxX, x + width + padding);
      maxY = Math.max(maxY, y + height + padding);
    });
    
    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY,
    };
  }, []);

  // Define execution waves - groups of edges that animate together
  const executionWaves = [
    // Wave 0: System prompt, text input, and Web Scraper to Planner
    ['e-system-prompt', 'e-text-1', 'e3-1'],
    // Wave 1: Planner to research agents
    ['e1-2', 'e1-4', 'e1-11'],
    // Wave 2: Research agents to Fact Checker
    ['e2-5', 'e4-5', 'e11-5'],
    // Wave 3: Fact Checker to Analyst
    ['e5-6'],
    // Wave 4: Analyst to output generators
    ['e6-7', 'e6-8', 'e6-9'],
    // Wave 5: Output generators to Presenter
    ['e7-10', 'e8-10', 'e9-10'],
    // Wave 6: Presenter to final Presentation
    ['e10-101'],
  ];

  const runWorkflow = useCallback(async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    
    // Reset all edges to non-animated state first
    setEdges(currentEdges => 
      currentEdges.map(edge => ({ 
        ...edge, 
        animated: false,
        style: { stroke: '#94a3b8', strokeWidth: 2 } // Ensure default gray color
      }))
    );

    // Process each wave sequentially with camera following
    for (let waveIndex = 0; waveIndex < executionWaves.length; waveIndex++) {
      const waveEdgeIds = executionWaves[waveIndex];
      const waveNodes = getNodesFromWave(waveEdgeIds);
      const bounds = calculateBounds(waveNodes);
      
      // Zoom to current wave area
      if (bounds) {
        fitBounds(bounds, { 
          padding: 0.1, 
          duration: 800
        });
        
        // Wait for camera transition to complete
        await new Promise(resolve => setTimeout(resolve, 600));
      }
      
      // Animate edges in current wave
      setEdges(currentEdges => 
        currentEdges.map(edge => ({
          ...edge,
          animated: waveEdgeIds.includes(edge.id),
          style: waveEdgeIds.includes(edge.id) 
            ? { stroke: '#14b8a6', strokeWidth: 3 } // Teal-500 color for animated edges
            : { stroke: '#94a3b8', strokeWidth: 2 }  // Default gray color
        }))
      );
      
      // Wait for animation duration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Turn off animation for current wave
      setEdges(currentEdges => 
        currentEdges.map(edge => ({
          ...edge,
          animated: false,
          style: { stroke: '#94a3b8', strokeWidth: 2 } // Reset to default gray color
        }))
      );
      
      // Small pause between waves (except for the last wave)
      if (waveIndex < executionWaves.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    }
    
    // Zoom out to show full workflow
    await new Promise(resolve => setTimeout(resolve, 500));
    fitView({ 
      duration: 1000,
      padding: 0.1
    });
    
    setIsRunning(false);
    
    // Show success toast
    setToastOpen(false);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setToastOpen(true);
    }, 100);
  }, [isRunning, setEdges, executionWaves, getNodesFromWave, calculateBounds, fitBounds, fitView]);

  return (
    <Toast.Provider swipeDirection="right">
      <div className="w-full h-full relative">
        {/* Run Button */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={runWorkflow}
          disabled={isRunning}
          className={`
            flex min-w-30 items-center justify-center space-x-2 px-4 py-2 
            ${isRunning 
              ? 'bg-teal-400/30 cursor-not-allowed shadow-none' 
              : 'bg-teal-600 hover:bg-teal-700 hover:shadow-xl'
            }
            text-teal-100 font-medium text-sm 
            rounded-full shadow-lg border border-teal-500/30
            transition-all duration-200
          `}
        >
          {isRunning ? (
            <>
              <span className="material-symbols-outlined text-lg animate-spin text-teal-600">refresh</span>
              <span className="text-teal-600">Running...</span>
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
      
      {/* Success Toast */}
      <Toast.Root 
        className="bg-teal-600 text-white p-4 rounded-lg shadow-lg border border-teal-500/50 flex items-center space-x-3"
        open={toastOpen} 
        onOpenChange={setToastOpen}
      >
        <span className="material-symbols-outlined !text-2xl">celebration</span>
        <div>
          <Toast.Title className="font-medium text-sm">
            Workflow Complete!
          </Toast.Title>
          <Toast.Description className="text-xs text-blue-50 mt-1">
            Your AI agent workflow has finished successfully.
          </Toast.Description>
        </div>
      </Toast.Root>
      <Toast.Viewport className="fixed top-[54px] right-4 z-50 w-80" />
    </div>
    </Toast.Provider>
  );
}

export function FlowViewPage() {
  return (
    <ReactFlowProvider>
      <FlowView />
    </ReactFlowProvider>
  );
}
