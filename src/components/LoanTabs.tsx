"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const loanTypes = [
  { id: "all", label: "All Loans", isActive: true },
  { id: "personal", label: "Personal" },
  { id: "auto", label: "Auto" },
  { id: "student", label: "Student" },
  { id: "business", label: "Business" },
  { id: "debt", label: "Debt Consolidation" }
];

export function LoanTabs() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {loanTypes.map((type) => (
        <button
          key={type.id}
          onClick={() => setActiveTab(type.id)}
          className={cn(
            "px-4 py-2 rounded-md text-sm transition-colors duration-200",
            "hover:bg-accent hover:text-accent-foreground",
            activeTab === type.id
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-muted text-muted-foreground"
          )}
        >
          {type.label}
        </button>
      ))}
    </div>
  );
}