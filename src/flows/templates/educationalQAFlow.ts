import { Node, Edge } from '@xyflow/react';
import { FlowTemplate } from '../../types/Flow';

// Educational Q&A workflow with fact-checking and expert validation
export const educationalQAFlow: FlowTemplate = {
  id: 'educational-qa-flow',
  metadata: {
    name: 'Educational Q&A Flow',
    description: 'An intelligent tutoring system with continuous learning feedback loop that validates facts, consults domain experts, and generates adaptive educational content',
    category: 'Education',
    tags: ['education', 'teaching', 'qa', 'fact-checking', 'tutoring'],
    version: '1.0.0',
    author: 'Agent Flow Lab',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  preview: {
    nodeCount: 10,
    complexity: 'medium',
  },
  nodes: [
    // Input nodes
    {
      id: 'system-prompt',
      type: 'textNode',
      data: { 
        label: 'System Prompt', 
        placeholder: 'Enter teaching guidelines...',
        text: 'You are an expert educator. Provide accurate, well-structured educational content that is appropriate for the learning level and engaging for students.'
      },
      position: { x: 0, y: 0 },
    },
    {
      id: 'user-question',
      type: 'textNode',
      data: { 
        label: 'User Question', 
        placeholder: 'Enter the student\'s question...',
        text: 'What is photosynthesis and how does it work in plants?'
      },
      position: { x: 0, y: 100 },
    },
    
    // Processing agents
    {
      id: 'fact-checker',
      type: 'agentBase',
      data: { label: 'Fact Checker' },
      position: { x: 300, y: 50 },
    },
    {
      id: 'linguist',
      type: 'agentBase',
      data: { label: 'Linguist' },
      position: { x: 600, y: 0 },
    },
    {
      id: 'domain-expert-1',
      type: 'agentBase',
      data: { label: 'Domain Expert 1' },
      position: { x: 600, y: 100 },
    },
    {
      id: 'domain-expert-2',
      type: 'agentBase',
      data: { label: 'Domain Expert 2' },
      position: { x: 600, y: 200 },
    },
    
    // Central teacher agent
    {
      id: 'teacher',
      type: 'agentBase',
      data: { label: 'Teacher' },
      position: { x: 900, y: 100 },
    },
    
    // Output nodes
    {
      id: 'answers',
      type: 'textNode',
      data: { label: 'Answers', text: '', placeholder: 'Generated answers will appear here...' },
      position: { x: 1200, y: 50 },
    },
    {
      id: 'basic-concepts',
      type: 'textNode',
      data: { label: 'Basic Concepts and Related Concepts', text: '', placeholder: 'Related concepts will appear here...' },
      position: { x: 1200, y: 100 },
    },
    {
      id: 'suggested-topics',
      type: 'textNode',
      data: { label: 'Suggested Topics', text: '', placeholder: 'Topic suggestions will appear here...' },
      position: { x: 1200, y: 150 },
    },
    {
      id: 'quiz',
      type: 'textNode',
      data: { label: 'Quiz', text: '', placeholder: 'Quiz questions will appear here...' },
      position: { x: 1200, y: 250 },
    },
  ] as Node[],
  edges: [
    // Input connections
    { id: 'e-system-fact', source: 'system-prompt', sourceHandle: 'output', target: 'fact-checker', targetHandle: 'systemPrompt', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    { id: 'e-question-fact', source: 'user-question', sourceHandle: 'output', target: 'fact-checker', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    
    // Fact checker to experts
    { id: 'e-fact-linguist', source: 'fact-checker', sourceHandle: 'output', target: 'linguist', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    { id: 'e-fact-expert1', source: 'fact-checker', sourceHandle: 'output', target: 'domain-expert-1', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    { id: 'e-fact-expert2', source: 'fact-checker', sourceHandle: 'output', target: 'domain-expert-2', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    
    // Experts to teacher
    { id: 'e-linguist-teacher', source: 'linguist', sourceHandle: 'output', target: 'teacher', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    { id: 'e-expert1-teacher', source: 'domain-expert-1', sourceHandle: 'output', target: 'teacher', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    { id: 'e-expert2-teacher', source: 'domain-expert-2', sourceHandle: 'output', target: 'teacher', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    
    // Teacher to outputs
    { id: 'e-teacher-answers', source: 'teacher', sourceHandle: 'output', target: 'answers', targetHandle: 'input', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    { id: 'e-teacher-concepts', source: 'teacher', sourceHandle: 'output', target: 'basic-concepts', targetHandle: 'input', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    { id: 'e-teacher-topics', source: 'teacher', sourceHandle: 'output', target: 'suggested-topics', targetHandle: 'input', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    { id: 'e-teacher-quiz', source: 'teacher', sourceHandle: 'output', target: 'quiz', targetHandle: 'input', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    
    // Feedback loop: Quiz back to user question for continuous learning (routed around bottom)
    { 
      id: 'e-quiz-feedback', 
      source: 'quiz', 
      sourceHandle: 'output', 
      target: 'user-question', 
      targetHandle: 'input', 
      type: 'smoothstep',
      pathOptions: {
        offset: 20,
        borderRadius: 10,
        curvature: 0.25,
      },
      style: { 
        stroke: 'oklch(55.8% 0.288 302.321)', 
        strokeWidth: 2, 
        strokeDasharray: '5,5' 
      },
      markerEnd: {
        type: 'arrowclosed',
        color: 'oklch(55.8% 0.288 302.321)',
      },
      // Route the edge to go down and around
      sourcePosition: 'bottom',
      targetPosition: 'bottom',
    },
  ] as Edge[],
  executionWaves: [
    // Wave 0: Input processing
    ['e-system-fact', 'e-question-fact'],
    // Wave 1: Fact checking and expert consultation
    ['e-fact-linguist', 'e-fact-expert1', 'e-fact-expert2'],
    // Wave 2: Teaching synthesis
    ['e-linguist-teacher', 'e-expert1-teacher', 'e-expert2-teacher'],
    // Wave 3: Output generation
    ['e-teacher-answers', 'e-teacher-concepts', 'e-teacher-topics', 'e-teacher-quiz'],
    // Wave 4: Feedback loop for continuous learning
    ['e-quiz-feedback'],
  ],
};
