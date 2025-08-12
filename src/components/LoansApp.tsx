"use client";

import { useState } from "react";
import { Sidebar, MobileMenuButton } from "./Sidebar";
import { LoansTable } from "./LoansTable";
import { LoanCalculator } from "./LoanCalculator";
import { LoanTabs } from "./LoanTabs";
import { Button } from "@/components/ui/button";
import { Moon, Sun, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
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
                <h1 className="text-2xl font-semibold">Loans</h1>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Help Tooltip */}
                <div className="hidden lg:flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-md text-sm">
                  <HelpCircle className="w-4 h-4" />
                  <span>Don't know which loan to choose?</span>
                  <Button variant="secondary" size="sm" className="text-xs ml-2">
                    Get help now
                  </Button>
                </div>
                
                {/* Dark Mode Toggle */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleDarkMode}
                  className="w-9 h-9"
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
              <h1 className="text-3xl font-semibold mb-4">Loans</h1>
              <p className="text-muted-foreground max-w-2xl">
                Compare top loan options across US banks, from personal to auto loans, 
                find the best fit for your needs.
              </p>
            </div>

            {/* Loan Categories Tabs */}
            <LoanTabs />

            {/* Loans Comparison Table */}
            <div className="bg-card border border-border rounded-lg shadow-sm mb-8">
              <LoansTable />
            </div>

            {/* Loan Calculator */}
            <LoanCalculator />

            {/* Mobile Help Section */}
            <div className="lg:hidden mt-8 p-4 bg-primary text-primary-foreground rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  <span className="text-sm">Need help choosing?</span>
                </div>
                <Button variant="secondary" size="sm">
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
    </div>
  );
}