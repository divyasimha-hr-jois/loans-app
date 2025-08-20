import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AplykaLogo } from "@/components/AplykaLogo";
import { useAuth } from "../contexts/AuthContext";
import {
  Home,
  CreditCard,
  Building2,
  FileText,
  Shield,
  TrendingUp,
  DollarSign,
  Users,
  Calculator,
  User,
  Menu,
  ChevronLeft,
  ChevronRight,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: Home,
    description: "Overview of your financial profile"
  },
  {
    id: "credit-cards",
    label: "Credit Cards",
    icon: CreditCard,
    description: "Manage and apply for credit cards"
  },
  {
    id: "mortgage",
    label: "Mortgage",
    icon: Building2,
    description: "Home loans and refinancing"
  },
  {
    id: "loans",
    label: "Loans",
    icon: FileText,
    description: "Personal, auto, and business loans"
  },
  {
    id: "insurance",
    label: "Insurance",
    icon: Shield,
    description: "Protect your assets and income"
  },
  {
    id: "personal-finance",
    label: "Personal Finance",
    icon: TrendingUp,
    description: "Budgeting and financial planning"
  },
  {
    id: "investment",
    label: "Investment",
    icon: DollarSign,
    description: "Grow your wealth with investments"
  },
  {
    id: "sme",
    label: "SMEs",
    icon: Users,
    description: "Small and medium enterprise solutions"
  },
  {
    id: "taxes",
    label: "Taxes",
    icon: Calculator,
    description: "Tax planning and filing assistance"
  },
  {
    id: "profile",
    label: "Profile",
    icon: User,
    description: "Manage your account settings"
  }
];

interface SidebarProps {
  isCollapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

export function Sidebar({ isCollapsed, onCollapsedChange, activeSection = "dashboard", onSectionChange }: SidebarProps) {
  const { user, logout } = useAuth();

  const handleNavigation = (sectionId: string) => {
    if (onSectionChange) {
      onSectionChange(sectionId);
    } else {
      // Default behavior - log the navigation
      console.log(`Navigate to: ${sectionId}`);
      
      // For demo purposes, show an alert for unimplemented sections
      if (sectionId !== "loans" && sectionId !== "dashboard") {
        alert(`${navigationItems.find(item => item.id === sectionId)?.label} section coming soon!`);
      }
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <AplykaLogo 
            size={isCollapsed ? "sm" : "md"} 
            variant={isCollapsed ? "icon" : "full"}
          />
        </div>
      </div>

      {/* User Info */}
      {user && (
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-aplyka-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
              {user.firstName.charAt(0)}{user.lastName.charAt(0)}
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sidebar-foreground truncate">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-sidebar-foreground/60 truncate">
                  {user.email}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start h-auto p-3 transition-all duration-200",
                isActive && "bg-aplyka-azure/10 text-aplyka-azure border-aplyka-azure/20 shadow-sm",
                !isActive && "hover:bg-aplyka-azure/5 text-sidebar-foreground/70 hover:text-aplyka-azure",
                isCollapsed && "px-3"
              )}
              onClick={() => handleNavigation(item.id)}
            >
              <Icon className={cn("h-4 w-4", !isCollapsed && "mr-3", isActive && "text-aplyka-azure")} />
              {!isCollapsed && (
                <div className="text-left">
                  <div className="text-sm font-medium">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.description}</div>
                </div>
              )}
            </Button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border space-y-2">
        {/* Collapse Toggle */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onCollapsedChange(!isCollapsed)}
          className="w-full border-aplyka-azure/20 text-aplyka-azure hover:bg-aplyka-azure/10"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Collapse
            </>
          )}
        </Button>

        {/* Logout */}
        {user && (
          <Button
            variant="outline"
            size="sm"
            onClick={logout}
            className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 dark:border-red-800 dark:hover:bg-red-900/20"
          >
            <LogOut className={cn("h-4 w-4", !isCollapsed && "mr-2")} />
            {!isCollapsed && "Sign Out"}
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={cn(
        "hidden lg:flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
        isCollapsed ? "w-16" : "w-72"
      )}>
        <SidebarContent />
      </div>
    </>
  );
}

export function MobileMenuButton({ activeSection, onSectionChange }: { activeSection?: string; onSectionChange?: (section: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleNavigation = (sectionId: string) => {
    if (onSectionChange) {
      onSectionChange(sectionId);
    } else {
      console.log(`Navigate to: ${sectionId}`);
      if (sectionId !== "loans" && sectionId !== "dashboard") {
        alert(`${navigationItems.find(item => item.id === sectionId)?.label} section coming soon!`);
      }
    }
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="border-aplyka-azure/20 text-aplyka-azure hover:bg-aplyka-azure/10">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b">
            <AplykaLogo size="md" />
          </div>

          {/* User Info */}
          {user && (
            <div className="p-4 border-b">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-aplyka-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start h-auto p-3",
                    isActive && "bg-aplyka-azure/10 text-aplyka-azure shadow-sm"
                  )}
                  onClick={() => handleNavigation(item.id)}
                >
                  <Icon className={cn("h-4 w-4 mr-3", isActive && "text-aplyka-azure")} />
                  <div className="text-left">
                    <div className="text-sm font-medium">{item.label}</div>
                    <div className="text-xs text-muted-foreground">{item.description}</div>
                  </div>
                </Button>
              );
            })}
          </div>

          {/* Footer */}
          {user && (
            <div className="p-4 border-t">
              <Button
                variant="outline"
                className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}