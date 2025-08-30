import { Node, Edge } from '@xyflow/react';
import { FlowTemplate } from '../../types/Flow';

// Multi-Agent Collaborative Coding Workflow
export const multiAgentCollaborativeFlow: FlowTemplate = {
  id: 'multi-agent-collaborative-flow',
  metadata: {
    name: 'Multi-Agent Collaborative Coding',
    description: 'A sophisticated multi-agent system where specialized agents collaborate to complete coding workflows with orchestrated coordination',
    category: 'Development',
    tags: ['multi-agent', 'collaboration', 'coding', 'orchestration', 'specialized-agents'],
    version: '1.0.0',
    author: 'Agent Flow Lab',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  preview: {
    nodeCount: 18,
    complexity: 'complex',
  },
  nodes: [
    // User Input Layer
    {
      id: 'user-input',
      type: 'textNode',
      data: { 
        label: 'User Requirements', 
        placeholder: 'Describe your coding task and requirements...',
        text: 'Build a React component with TypeScript for a user dashboard with real-time data visualization and responsive design'
      },
      position: { x: 0, y: 100 },
    },
    {
      id: 'project-context',
      type: 'textNode',
      data: { 
        label: 'Project Context', 
        placeholder: 'Project structure, constraints, and environment details...',
        text: 'React 18 + TypeScript + Tailwind CSS + Vite build system. Follow existing component patterns and accessibility standards.'
      },
      position: { x: 0, y: 200 },
    },

    // Central Orchestrator
    {
      id: 'orchestrator',
      type: 'agentBase',
      data: { label: '🧠 Orchestrator Agent' },
      position: { x: 400, y: 150 },
    },

    // Context & Analysis Tier
    {
      id: 'context-agent',
      type: 'agentBase',
      data: { label: '🔍 Context Agent' },
      position: { x: 700, y: 50 },
    },
    {
      id: 'planning-agent',
      type: 'agentBase',
      data: { label: '📋 Planning Agent' },
      position: { x: 700, y: 130 },
    },

    // Implementation Tier
    {
      id: 'code-editor-agent',
      type: 'agentBase',
      data: { label: '✏️ Code Editor Agent' },
      position: { x: 1000, y: 0 },
    },
    {
      id: 'execution-agent',
      type: 'agentBase',
      data: { label: '⚡ Execution Agent' },
      position: { x: 1000, y: 80 },
    },
    {
      id: 'build-agent',
      type: 'agentBase',
      data: { label: '🏗️ Build Agent' },
      position: { x: 1000, y: 160 },
    },

    // Quality Assurance Tier
    {
      id: 'error-detection-agent',
      type: 'agentBase',
      data: { label: '🐛 Error Detection Agent' },
      position: { x: 1000, y: 240 },
    },
    {
      id: 'validation-agent',
      type: 'agentBase',
      data: { label: '✅ Validation Agent' },
      position: { x: 1000, y: 320 },
    },
    {
      id: 'testing-agent',
      type: 'agentBase',
      data: { label: '🧪 Testing Agent' },
      position: { x: 1000, y: 400 },
    },

    // Coordination & Feedback Tier
    {
      id: 'progress-tracker',
      type: 'agentBase',
      data: { label: '📈 Progress Tracker' },
      position: { x: 1300, y: 100 },
    },
    {
      id: 'communication-agent',
      type: 'agentBase',
      data: { label: '💬 Communication Agent' },
      position: { x: 1300, y: 180 },
    },
    {
      id: 'iteration-controller',
      type: 'agentBase',
      data: { label: '🔄 Iteration Controller' },
      position: { x: 1300, y: 260 },
    },

    // Integration and Final Coordination
    {
      id: 'integration-hub',
      type: 'agentBase',
      data: { label: '🔧 Integration Hub' },
      position: { x: 1600, y: 180 },
    },

    // Final Outputs
    {
      id: 'final-code',
      type: 'agentBase',
      data: { label: '📄 Final Code Output' },
      position: { x: 1900, y: 120 },
    },
    {
      id: 'documentation',
      type: 'agentBase',
      data: { label: '📚 Documentation' },
      position: { x: 1900, y: 200 },
    },
    {
      id: 'next-steps',
      type: 'agentBase',
      data: { label: '🚀 Next Steps Suggestions' },
      position: { x: 1900, y: 280 },
    },
  ] as Node[],
  edges: [
    // User Input to Orchestrator
    { id: 'e-user-orchestrator', source: 'user-input', sourceHandle: 'output', target: 'orchestrator', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    { id: 'e-context-orchestrator', source: 'project-context', sourceHandle: 'output', target: 'orchestrator', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },

    // Orchestrator to Analysis Tier
    { id: 'e-orchestrator-context', source: 'orchestrator', sourceHandle: 'output', target: 'context-agent', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    { id: 'e-orchestrator-planning', source: 'orchestrator', sourceHandle: 'output', target: 'planning-agent', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },

    // Analysis Tier to Implementation Tier
    { id: 'e-context-code', source: 'context-agent', sourceHandle: 'output', target: 'code-editor-agent', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    { id: 'e-planning-code', source: 'planning-agent', sourceHandle: 'output', target: 'code-editor-agent', targetHandle: 'tools', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    { id: 'e-planning-execution', source: 'planning-agent', sourceHandle: 'output', target: 'execution-agent', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    { id: 'e-context-build', source: 'context-agent', sourceHandle: 'output', target: 'build-agent', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },

    // Implementation Tier to QA Tier
    { id: 'e-code-error', source: 'code-editor-agent', sourceHandle: 'output', target: 'error-detection-agent', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    { id: 'e-execution-error', source: 'execution-agent', sourceHandle: 'output', target: 'error-detection-agent', targetHandle: 'tools', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    { id: 'e-build-validation', source: 'build-agent', sourceHandle: 'output', target: 'validation-agent', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    { id: 'e-code-testing', source: 'code-editor-agent', sourceHandle: 'output', target: 'testing-agent', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },

    // QA Tier to Coordination Tier
    { id: 'e-error-progress', source: 'error-detection-agent', sourceHandle: 'output', target: 'progress-tracker', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    { id: 'e-validation-progress', source: 'validation-agent', sourceHandle: 'output', target: 'progress-tracker', targetHandle: 'tools', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    { id: 'e-testing-progress', source: 'testing-agent', sourceHandle: 'output', target: 'progress-tracker', targetHandle: 'systemPrompt', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },

    // Coordination Tier Interconnections
    { id: 'e-progress-communication', source: 'progress-tracker', sourceHandle: 'output', target: 'communication-agent', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    { id: 'e-communication-iteration', source: 'communication-agent', sourceHandle: 'output', target: 'iteration-controller', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },

    // Coordination to Integration Hub
    { id: 'e-progress-integration', source: 'progress-tracker', sourceHandle: 'output', target: 'integration-hub', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    { id: 'e-iteration-integration', source: 'iteration-controller', sourceHandle: 'output', target: 'integration-hub', targetHandle: 'tools', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },

    // Feedback Loops (QA back to Implementation)
    { id: 'e-error-code-feedback', source: 'error-detection-agent', sourceHandle: 'output', target: 'code-editor-agent', targetHandle: 'systemPrompt', type: 'default', style: { stroke: '#e11d48', strokeWidth: 2, strokeDasharray: '5,5' } },
    { id: 'e-iteration-orchestrator-feedback', source: 'iteration-controller', sourceHandle: 'output', target: 'orchestrator', targetHandle: 'systemPrompt', type: 'default', style: { stroke: '#e11d48', strokeWidth: 2, strokeDasharray: '5,5' } },

    // Integration Hub to Final Outputs
    { id: 'e-integration-code', source: 'integration-hub', sourceHandle: 'output', target: 'final-code', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    { id: 'e-integration-docs', source: 'integration-hub', sourceHandle: 'output', target: 'documentation', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    { id: 'e-integration-next', source: 'integration-hub', sourceHandle: 'output', target: 'next-steps', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },

    // Communication Agent to User (Final Communication)
    { id: 'e-communication-docs', source: 'communication-agent', sourceHandle: 'output', target: 'documentation', targetHandle: 'systemPrompt', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
  ] as Edge[],
  executionWaves: [
    // Wave 0: Initial input processing and orchestration
    ['e-user-orchestrator', 'e-context-orchestrator'],
    
    // Wave 1: Context analysis and planning (parallel)
    ['e-orchestrator-context', 'e-orchestrator-planning'],
    
    // Wave 2: Implementation tier activation (parallel)
    ['e-context-code', 'e-planning-code', 'e-planning-execution', 'e-context-build'],
    
    // Wave 3: Quality assurance tier activation (parallel)
    ['e-code-error', 'e-execution-error', 'e-build-validation', 'e-code-testing'],
    
    // Wave 4: Coordination and progress tracking
    ['e-error-progress', 'e-validation-progress', 'e-testing-progress'],
    
    // Wave 5: Communication and iteration control
    ['e-progress-communication', 'e-communication-iteration'],
    
    // Wave 6: Integration and coordination
    ['e-progress-integration', 'e-iteration-integration'],
    
    // Wave 7: Feedback loops (if needed)
    ['e-error-code-feedback', 'e-iteration-orchestrator-feedback'],
    
    // Wave 8: Final output generation
    ['e-integration-code', 'e-integration-docs', 'e-integration-next'],
    
    // Wave 9: Final communication
    ['e-communication-docs'],
  ],
};
