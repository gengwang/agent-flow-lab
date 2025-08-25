import { FlowTemplate } from '../../types/Flow';
import { researchAnalysisFlow } from './researchAnalysisFlow';
import { educationalQAFlow } from './educationalQAFlow';
import { videoCreationFlow } from './videoCreationFlow';

export const flowTemplates: FlowTemplate[] = [
  researchAnalysisFlow,
  educationalQAFlow,
  videoCreationFlow,
];

export const getFlowTemplateById = (id: string): FlowTemplate | undefined => {
  return flowTemplates.find(template => template.id === id);
};

export const getFlowTemplatesByCategory = (category: string): FlowTemplate[] => {
  return flowTemplates.filter(template => template.metadata.category === category);
};

export const searchFlowTemplates = (query: string): FlowTemplate[] => {
  const lowercaseQuery = query.toLowerCase();
  return flowTemplates.filter(template => 
    template.metadata.name.toLowerCase().includes(lowercaseQuery) ||
    template.metadata.description.toLowerCase().includes(lowercaseQuery) ||
    template.metadata.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export {
  researchAnalysisFlow,
  educationalQAFlow,
  videoCreationFlow,
};
