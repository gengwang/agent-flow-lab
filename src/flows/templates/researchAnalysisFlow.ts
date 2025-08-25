import { Node, Edge } from '@xyflow/react';
import { FlowTemplate } from '../../types/Flow';

// This is the existing flow from FlowViewPage converted to a template
export const researchAnalysisFlow: FlowTemplate = {
  id: 'research-analysis-flow',
  metadata: {
    name: 'Research & Analysis Flow',
    description: 'A comprehensive workflow for research, fact-checking, analysis, and presentation generation',
    category: 'Research',
    tags: ['research', 'analysis', 'presentation', 'fact-checking'],
    version: '1.0.0',
    author: 'Agent Flow Lab',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  preview: {
    nodeCount: 12,
    complexity: 'complex',
  },
  nodes: [
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
  ] as Node[],
  edges: [
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
  ] as Edge[],
  executionWaves: [
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
  ],
};
