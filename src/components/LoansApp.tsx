"use client";

import { useState, useMemo } from "react";
import { Sidebar, MobileMenuButton } from "./Sidebar";
import { LoansTable, allLoanData, LoanData } from "./LoansTable";
import { LoanCalculator } from "./LoanCalculator";
import { LoanTabs } from "./LoanTabs";
import { LoanDetailsModal } from "./LoanDetailsModal";
import { Button } from "@/components/ui/button";
import { Moon, Sun, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedLoan, setSelectedLoan] = useState<LoanData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Filter loans based on active tab
  const filteredLoans = useMemo(() => {
    if (activeTab === "all") {
      return allLoanData;
    }
    return allLoanData.filter(loan => loan.loanType.includes(activeTab));
  }, [activeTab]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleDetailsClick = (loan: LoanData) => {
    setSelectedLoan(loan);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedLoan(null);
  };

  // Get tab-specific description
  const getTabDescription = () => {
    switch (activeTab) {
      case "personal":
        return "Find the best personal loans for your individual needs, from debt consolidation to major purchases.";
      case "auto":
        return "Compare auto loan rates and terms from top lenders to finance your next vehicle purchase.";
      case "student":
        return "Explore student loan options to fund your education with competitive rates and flexible terms.";
      case "business":
        return "Discover business loan solutions to grow your company, from startups to established enterprises.";
      case "debt":
        return "Consolidate your debt with lower interest rates and simplified monthly payments.";
      default:
        return "Compare top loan options across US banks, from personal to auto loans, find the best fit for your needs.";
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case "personal":
        return "Personal Loans";
      case "auto":
        return "Auto Loans";
      case "student":
        return "Student Loans";
      case "business":
        return "Business Loans";
      case "debt":
        return "Debt Consolidation Loans";
      default:
        return "Loans";
    }
  };

  return (
    <div className={cn("min-h-screen bg-background flex", darkMode && "dark")}>
      {/* Sidebar */}
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onCollapsedChange={setSidebarCollapsed}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="border-b border-border bg-card">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-4">
                {/* Mobile Menu Button */}
                <div className="lg:hidden">
                  <MobileMenuButton />
                </div>
                <h1 className="text-2xl font-semibold">{getTabTitle()}</h1>
              </div>

              <div className="flex items-center gap-4">
                {/* Help Tooltip */}
                <div className="hidden lg:flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-md text-sm shadow-lg hover:shadow-xl transition-all duration-300">
                  <HelpCircle className="w-4 h-4" />
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  <span>Don't know which loan to choose?</span>
                  <Button variant="secondary" size="sm" className="text-xs ml-2 bg-white text-blue-600 hover:bg-gray-100">
                    Get help now
                  </Button>
                </div>

                {/* Dark Mode Toggle */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleDarkMode}
                  className="w-9 h-9 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 dark:border-blue-600 dark:text-blue-400 dark:hover:bg-blue-900/20"
                >
                  {darkMode ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            {/* Hero Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-semibold mb-4">{getTabTitle()}</h1>
              <p className="text-muted-foreground max-w-2xl">
                {getTabDescription()}
              </p>
              <div className="mt-4 flex items-center gap-4">
                <div className="text-sm text-muted-foreground">
                  Showing <span className="font-medium text-blue-600">{filteredLoans.length}</span> loan{filteredLoans.length !== 1 ? "s" : ""}
                  {activeTab !== "all" && (
                    <span> for <span className="font-medium capitalize">{activeTab === "debt" ? "debt consolidation" : activeTab}</span></span>
                  )}
                </div>
              </div>
            </div>

            {/* Loan Categories Tabs */}
            <LoanTabs activeTab={activeTab} onTabChange={handleTabChange} />

            {/* Loans Comparison Table */}
            <div className="bg-card border border-border rounded-lg shadow-sm mb-8 overflow-hidden">
              <LoansTable loans={filteredLoans} onDetailsClick={handleDetailsClick} />
            </div>

            {/* Loan Calculator */}
            <LoanCalculator />

            {/* Mobile Help Section */}
            <div className="lg:hidden mt-8 p-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  <span className="text-sm">Need help choosing?</span>
                </div>
                <Button variant="secondary" size="sm" className="bg-white text-blue-600 hover:bg-gray-100">
                  Get Help
                </Button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="border-t border-border mt-16">
            <div className="px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center text-sm text-muted-foreground">
                <p>© 2025 Loans Comparison Platform. All rights reserved.</p>
                <p className="mt-2">
                  Rates and terms are subject to change. Contact lenders directly for final approval.
                </p>
              </div>
            </div>
          </footer>
        </main>
      </div>

      {/* Loan Details Modal */}
      <LoanDetailsModal
        loan={selectedLoan}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
}