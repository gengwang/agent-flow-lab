import { Node, Edge } from '@xyflow/react';
import { FlowTemplate } from '../../types/Flow';

// A creative workflow for content generation
export const creativeWorkflow: FlowTemplate = {
  id: 'creative-workflow',
  metadata: {
    name: 'Creative Content Flow',
    description: 'A workflow for generating creative content with multiple perspectives and refinement',
    category: 'Creative',
    tags: ['creative', 'content', 'writing', 'brainstorming'],
    version: '1.0.0',
    author: 'Agent Flow Lab',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  preview: {
    nodeCount: 8,
    complexity: 'medium',
  },
  nodes: [
    {
      id: 'brief-1',
      type: 'textNode',
      data: { 
        label: 'Creative Brief', 
        placeholder: 'Describe your creative project...',
        text: 'Create a marketing campaign for a sustainable fashion brand targeting Gen Z'
      },
      position: { x: 0, y: 100 },
    },
    {
      id: 'brainstorm-1',
      type: 'agentBase',
      data: { label: 'Brainstormer' },
      position: { x: 250, y: 50 },
    },
    {
      id: 'writer-1',
      type: 'agentBase',
      data: { label: 'Content Writer' },
      position: { x: 250, y: 150 },
    },
    {
      id: 'designer-1',
      type: 'agentBase',
      data: { label: 'Creative Designer' },
      position: { x: 250, y: 250 },
    },
    {
      id: 'curator-1',
      type: 'agentBase',
      data: { label: 'Content Curator' },
      position: { x: 500, y: 150 },
    },
    {
      id: 'reviewer-1',
      type: 'agentBase',
      data: { label: 'Creative Reviewer' },
      position: { x: 750, y: 150 },
    },
    {
      id: 'finalizer-1',
      type: 'agentBase',
      data: { label: 'Campaign Finalizer' },
      position: { x: 1000, y: 150 },
    },
    {
      id: 'output-1',
      type: 'output',
      data: { label: 'Creative Campaign' },
      position: { x: 1250, y: 150 },
    },
  ] as Node[],
  edges: [
    // Brief to creative agents
    { id: 'e1-2', source: 'brief-1', sourceHandle: 'output', target: 'brainstorm-1', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    { id: 'e1-3', source: 'brief-1', sourceHandle: 'output', target: 'writer-1', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    { id: 'e1-4', source: 'brief-1', sourceHandle: 'output', target: 'designer-1', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    // Creative agents to curator
    { id: 'e2-5', source: 'brainstorm-1', sourceHandle: 'output', target: 'curator-1', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    { id: 'e3-5', source: 'writer-1', sourceHandle: 'output', target: 'curator-1', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    { id: 'e4-5', source: 'designer-1', sourceHandle: 'output', target: 'curator-1', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    // Linear flow to completion
    { id: 'e5-6', source: 'curator-1', sourceHandle: 'output', target: 'reviewer-1', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    { id: 'e6-7', source: 'reviewer-1', sourceHandle: 'output', target: 'finalizer-1', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    { id: 'e7-8', source: 'finalizer-1', sourceHandle: 'output', target: 'output-1', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
  ] as Edge[],
  executionWaves: [
    ['e1-2', 'e1-3', 'e1-4'],
    ['e2-5', 'e3-5', 'e4-5'],
    ['e5-6'],
    ['e6-7'],
    ['e7-8'],
  ],
};
