import { useState } from "react";

export default function Tabs({ tabs, defaultTabId }) {
  const [activeTab, setActiveTab] = useState(
    defaultTabId ?? tabs[0]?.id
  );

  const activeContent = tabs.find(t => t.id === activeTab);

  return (
    <div className="w-full" dir="rtl">
      {/* Tabs Header */}
      <div className="flex overflow-x-auto md:overflow-x-hidden border-b border-gray-300">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex-1 min-w-[120px]
              flex items-center justify-center gap-2
              py-3 text-sm font-medium transition
              ${
                activeTab === tab.id
                  ? "border-b-2 border-blue-500 text-blue-600 bg-blue-50"
                  : "text-gray-500 hover:bg-gray-100"
              }
            `}
          >
            {/* Icon */}
            {tab.iconClass && (
              <i className={`${tab.iconClass} text-base`} />
            )}

            {/* Title */}
            <span className="whitespace-nowrap">{tab.title}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4 bg-white border border-t-0 border-gray-300 rounded-b">
        <h2 className="font-bold mb-2">{activeContent?.title}</h2>
        {activeContent?.content}
      </div>
    </div>
  );
}