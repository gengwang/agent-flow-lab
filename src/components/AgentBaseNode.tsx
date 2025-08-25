import { NodeProps } from '@xyflow/react';
import { ExpandableBaseNode, ExpandableBaseNodeData, Port } from './ExpandableBaseNode';

export interface AgentBaseNodeData extends ExpandableBaseNodeData {
  systemPrompt?: string;
  context?: object | string;
  schema?: object;
  tools?: object[];
}

export function AgentBaseNode(props: NodeProps) {
  const { data } = props;
  const inputPorts: Port[] = [
    { id: 'systemPrompt', label: 'Rules', color: 'oklch(70.7% 0.022 261.325)', shape: 'circle' },
    { id: 'context', label: 'Context', color: 'oklch(70.7% 0.022 261.325)', shape: 'diamond' },
    { id: 'schema', label: 'Schema', color: 'oklch(70.4% 0.14 182.503)', shape: 'diamond' },
    { id: 'tools', label: 'Tools', color: 'oklch(70.4% 0.14 182.503)', shape: 'diamond' },
  ];

  const outputPorts: Port[] = [
    { id: 'output', label: 'Output', color: 'oklch(55.1% 0.027 264.364)', shape: 'circle' }
  ];

  // Prepare data with ports for the base component
  const nodeData: ExpandableBaseNodeData = {
    ...data,
    label: (data as any)?.label || 'Agent',
    inputPorts,
    outputPorts,
  };

  // Custom expanded content showing port labels
  const expandedContent = (
    <div className="px-2 py-0 rounded space-y-1 text-xs text-gray-600">
      {inputPorts.map((port) => (
        <div key={port.id} className="bg-slate-200 py-1 px-2 rounded-sm flex items-center">
          <span>{port.label}</span>
        </div>
      ))}
    </div>
  );

  return (
    <ExpandableBaseNode
      {...props}
      data={nodeData}
      defaultExpanded={false}
      expandedContent={expandedContent}
    />
  );
}
