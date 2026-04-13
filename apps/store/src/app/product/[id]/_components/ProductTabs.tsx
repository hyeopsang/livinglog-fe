"use client";

import { useRef, useState } from "react";

interface ProductSpec {
  label: string;
  value: string;
}

interface Props {
  description?: string | null;
  specifications?: ProductSpec[] | null;
}

type Tab = "description" | "specifications" | "shipping";

const TABS: { id: Tab; label: string }[] = [
  { id: "description", label: "상품 설명" },
  { id: "specifications", label: "상품 사양" },
  { id: "shipping", label: "배송" },
];

export function ProductTabs({ description, specifications }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("description");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(e: React.KeyboardEvent, index: number) {
    let next = index;
    if (e.key === "ArrowRight") next = (index + 1) % TABS.length;
    else if (e.key === "ArrowLeft") next = (index - 1 + TABS.length) % TABS.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = TABS.length - 1;
    else return;

    e.preventDefault();
    const nextTab = TABS[next];
    if (!nextTab) return;
    setActiveTab(nextTab.id);
    tabRefs.current[next]?.focus();
  }

  return (
    <div>
      <div className="flex border-b border-neutral-200 mb-8" role="tablist">
        {TABS.map((tab, i) => (
          <button
            key={tab.id}
            ref={(el) => { tabRefs.current[i] = el; }}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => setActiveTab(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className={`px-6 py-3.5 text-sm font-semibold transition-colors ${
              activeTab === tab.id
                ? "text-brand border-b-2 border-brand"
                : "text-neutral-400 hover:text-neutral-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id="panel-description"
        aria-labelledby="tab-description"
        hidden={activeTab !== "description"}
        className="max-w-2xl"
      >
        {description ? (
          <p className="text-neutral-600 leading-relaxed text-[15px]">{description}</p>
        ) : (
          <p className="text-neutral-400 text-sm">상품 설명이 없습니다.</p>
        )}
      </div>

      <div
        role="tabpanel"
        id="panel-specifications"
        aria-labelledby="tab-specifications"
        hidden={activeTab !== "specifications"}
        className="max-w-2xl"
      >
        {specifications && specifications.length > 0 ? (
          <table className="w-full text-sm">
            <tbody>
              {specifications.map((spec, i) => (
                <tr key={i} className="border-b border-neutral-100 last:border-0">
                  <td className="py-3.5 pr-8 font-medium text-neutral-500 w-32">{spec.label}</td>
                  <td className="py-3.5 text-brand">{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-neutral-400 text-sm">사양 정보가 없습니다.</p>
        )}
      </div>

      <div
        role="tabpanel"
        id="panel-shipping"
        aria-labelledby="tab-shipping"
        hidden={activeTab !== "shipping"}
        className="max-w-2xl"
      >
        <p className="text-neutral-400 text-sm">배송 정보가 없습니다.</p>
      </div>
    </div>
  );
}
