import { useState } from 'react';
import { ChatViewPage } from './components/ChatViewPage';
import { FlowViewPage } from './components/FlowViewPage';
import { MarkdownViewPage } from './components/MarkdownViewPage';
// import { Camera } from 'lucide-react';

type TabType = 'chat' | 'flow' | 'markdown';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('flow');

  const tabs = [
    { id: 'chat' as const, label: 'Chat', icon: 'chat_bubble_outline' },
    { id: 'flow' as const, label: 'Flow', icon: 'lan' },
    { id: 'markdown' as const, label: 'Markdown', icon: 'text_snippet' },
  ];

  const renderActiveView = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatViewPage />;
      case 'flow':
        return <FlowViewPage />;
      case 'markdown':
        return <MarkdownViewPage />;
      default:
        return <FlowViewPage />;
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">AI Colab</h1>
            <p className="text-gray-600 text-sm">
              Plan, search, and build, together with your AI team.
            </p>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center space-x-2 px-3 py-1 rounded-md text-sm font-medium transition-colors
                  ${
                    activeTab === tab.id
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                  }
                `}
              >
                <span className="material-symbols-outlined text-gray-400 !text-sm">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {renderActiveView()}
      </div>
    </div>
  );
}

export default App;
