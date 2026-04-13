"use client";

import { useState } from "react";

interface ProductSpec {
  label: string;
  value: string;
}

interface Props {
  description?: string | null;
  specifications?: ProductSpec[] | null;
}

type Tab = "description" | "specifications";

const TABS: { id: Tab; label: string }[] = [
  { id: "description", label: "상품 설명" },
  { id: "specifications", label: "상품 사양" },
];

export function ProductTabs({ description, specifications }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("description");

  return (
    <div>
      <div className="flex border-b border-neutral-200 mb-8" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
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

      <div className="max-w-2xl" role="tabpanel">
        {activeTab === "description" && (
          <>
            {description ? (
              <p className="text-neutral-600 leading-relaxed text-[15px]">
                {description}
              </p>
            ) : (
              <p className="text-neutral-400 text-sm">상품 설명이 없습니다.</p>
            )}
          </>
        )}

        {activeTab === "specifications" && (
          <>
            {specifications && specifications.length > 0 ? (
              <table className="w-full text-sm">
                <tbody>
                  {specifications.map((spec, i) => (
                    <tr key={i} className="border-b border-neutral-100 last:border-0">
                      <td className="py-3.5 pr-8 font-medium text-neutral-500 w-32">
                        {spec.label}
                      </td>
                      <td className="py-3.5 text-brand">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-neutral-400 text-sm">사양 정보가 없습니다.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
