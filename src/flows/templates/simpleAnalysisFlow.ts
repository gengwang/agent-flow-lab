import { Node, Edge } from '@xyflow/react';
import { FlowTemplate } from '../../types/Flow';

// A simpler workflow for basic analysis
export const simpleAnalysisFlow: FlowTemplate = {
  id: 'simple-analysis-flow',
  metadata: {
    name: 'Simple Analysis Flow',
    description: 'A streamlined workflow for basic data analysis and reporting',
    category: 'Analysis',
    tags: ['analysis', 'simple', 'reporting'],
    version: '1.0.0',
    author: 'Agent Flow Lab',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  preview: {
    nodeCount: 5,
    complexity: 'simple',
  },
  nodes: [
    {
      id: 'input-1',
      type: 'textNode',
      data: { 
        label: 'Data Input', 
        placeholder: 'Enter your data or requirements...',
        text: 'Analyze user engagement metrics for our mobile app'
      },
      position: { x: 0, y: 0 },
    },
    {
      id: 'analyzer-1',
      type: 'agentBase',
      data: { label: 'Data Analyzer' },
      position: { x: 250, y: 0 },
    },
    {
      id: 'validator-1',
      type: 'agentBase',
      data: { label: 'Result Validator' },
      position: { x: 500, y: 0 },
    },
    {
      id: 'reporter-1',
      type: 'agentBase',
      data: { label: 'Report Generator' },
      position: { x: 750, y: 0 },
    },
    {
      id: 'output-1',
      type: 'output',
      data: { label: 'Analysis Report' },
      position: { x: 1000, y: 0 },
    },
  ] as Node[],
  edges: [
    { id: 'e1-2', source: 'input-1', sourceHandle: 'output', target: 'analyzer-1', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    { id: 'e2-3', source: 'analyzer-1', sourceHandle: 'output', target: 'validator-1', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    { id: 'e3-4', source: 'validator-1', sourceHandle: 'output', target: 'reporter-1', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    { id: 'e4-5', source: 'reporter-1', sourceHandle: 'output', target: 'output-1', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
  ] as Edge[],
  executionWaves: [
    ['e1-2'],
    ['e2-3'],
    ['e3-4'],
    ['e4-5'],
  ],
};
