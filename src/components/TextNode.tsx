import { Handle, Position, NodeProps } from '@xyflow/react';
import { useState, useCallback } from 'react';

export interface TextNodeData {
  label?: string;
  text?: string;
  placeholder?: string;
}

export function TextNode({ data, selected }: NodeProps) {
  const nodeData = data as TextNodeData;
  const [text, setText] = useState(nodeData.text || '');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    // You could also update the node data here if needed
  }, []);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (!isExpanded) {
    // Collapsed state - compact view
    return (
      <div 
        className={`
          bg-blue-100 backdrop-blur border-2 shadow min-w-32 px-4 py-2 relative cursor-pointer
          ${selected ? 'border-blue-600' : 'border-blue-400'}
          hover:border-blue-500 
          rounded-lg
        `}
      >
        {/* Input Handle */}
        <Handle
          type="target"
          position={Position.Left}
          id="input"
          style={{
            background: '#3b82f6',
            left: '-1px',
          }}
          className="w-3 h-3"
        />
        
        {/* Collapsed content */}
        <div className="text-xs text-gray-700 text-center flex items-center justify-center">
          <span className="mr-2 material-symbols-outlined text-blue-600 cursor-pointer" onClick={toggleExpanded}>
            keyboard_arrow_right
          </span>
          <span className="truncate">{nodeData.label || 'Text'}</span>
        </div>
        
        {/* Output Handle */}
        <Handle
          type="source"
          position={Position.Right}
          id="output"
          style={{ background: '#3b82f6' }}
          className="w-3 h-3"
        />
      </div>
    );
  }

  // Expanded state - editable text area
  return (
    <div 
      className={`
        bg-blue-50 backdrop-blur border-2 rounded-lg shadow min-w-64 p-0 relative
        ${selected ? 'border-blue-600' : 'border-blue-400'}
        hover:border-blue-500
      `}
    >
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Left}
        id="input"
        style={{
          background: '#3b82f6',
          top: '50%',
          left: '-1px',
          transform: 'translateY(-50%)',
        }}
        className="w-3 h-3"
      />

      {/* Header */}
      <div className="text-xs bg-blue-200 text-gray-800 mb-0 flex items-center px-2 py-1 rounded-t-lg">
        <span className="material-symbols-outlined cursor-pointer text-blue-600 mr-1" onClick={toggleExpanded}>
          keyboard_arrow_down
        </span>
        <span>{nodeData.label || 'Text'}</span>
      </div>
      
      {/* Text Area */}
      <div className="p-3">
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder={nodeData.placeholder || 'Enter your text here...'}
          className="
            w-full h-24 p-2 text-xs
            border border-blue-300 rounded
            resize-none focus:outline-none focus:border-blue-500
            bg-white text-gray-700
          "
          onClick={(e) => e.stopPropagation()} // Prevent node selection when clicking in textarea
        />
      </div>
      
      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        style={{ 
          background: '#3b82f6',
          top: '50%',
          transform: 'translateY(-50%)'
        }}
        className="w-3 h-3"
      />
    </div>
  );
}
