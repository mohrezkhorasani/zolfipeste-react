import { useState } from "react";

export default function Tabs({ tabs, defaultTabId }) {
  const [activeTab, setActiveTab] = useState(
    defaultTabId ?? tabs[0]?.id
  );

  const activeContent = tabs.find(t => t.id === activeTab);

  return (
    <div className="w-full" dir="rtl">
      {/* Tabs Header */}
      <div className="flex border-b border-gray-300 shadow-2xl shadow-gray-300 rounded-md">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
        flex-1 min-w-0
        flex items-center justify-center gap-1 sm:gap-2
        py-2 sm:py-3
        text-[11px] sm:text-sm
        font-medium transition
        ${activeTab === tab.id
                ? "border-b-2 border-[#2B3992] text-myb bg-blue-50"
                : "text-gray-500 hover:bg-gray-100"
              }
      `}
          >
            {/* Icon */}
            {tab.iconClass && (
              <i className={`${tab.iconClass} text-xs sm:text-sm`} />
            )}

            {/* Title */}
            <span className="whitespace-nowrap truncate">
              {tab.title}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4 bg-transparent mt-[3%] rounded-b">
        <h2 className="font-bold mb-2">{activeContent?.title}</h2>
        {activeContent?.content}
      </div>
    </div>
  );
}