import { Handle, Position, NodeProps } from '@xyflow/react';
import { useState } from 'react';

export interface AgentBaseNodeData {
  label?: string;
  systemPrompt?: string;
  context?: object | string;
  schema?: object;
  tools?: object[];
}

export function AgentBaseNode({ data, selected }: NodeProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  const ports = [
    { id: 'systemPrompt', label: 'Rules', color: 'oklch(70.7% 0.022 261.325)', shape: 'circle' },
    { id: 'context', label: 'Context', color: 'oklch(70.7% 0.022 261.325)', shape: 'diamond' },
    { id: 'schema', label: 'Schema', color: 'oklch(70.4% 0.14 182.503)', shape: 'diamond' },
    { id: 'tools', label: 'Tools', color: 'oklch(70.4% 0.14 182.503)', shape: 'diamond' },
  ];

  if (!isExpanded) {
    // Collapsed state - pill shape with sockets along rounded edge
    const nodeHeight = 48; // py-3 * 2 + text height ≈ 48px
    const borderRadius = nodeHeight / 2; // 24px radius for pill shape
    
    return (
      <div 
        className={`
          bg-teal-500/40 backdrop-blur border-1 shadow min-w-32 px-6 py-3 relative cursor-pointer
          ${selected ? 'border-teal-700' : 'border-teal-500'}
          hover:border-teal-600 
          rounded-full
        `}
        style={{ height: `${nodeHeight}px` }}
      >
        {/* Input Handles for collapsed state - distributed along left rounded edge */}
        {ports.map((port, index) => {
          // Calculate position along the left semicircle of the pill
          const totalPorts = ports.length;
          
          let angle;
          if (totalPorts === 1) {
            // Single handle: place at horizontal center (π angle)
            angle = Math.PI;
          } else {
            // Multiple handles: start from center and spread out based on count
            const centerAngle = Math.PI; // Horizontal center
            const maxSpread = Math.PI * 0.6; // Maximum spread (less than full semicircle)
            const actualSpread = Math.min(maxSpread, (totalPorts - 1) * 0.3); // Spread increases with port count
            
            // Distribute around center
            const startAngle = centerAngle - actualSpread / 2;
            const endAngle = centerAngle + actualSpread / 2;
            angle = startAngle + (index / (totalPorts - 1)) * (endAngle - startAngle);
          }
          
          // Calculate position directly on the pill's left curved border
          const centerX = borderRadius; // Center of the left semicircle is at radius distance from left edge
          const centerY = borderRadius; // Vertical center of the pill
          const x = centerX + borderRadius * Math.cos(angle); // Position directly on the border
          const y = centerY + borderRadius * Math.sin(angle);
          
          return (
            <Handle
              key={port.id}
              type="target"
              position={Position.Left}
              id={port.id}
              style={{
                background: port.color,
                position: 'absolute',
                left: `${x}px`,
                top: `${y}px`,
                transform: `translate(-50%, -50%) ${port.shape === 'diamond' ? 'rotate(45deg)' : ''}`,
                ...(port.shape === 'diamond' ? {
                  borderRadius: 0
                } : {})
              }}
              className={port.shape === 'diamond' ? 'w-4 h-4' : 'w-3 h-3'}
            />
          );
        })}
        
        {/* Collapsed content */}
        <div className="text-xs text-gray-900 text-center flex items-center justify-center h-full">
          <span className="mr-2 material-symbols-outlined text-teal-700 cursor-pointer" onClick={handleClick}>keyboard_arrow_right</span>
          {(data as any)?.label || 'Agent'}
        </div>
        
        {/* Output Handle */}
        <Handle
          type="source"
          position={Position.Right}
          id="output"
          style={{ background: 'oklch(55.1% 0.027 264.364)' }}
          className="w-3 h-3"
        />
      </div>
    );
  }

  // Expanded state - current design with port names
  return (
    <div 
      className={`
        bg-slate-100/10 backdrop-blur border-1 rounded shadow min-w-48 p-0 pb-2 relative cursor-pointer
        ${selected ? 'border-teal-700' : 'border-teal-500'}
        hover:border-teal-600
      `}
    >
      {/* Input Handles Container - positioned to align with labels */}
      {ports.map((port, index) => {
        // Calculate exact position to align with corresponding label center
        const headerHeight = 28; // Height of the teal header with title (adjusted)
        const labelHeight = 24; // Height of each label (py-1 + text + borders)
        const spaceBetweenLabels = 4; // space-y-1 = 4px
        const containerPaddingTop = 2; // Container top padding
        const labelPaddingTop = 4; // Individual label py-1 top padding
        
        // Calculate Y position to align with exact center of each label
        const labelCenterY = headerHeight + containerPaddingTop + 
                            (index * (labelHeight + spaceBetweenLabels)) + 
                            labelPaddingTop + (labelHeight / 2);
        
        const x = -1; // Position on the left border
        const y = labelCenterY;
        
        return (
          <Handle
            key={port.id}
            type="target"
            position={Position.Left}
            id={port.id}
            style={{
              background: port.color,
              position: 'absolute',
              left: `${x}px`,
              top: `${y}px`,
              transform: `translate(-50%, -50%) ${port.shape === 'diamond' ? 'rotate(45deg)' : ''}`,
              ...(port.shape === 'diamond' ? {
                borderRadius: 0
              } : {})
            }}
            className={port.shape === 'diamond' ? 'w-5 h-5' : 'w-4 h-4'}
          />
        );
      })}

      {/* Expanded content with port labels */}
      <div className="">
        <div className="text-xs bg-teal-500/40 backdrop-blur text-gray-950 mb-2 flex items-center">
          <span className="mx-1 my-[2px] material-symbols-outlined cursor-pointer text-teal-700" onClick={handleClick}>keyboard_arrow_down</span>
          {(data as any)?.label || 'Agent'}
        </div>
        
        {/* Port Labels */}
        <div className="px-2 py-0 rounded space-y-1 text-xs text-gray-600">
          {ports.map((port) => (
            <div key={port.id} className="bg-slate-200 py-1 px-2 rounded-sm flex items-center">
              {/* <div 
                className={`mr-3 ${port.shape === 'diamond' ? 'w-4 h-4 rotate-45' : 'w-4 h-4 rounded-full'}`}
                style={{ background: port.color }}
              /> */}
              <span>{port.label}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        style={{ background: 'oklch(55.1% 0.027 264.364)' }}
        className="w-3 h-3"
      />
    </div>
  );
}
