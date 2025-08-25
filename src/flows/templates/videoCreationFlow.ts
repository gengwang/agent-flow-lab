import { Node, Edge } from '@xyflow/react';
import { FlowTemplate } from '../../types/Flow';

// Video content creation workflow with multiple creative teams and platform scrapers
export const videoCreationFlow: FlowTemplate = {
  id: 'video-creation-flow',
  metadata: {
    name: 'Video Content Creation Flow',
    description: 'A comprehensive video production workflow with platform scrapers, creative teams, and specialized video production roles',
    category: 'Video Production',
    tags: ['video', 'content-creation', 'social-media', 'production', 'creative-teams'],
    version: '1.0.0',
    author: 'Agent Flow Lab',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  preview: {
    nodeCount: 15,
    complexity: 'complex',
  },
  nodes: [
    // Input nodes
    {
      id: 'system-prompt',
      type: 'textNode',
      data: { 
        label: 'System Prompt', 
        placeholder: 'Enter video production guidelines...',
        text: 'You are a video production coordinator. Create engaging, platform-optimized content that resonates with target audiences across multiple social media platforms.'
      },
      position: { x: 0, y: 50 },
    },
    {
      id: 'user-idea',
      type: 'textNode',
      data: { 
        label: 'User Idea', 
        placeholder: 'Describe your video concept...',
        text: 'Create a series of short videos showcasing eco-friendly lifestyle tips for a Gen Z audience'
      },
      position: { x: 0, y: 150 },
    },
    
    // Platform scrapers
    {
      id: 'youtube-scraper',
      type: 'agentBase',
      data: { label: 'YouTube Scraper' },
      position: { x: 0, y: 300 },
    },
    {
      id: 'tiktok-scraper',
      type: 'agentBase',
      data: { label: 'TikTok Scraper' },
      position: { x: 0, y: 400 },
    },
    {
      id: 'fact-checker',
      type: 'agentBase',
      data: { label: 'Fact Checker' },
      position: { x: 0, y: 500 },
    },
    
    // Central coordination
    {
      id: 'creative-teams',
      type: 'textNode',
      data: { 
        label: '3x Squads Creative Teams',
        text: '',
        placeholder: 'Creative team assignments and project briefs...'
      },
      position: { x: 400, y: 275 },
    },
    
    // Creative specialists
    {
      id: 'analyst',
      type: 'agentBase',
      data: { label: 'Content Analyst' },
      position: { x: 700, y: 50 },
    },
    {
      id: 'marketing-expert',
      type: 'agentBase',
      data: { label: 'Marketing Strategist' },
      position: { x: 700, y: 120 },
    },
    {
      id: 'copy-writer',
      type: 'agentBase',
      data: { label: 'Copywriter' },
      position: { x: 700, y: 190 },
    },
    {
      id: 'video-editor',
      type: 'agentBase',
      data: { label: 'Video Editor' },
      position: { x: 700, y: 260 },
    },
    {
      id: 'animator',
      type: 'agentBase',
      data: { label: 'Animator' },
      position: { x: 700, y: 330 },
    },
    {
      id: 'storyboard-artist',
      type: 'agentBase',
      data: { label: 'Storyboard Artist' },
      position: { x: 700, y: 400 },
    },
    
    // Quality control and outputs
    {
      id: 'judge-panel',
      type: 'agentBase',
      data: { label: 'Review Panel' },
      position: { x: 1000, y: 225 },
    },
    {
      id: 'short-video-1',
      type: 'agentBase',
      data: { label: 'Final Video A' },
      position: { x: 1300, y: 175 },
    },
    {
      id: 'short-video-2',
      type: 'agentBase',
      data: { label: 'Final Video B' },
      position: { x: 1300, y: 275 },
    },
  ] as Node[],
  edges: [
    // Input connections to creative teams
    { id: 'e-system-teams', source: 'system-prompt', sourceHandle: 'output', target: 'creative-teams', targetHandle: 'input', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    { id: 'e-idea-teams', source: 'user-idea', sourceHandle: 'output', target: 'creative-teams', targetHandle: 'input', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    
    // Scrapers and fact checker to creative teams
    { id: 'e-youtube-teams', source: 'youtube-scraper', sourceHandle: 'output', target: 'creative-teams', targetHandle: 'input', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    { id: 'e-tiktok-teams', source: 'tiktok-scraper', sourceHandle: 'output', target: 'creative-teams', targetHandle: 'input', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    { id: 'e-fact-teams', source: 'fact-checker', sourceHandle: 'output', target: 'creative-teams', targetHandle: 'input', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    
    // Creative teams to specialists
    { id: 'e-teams-analyst', source: 'creative-teams', sourceHandle: 'output', target: 'analyst', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    { id: 'e-teams-marketing', source: 'creative-teams', sourceHandle: 'output', target: 'marketing-expert', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    { id: 'e-teams-copy', source: 'creative-teams', sourceHandle: 'output', target: 'copy-writer', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    { id: 'e-teams-video', source: 'creative-teams', sourceHandle: 'output', target: 'video-editor', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    { id: 'e-teams-animator', source: 'creative-teams', sourceHandle: 'output', target: 'animator', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    { id: 'e-teams-storyboard', source: 'creative-teams', sourceHandle: 'output', target: 'storyboard-artist', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    
    // Specialists to judge panel
    { id: 'e-analyst-judge', source: 'analyst', sourceHandle: 'output', target: 'judge-panel', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    { id: 'e-marketing-judge', source: 'marketing-expert', sourceHandle: 'output', target: 'judge-panel', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    { id: 'e-copy-judge', source: 'copy-writer', sourceHandle: 'output', target: 'judge-panel', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    { id: 'e-video-judge', source: 'video-editor', sourceHandle: 'output', target: 'judge-panel', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    { id: 'e-animator-judge', source: 'animator', sourceHandle: 'output', target: 'judge-panel', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    { id: 'e-storyboard-judge', source: 'storyboard-artist', sourceHandle: 'output', target: 'judge-panel', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    
    // Judge panel to final videos
    { id: 'e-judge-video1', source: 'judge-panel', sourceHandle: 'output', target: 'short-video-1', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
    { id: 'e-judge-video2', source: 'judge-panel', sourceHandle: 'output', target: 'short-video-2', targetHandle: 'context', type: 'default', style: { stroke: '#94a3b8', strokeWidth: 2 } },
  ] as Edge[],
  executionWaves: [
    // Wave 0: Input and research gathering
    ['e-system-teams', 'e-idea-teams', 'e-youtube-teams', 'e-tiktok-teams', 'e-fact-teams'],
    // Wave 1: Creative team coordination and specialist assignment
    ['e-teams-analyst', 'e-teams-marketing', 'e-teams-copy', 'e-teams-video', 'e-teams-animator', 'e-teams-storyboard'],
    // Wave 2: Creative work and quality review
    ['e-analyst-judge', 'e-marketing-judge', 'e-copy-judge', 'e-video-judge', 'e-animator-judge', 'e-storyboard-judge'],
    // Wave 3: Final video production
    ['e-judge-video1', 'e-judge-video2'],
  ],
};
