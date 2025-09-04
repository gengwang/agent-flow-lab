import { useState, useMemo } from 'react';
import { FlowTemplate } from '../types/Flow';
import { flowTemplates, searchFlowTemplates } from '../flows/templates';

interface FlowLibraryPanelProps {
  onTemplateSelect: (template: FlowTemplate) => void;
  onTemplateDragStart?: (template: FlowTemplate) => void;
  className?: string;
}

interface FlowTemplateCardProps {
  template: FlowTemplate;
  onSelect: (template: FlowTemplate) => void;
  onDragStart?: (template: FlowTemplate) => void;
}

function FlowTemplateCard({ template, onSelect, onDragStart }: FlowTemplateCardProps) {
  const complexityColors = {
    simple: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    complex: 'bg-red-100 text-red-800 border-red-200',
  };

  const handleDragStart = (e: React.DragEvent) => {
    if (onDragStart) {
      onDragStart(template);
      e.dataTransfer.setData('application/json', JSON.stringify({
        type: 'flow-template',
        templateId: template.id
      }));
      e.dataTransfer.effectAllowed = 'copy';
    }
  };

  const handleClick = () => {
    onSelect(template);
  };

  return (
    <div
      className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
      draggable={!!onDragStart}
      onDragStart={handleDragStart}
      onClick={handleClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-medium text-sm text-gray-900 group-hover:text-teal-700 transition-colors">
          {template.metadata.name}
        </h3>
        <span className="material-symbols-outlined text-gray-400 text-sm group-hover:text-teal-500">
          add_circle
        </span>
      </div>

      {/* Description */}
      <p className="text-xs text-gray-600 mb-3 line-clamp-2">
        {template.metadata.description}
      </p>

      {/* Metadata */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs border ${
            complexityColors[template.preview?.complexity || 'simple']
          }`}>
            {template.preview?.complexity || 'simple'}
          </span>
          <span className="text-xs text-gray-500">
            {template.preview?.nodeCount || 0} nodes
          </span>
        </div>
        <span className="text-xs text-gray-400">
          {template.metadata.category}
        </span>
      </div>

      {/* Tags */}
      {template.metadata.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {template.metadata.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
            >
              {tag}
            </span>
          ))}
          {template.metadata.tags.length > 3 && (
            <span className="text-xs text-gray-400">
              +{template.metadata.tags.length - 3}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export function FlowLibraryPanel({ onTemplateSelect, onTemplateDragStart, className = '' }: FlowLibraryPanelProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Get unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(flowTemplates.map(t => t.metadata.category)));
    return ['all', ...cats.sort()];
  }, []);

  // Filter templates based on search and category
  const filteredTemplates = useMemo(() => {
    let templates = searchQuery 
      ? searchFlowTemplates(searchQuery)
      : flowTemplates;

    if (selectedCategory !== 'all') {
      templates = templates.filter(t => t.metadata.category === selectedCategory);
    }

    return templates;
  }, [searchQuery, selectedCategory]);

  return (
    <div className={`h-full flex flex-col bg-gray-50 border-r border-gray-200 ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <h2 className="font-semibold text-gray-900 mb-3">Flow Library</h2>
        
        {/* Search */}
        <div className="relative mb-3">
          <span className="material-symbols-outlined absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
            search
          </span>
          <input
            type="text"
            placeholder="Search flows..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none bg-white"
          style={{
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            appearance: 'none',
            backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 8px center',
            backgroundSize: '16px',
            paddingRight: '32px'
          }}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </select>
      </div>

      {/* Templates List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map((template) => (
              <FlowTemplateCard
                key={template.id}
                template={template}
                onSelect={onTemplateSelect}
                onDragStart={onTemplateDragStart}
              />
            ))
          ) : (
            <div className="text-center py-8">
              <span className="material-symbols-outlined text-gray-300 text-4xl mb-2 block">
                search_off
              </span>
              <p className="text-gray-500 text-sm">No flows found</p>
              <p className="text-gray-400 text-xs mt-1">
                Try adjusting your search or category filter
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <button className="w-full px-3 py-2 text-sm text-teal-700 hover:text-teal-800 hover:bg-teal-50 border border-teal-200 rounded-md transition-colors flex items-center justify-center space-x-1">
          <span className="material-symbols-outlined text-sm">add</span>
          <span>Create Custom Flow</span>
        </button>
      </div>
    </div>
  );
}
