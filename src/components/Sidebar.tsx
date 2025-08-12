"use client";

import { useState } from "react";
import { 
  LayoutDashboard, 
  CreditCard, 
  Home, 
  HandCoins, 
  Shield, 
  PiggyBank, 
  TrendingUp, 
  Building2, 
  Calculator, 
  User,
  ChevronLeft,
  ChevronRight,
  Menu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive?: boolean;
}

const navigationItems: NavigationItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    isActive: false
  },
  {
    id: "credit-cards",
    label: "Credit Cards",
    icon: CreditCard,
    isActive: false
  },
  {
    id: "mortgage",
    label: "Mortgage",
    icon: Home,
    isActive: false
  },
  {
    id: "loans",
    label: "Loans",
    icon: HandCoins,
    isActive: true
  },
  {
    id: "insurance",
    label: "Insurance",
    icon: Shield,
    isActive: false
  },
  {
    id: "personal-finance",
    label: "Personal finance",
    icon: PiggyBank,
    isActive: false
  },
  {
    id: "investment",
    label: "Investment",
    icon: TrendingUp,
    isActive: false
  },
  {
    id: "smes",
    label: "SMEs",
    icon: Building2,
    isActive: false
  },
  {
    id: "taxes",
    label: "Taxes",
    icon: Calculator,
    isActive: false
  },
  {
    id: "profile",
    label: "Profile",
    icon: User,
    isActive: false
  }
];

interface SidebarProps {
  isCollapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
}

function SidebarContent({ isCollapsed, onCollapsedChange }: SidebarProps) {
  const [activeItem, setActiveItem] = useState("loans");

  return (
    <div className={cn(
      "flex flex-col h-full bg-white dark:bg-gray-900 border-r border-border transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <span className="font-semibold text-gray-900 dark:text-white">
              LOGOEMPRESA
            </span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onCollapsedChange(!isCollapsed)}
          className="w-6 h-6 hidden lg:flex"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveItem(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                    "hover:bg-gray-100 dark:hover:bg-gray-800",
                    isActive 
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" 
                      : "text-gray-700 dark:text-gray-300"
                  )}
                >
                  <Icon className={cn(
                    "w-5 h-5 flex-shrink-0",
                    isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"
                  )} />
                  
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export function Sidebar({ isCollapsed, onCollapsedChange }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <SidebarContent 
          isCollapsed={isCollapsed} 
          onCollapsedChange={onCollapsedChange}
        />
      </div>

      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <SidebarContent 
              isCollapsed={false} 
              onCollapsedChange={() => {}}
            />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

export function MobileMenuButton() {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent 
            isCollapsed={false} 
            onCollapsedChange={() => {}}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}