import { Handle, Position, NodeProps } from '@xyflow/react';
import { useState } from 'react';

export interface Port {
  id: string;
  label: string;
  color: string;
  shape: 'circle' | 'diamond';
}

export interface ExpandableBaseNodeData {
  label?: string;
  inputPorts?: Port[];
  outputPorts?: Port[];
  [key: string]: any;
}

export interface ExpandableBaseNodeProps extends NodeProps {
  data: ExpandableBaseNodeData;
  defaultExpanded?: boolean;
  collapsedContent?: React.ReactNode;
  expandedContent?: React.ReactNode;
  headerClassName?: string;
  bodyClassName?: string;
}

export function ExpandableBaseNode({ 
  data, 
  selected,
  defaultExpanded = false,
  collapsedContent,
  expandedContent,
  headerClassName = '',
  bodyClassName = ''
}: ExpandableBaseNodeProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  // Default ports if not provided
  const inputPorts = data.inputPorts || [];
  const outputPorts = data.outputPorts || [
    { id: 'output', label: 'Output', color: 'oklch(55.1% 0.027 264.364)', shape: 'circle' }
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
          ${headerClassName}
        `}
        style={{ height: `${nodeHeight}px` }}
      >
        {/* Input Handles for collapsed state - distributed along left rounded edge */}
        {inputPorts.map((port, index) => {
          // Calculate position along the left semicircle of the pill
          const totalPorts = inputPorts.length;
          
          let angle;
          if (totalPorts === 0) {
            return null; // No input ports
          } else if (totalPorts === 1) {
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
          <span className="mr-2 material-symbols-outlined text-teal-700 cursor-pointer" onClick={handleClick}>
            keyboard_arrow_right
          </span>
          {collapsedContent || data.label || 'Node'}
        </div>
        
        {/* Output Handles for collapsed state */}
        {outputPorts.map((port, index) => {
          // For collapsed state, distribute output handles along right edge
          const totalOutputs = outputPorts.length;
          let yOffset = 0;
          
          if (totalOutputs === 1) {
            yOffset = nodeHeight / 2; // Center
          } else {
            // Distribute vertically along right edge
            const spacing = nodeHeight / (totalOutputs + 1);
            yOffset = spacing * (index + 1);
          }
          
          return (
            <Handle
              key={port.id}
              type="source"
              position={Position.Right}
              id={port.id}
              style={{ 
                background: port.color,
                top: `${yOffset}px`,
                transform: `translateY(-50%) ${port.shape === 'diamond' ? 'rotate(45deg)' : ''}`
              }}
              className={port.shape === 'diamond' ? 'w-4 h-4' : 'w-3 h-3'}
            />
          );
        })}
      </div>
    );
  }

  // Expanded state
  return (
    <div 
      className={`
        bg-slate-100/10 backdrop-blur border-1 rounded shadow min-w-48 p-0 pb-2 relative cursor-pointer
        ${selected ? 'border-teal-700' : 'border-teal-500'}
        hover:border-teal-600
        ${bodyClassName}
      `}
    >
      {/* Input Handles Container - positioned to align with labels */}
      {inputPorts.map((port, index) => {
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

      {/* Expanded content */}
      <div className="">
        <div className={`text-xs bg-teal-500/40 backdrop-blur text-gray-950 mb-2 flex items-center ${headerClassName}`}>
          <span className="mx-1 my-[2px] material-symbols-outlined cursor-pointer text-teal-700" onClick={handleClick}>
            keyboard_arrow_down
          </span>
          {data.label || 'Node'}
        </div>
        
        {expandedContent || (
          /* Default expanded content showing input port labels */
          inputPorts.length > 0 && (
            <div className="px-2 py-0 rounded space-y-1 text-xs text-gray-600">
              {inputPorts.map((port) => (
                <div key={port.id} className="bg-slate-200 py-1 px-2 rounded-sm flex items-center">
                  <span>{port.label}</span>
                </div>
              ))}
            </div>
          )
        )}
      </div>
      
      {/* Output Handles */}
      {outputPorts.map((port, index) => {
        // For expanded state, position output handles vertically along right edge
        const totalOutputs = outputPorts.length;
        let yOffset = '50%'; // Default center position
        
        if (totalOutputs > 1) {
          // Distribute vertically
          const spacing = 100 / (totalOutputs + 1);
          yOffset = `${spacing * (index + 1)}%`;
        }
        
        return (
          <Handle
            key={port.id}
            type="source"
            position={Position.Right}
            id={port.id}
            style={{ 
              background: port.color,
              top: yOffset,
              transform: `translateY(-50%) ${port.shape === 'diamond' ? 'rotate(45deg)' : ''}`
            }}
            className={port.shape === 'diamond' ? 'w-4 h-4' : 'w-3 h-3'}
          />
        );
      })}
    </div>
  );
}
