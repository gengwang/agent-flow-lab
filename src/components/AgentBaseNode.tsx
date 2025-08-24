import { Handle, Position, NodeProps } from '@xyflow/react';

export interface AgentBaseNodeData {
  label?: string;
  systemPrompt?: string;
  context?: object | string;
  schema?: object;
  tools?: object[];
}

export function AgentBaseNode({ data, selected }: NodeProps) {
  return (
    <div className={`
      bg-white border-2 rounded-lg shadow-lg min-w-64 p-4
      ${selected ? 'border-blue-500' : 'border-gray-300'}
      hover:border-gray-400 transition-colors
    `}>
      {/* Input Handles */}
      <Handle
        type="target"
        position={Position.Left}
        id="systemPrompt"
        style={{ top: '25%', background: '#3b82f6' }}
        className="w-3 h-3"
      />
      <Handle
        type="target"
        position={Position.Left}
        id="context"
        style={{ top: '40%', background: '#10b981' }}
        className="w-3 h-3"
      />
      <Handle
        type="target"
        position={Position.Left}
        id="schema"
        style={{ top: '55%', background: '#f59e0b' }}
        className="w-3 h-3"
      />
      <Handle
        type="target"
        position={Position.Left}
        id="tools"
        style={{ top: '70%', background: '#8b5cf6' }}
        className="w-3 h-3"
      />
      
      {/* Node Content */}
      <div className="text-center">
        <div className="text-sm font-semibold text-gray-800 mb-2">
          {(data as any)?.label || 'Agent Base Node'}
        </div>
        
        {/* Input Labels */}
        <div className="text-xs text-gray-600 space-y-1 text-left mb-3">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            <span>systemPrompt (string)</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span>context (object/file)</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
            <span>schema (json)</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
            <span>tools (list)</span>
          </div>
        </div>
        
        {/* Output Label */}
        <div className="text-xs text-gray-600 text-right">
          <div className="flex items-center justify-end">
            <span>output</span>
            <div className="w-2 h-2 bg-red-500 rounded-full ml-2"></div>
          </div>
        </div>
      </div>
      
      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        style={{ background: '#ef4444' }}
        className="w-3 h-3"
      />
    </div>
  );
}
