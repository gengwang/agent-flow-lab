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
import { FlowLibraryPanel } from './FlowLibraryPanel';
import { Flow, FlowTemplate } from '../types/Flow';
import { getFlowTemplateById } from '../flows/templates';

const nodeTypes = {
  agentBase: AgentBaseNode,
  textNode: TextNode,
};

// Note: Initial nodes and edges are now defined in flow templates
// The canvas starts empty and flows are added from the library

function FlowView() {
  const [flows, setFlows] = useState<Flow[]>([]);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const { fitView, fitBounds, screenToFlowPosition } = useReactFlow();
  const timerRef = useRef(0);
  
  // Flag to control whether to clear existing flows when adding new ones
  // Set to true for now, but can be changed to false to allow multiple flows
  const clearFlowsOnAdd = true;

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  // Update React Flow nodes and edges when flows change
  useEffect(() => {
    const allNodes = flows.flatMap(flow => flow.getNodes());
    const allEdges = flows.flatMap(flow => flow.getEdges());
    setNodes(allNodes);
    setEdges(allEdges);
  }, [flows, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  // Add a flow instance from a template
  const addFlowFromTemplate = useCallback((template: FlowTemplate, position?: { x: number; y: number }) => {
    const flowPosition = position || { x: 100, y: 100 };
    const newFlow = new Flow(template, undefined, flowPosition);
    
    if (clearFlowsOnAdd) {
      // Clear existing flows and add the new one
      setFlows([newFlow]);
    } else {
      // Add to existing flows (for multiple flows support)
      setFlows(prev => [...prev, newFlow]);
    }
    
    // Auto-fit to show the new flow
    setTimeout(() => {
      const bounds = calculateFlowBounds(newFlow);
      if (bounds) {
        fitBounds(bounds, { padding: 0.1, duration: 800 });
      }
    }, 100);
  }, [clearFlowsOnAdd, fitBounds]);

  // Handle template selection from library (click to add)
  const handleTemplateSelect = useCallback((template: FlowTemplate) => {
    // Find a good position for the new flow (avoid overlaps)
    const position = findAvailablePosition();
    addFlowFromTemplate(template, position);
  }, [addFlowFromTemplate]);

  // Handle drag start from library
  const handleTemplateDragStart = useCallback(() => {
    // Store template data for drop handling
    // The actual drag data is handled in FlowLibraryPanel
  }, []);

  // Handle drop on canvas
  const handleCanvasDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    
    try {
      const dragData = JSON.parse(event.dataTransfer.getData('application/json'));
      if (dragData.type === 'flow-template') {
        const template = getFlowTemplateById(dragData.templateId);
        if (template) {
          const position = screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          });
          addFlowFromTemplate(template, position);
        }
      }
    } catch (error) {
      console.error('Failed to handle drop:', error);
    }
  }, [addFlowFromTemplate, screenToFlowPosition]);

  const handleCanvasDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  }, []);

  // Helper function to find an available position for new flows
  const findAvailablePosition = useCallback(() => {
    const baseX = 100;
    const baseY = 100;
    const spacing = 400; // Space between flows
    
    // If clearing flows on add, always return the base position
    if (clearFlowsOnAdd) {
      return { x: baseX, y: baseY };
    }
    
    // For multiple flows mode, find non-overlapping position
    for (let i = 0; i < flows.length + 1; i++) {
      const x = baseX + (i % 3) * spacing;
      const y = baseY + Math.floor(i / 3) * spacing;
      
      // Check if this position overlaps with existing flows
      const overlaps = flows.some(flow => {
        const distance = Math.sqrt(
          Math.pow(flow.position.x - x, 2) + Math.pow(flow.position.y - y, 2)
        );
        return distance < spacing * 0.8; // 80% of spacing to avoid tight overlaps
      });
      
      if (!overlaps) {
        return { x, y };
      }
    }
    
    // Fallback: place at the end of the grid
    const gridIndex = flows.length;
    return {
      x: baseX + (gridIndex % 3) * spacing,
      y: baseY + Math.floor(gridIndex / 3) * spacing,
    };
  }, [flows, clearFlowsOnAdd]);

  // Helper function to calculate bounds for a specific flow
  const calculateFlowBounds = useCallback((flow: Flow) => {
    const flowNodes = flow.getNodes();
    if (flowNodes.length === 0) return null;
    
    const padding = 50;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    
    flowNodes.forEach(node => {
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

  // Helper function to get nodes involved in a wave for a specific flow
  const getNodesFromWave = useCallback((waveEdgeIds: string[], flowId: string) => {
    const flow = flows.find(f => f.id === flowId);
    if (!flow) return [];
    
    const flowEdges = flow.getEdges();
    const flowNodes = flow.getNodes();
    const nodeIds = new Set<string>();
    
    waveEdgeIds.forEach(edgeId => {
      const edge = flowEdges.find(e => e.id === edgeId);
      if (edge) {
        nodeIds.add(edge.source);
        nodeIds.add(edge.target);
      }
    });
    
    return Array.from(nodeIds).map(id => 
      flowNodes.find(node => node.id === id)
    ).filter(Boolean) as Node[];
  }, [flows]);

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

  const runWorkflow = useCallback(async (flowId?: string) => {
    if (isRunning) return;
    
    setIsRunning(true);
    
    // If no specific flow ID provided, run the first available flow
    const targetFlow = flowId ? flows.find(f => f.id === flowId) : flows[0];
    if (!targetFlow) {
      setIsRunning(false);
      return;
    }
    
    const executionWaves = targetFlow.getExecutionWaves();
    
    // Reset all edges to non-animated state first
    setEdges(currentEdges => 
      currentEdges.map(edge => ({ 
        ...edge, 
        animated: false,
        style: { stroke: '#94a3b8', strokeWidth: 2 } // Ensure default gray color
      }))
    );

    // Update flow status
    targetFlow.updateStatus('running');

    // Process each wave sequentially with camera following
    for (let waveIndex = 0; waveIndex < executionWaves.length; waveIndex++) {
      const waveEdgeIds = executionWaves[waveIndex];
      const waveNodes = getNodesFromWave(waveEdgeIds, targetFlow.id);
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
    
    // Update flow status
    targetFlow.updateStatus('completed');
    
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
  }, [isRunning, flows, setEdges, getNodesFromWave, calculateBounds, fitBounds, fitView]);

  return (
    <Toast.Provider swipeDirection="right">
      <div className="w-full h-full flex">
        {/* Flow Library Panel */}
        <FlowLibraryPanel 
          onTemplateSelect={handleTemplateSelect}
          onTemplateDragStart={handleTemplateDragStart}
          className="w-80 flex-shrink-0"
        />
        
        {/* Canvas Area */}
        <div className="flex-1 relative">
          {/* Run Button */}
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={() => runWorkflow()}
              disabled={isRunning || flows.length === 0}
              className={`
                flex min-w-30 items-center justify-center space-x-2 px-4 py-2 
                ${isRunning || flows.length === 0
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

          {/* Empty State */}
          {flows.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <span className="material-symbols-outlined !text-6xl text-gray-300 mb-4 block">
                  account_tree
                </span>
                <p className="text-gray-400 text-2xl mb-4 max-w-md">
                  Select a flow template from the library to get started, or drag and drop one onto the canvas.
                </p>
              </div>
            </div>
          )}

          {/* React Flow Canvas */}
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={handleCanvasDrop}
            onDragOver={handleCanvasDragOver}
            nodeTypes={nodeTypes}
            connectionMode={ConnectionMode.Loose}
            fitView={flows.length > 0}
            className="w-full h-full bg-gray-50"
          >
            <Controls className="bg-white border border-gray-300 rounded-lg shadow-sm" />
            <Background color="#e2e8f0" gap={16} />
          </ReactFlow>
        </div>
      
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
