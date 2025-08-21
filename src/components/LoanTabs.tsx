import { cn } from "@/lib/utils";

const loanTypes = [
  { id: "all", label: "All Loans" },
  { id: "personal", label: "Personal" },
  { id: "auto", label: "Auto" },
  { id: "student", label: "Student" },
  { id: "business", label: "Business" },
  { id: "debt", label: "Debt Consolidation" }
];

interface LoanTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function LoanTabs({ activeTab, onTabChange }: LoanTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {loanTypes.map((type) => (
        <button
          key={type.id}
          onClick={() => onTabChange(type.id)}
          className={cn(
            "px-4 py-2 rounded-md text-sm transition-all duration-200",
            "hover:shadow-md hover:scale-105 transform",
            activeTab === type.id
              ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg" 
              : "bg-muted text-muted-foreground hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 border border-transparent dark:hover:bg-blue-900/20 dark:hover:text-blue-300"
          )}
        >
          {type.label}
        </button>
      ))}
    </div>
  );
}