"use client";
import { useState, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Sidebar, MobileMenuButton } from "@/components/Sidebar";
import { AplykaLogo } from "@/components/AplykaLogo";
import { LoansTable, allLoanData, LoanData } from "@/components/LoansTable";
import { LoanCalculator } from "@/components/LoanCalculator";
import { LoanTabs } from "@/components/LoanTabs";
import { LoanDetailsModal } from "@/components/LoanDetailsModal";
import { SignUpPage } from "@/components/SignUpPage";
import { LoginPage } from "@/components/LoginPage";
import { UserDashboard } from "@/components/UserDashboard";
import { HelpModal } from "@/components/HelpModal";
import { TwoFactorAuth } from "@/components/TwoFactorAuth";
import { TwoFactorSetup } from "@/components/TwoFactorSetup";
import { Button } from "@/components/ui/button";
import { Moon, Sun, HelpCircle, UserPlus, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";

type PageType = "loans" | "signup" | "login" | "2fa-verify" | "2fa-setup" | "dashboard" | "credit-cards" | "mortgage" | "insurance" | "personal-finance" | "investment" | "sme" | "taxes" | "profile";

export default function LoansApp() {
  const { isAuthenticated, isLoading, user, requires2FA, pendingUser, verify2FA, clearPendingAuth, toggle2FA } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedLoan, setSelectedLoan] = useState<LoanData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>(isAuthenticated ? "dashboard" : "loans");

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

  const navigateToSignUp = () => {
    setCurrentPage("signup");
    if (isModalOpen) {
      setIsModalOpen(false);
      setSelectedLoan(null);
    }
  };

  const navigateToLogin = () => {
    setCurrentPage("login");
  };

  const navigateToLoans = () => {
    setCurrentPage("loans");
  };

  const navigateToDashboard = () => {
    setCurrentPage("dashboard");
  };

  const navigateToCreditCards = () => {
    setCurrentPage("credit-cards");
  };

  const navigateTo2FA = () => {
    setCurrentPage("2fa-verify");
  };

  const navigateTo2FASetup = () => {
    setCurrentPage("2fa-setup");
  };

  const handleSectionChange = (section: string) => {
    setCurrentPage(section as PageType);
  };

  const openHelpModal = () => {
    setIsHelpModalOpen(true);
  };

  const handle2FAVerificationSuccess = async () => {
    // The verify2FA is handled by the auth context
    // User will be automatically logged in, so redirect to dashboard
    setCurrentPage("dashboard");
  };

  const handle2FABack = () => {
    clearPendingAuth();
    setCurrentPage("login");
  };

  const handle2FASetupBack = () => {
    setCurrentPage("dashboard");
  };

  const handle2FAStatusChange = (enabled: boolean) => {
    toggle2FA(enabled);
  };

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className={cn("min-h-screen bg-background flex items-center justify-center", darkMode && "dark")}>
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-aplyka-azure border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Handle 2FA verification requirement
  if (requires2FA && pendingUser && currentPage !== "2fa-verify") {
    setCurrentPage("2fa-verify");
  }

  // Redirect authenticated users to dashboard if they're on auth pages
  if (isAuthenticated && (currentPage === "login" || currentPage === "signup" || currentPage === "2fa-verify")) {
    setCurrentPage("dashboard");
  }

  // Handle different page types
  if (currentPage === "signup") {
    return (
      <div className={cn("min-h-screen bg-background", darkMode && "dark")}>
        <SignUpPage onBackToLoans={navigateToLoans} />
      </div>
    );
  }

  if (currentPage === "login") {
    return (
      <div className={cn("min-h-screen bg-background", darkMode && "dark")}>
        <LoginPage 
          onNavigateToSignUp={navigateToSignUp} 
          onNavigateToLoans={navigateToLoans}
          onNavigateTo2FA={navigateTo2FA}
        />
      </div>
    );
  }

  if (currentPage === "2fa-verify" && pendingUser) {
    return (
      <div className={cn("min-h-screen bg-background", darkMode && "dark")}>
        <TwoFactorAuth
          email={pendingUser.email}
          onVerificationSuccess={handle2FAVerificationSuccess}
          onBack={handle2FABack}
        />
      </div>
    );
  }

  if (currentPage === "2fa-setup" && isAuthenticated) {
    return (
      <div className={cn("min-h-screen bg-background flex", darkMode && "dark")}>
        {/* Sidebar */}
        <Sidebar 
          isCollapsed={sidebarCollapsed} 
          onCollapsedChange={setSidebarCollapsed}
          activeSection="profile"
          onSectionChange={handleSectionChange}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="border-b border-border bg-card">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center gap-4">
                  <div className="lg:hidden">
                    <MobileMenuButton activeSection="profile" onSectionChange={handleSectionChange} />
                  </div>
                  <h1 className="text-2xl font-semibold">Two-Factor Authentication</h1>
                </div>
                
                <div className="flex items-center gap-4">
                  <Button
                    onClick={navigateToDashboard}
                    className="bg-aplyka-azure hover:bg-aplyka-azure/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Dashboard
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleDarkMode}
                    className="w-9 h-9 border-aplyka-azure/20 text-aplyka-azure hover:bg-aplyka-azure/10"
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
              <TwoFactorSetup
                onBack={handle2FASetupBack}
                currentStatus={user?.twoFactorEnabled || false}
                onStatusChange={handle2FAStatusChange}
              />
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Get page title and content
  const getPageTitle = () => {
    switch (currentPage) {
      case "dashboard":
        return "Dashboard";
      case "credit-cards":
        return "Credit Cards";
      case "mortgage":
        return "Mortgage";
      case "insurance":
        return "Insurance";
      case "personal-finance":
        return "Personal Finance";
      case "investment":
        return "Investment";
      case "sme":
        return "SMEs";
      case "taxes":
        return "Taxes";
      case "profile":
        return "Profile";
      case "loans":
        return getTabTitle();
      default:
        return "Dashboard";
    }
  };

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

  const renderPageContent = () => {
    switch (currentPage) {
      case "dashboard":
        return (
          <UserDashboard 
            onNavigateToLoans={navigateToLoans}
            onNavigateToCreditCards={navigateToCreditCards}
            onNavigateTo2FASetup={navigateTo2FASetup}
          />
        );
      case "loans":
        return (
          <>
            {/* Authentication Notice for public users */}
            {!isAuthenticated && (
              <div className="mb-8 p-4 bg-gradient-to-r from-aplyka-azure/10 to-aplyka-lime/10 border border-aplyka-azure/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-aplyka-dark-gray mb-1">Ready to apply for a loan?</h3>
                    <p className="text-sm text-aplyka-dark-gray/70">
                      Sign up for a free account to access personalized rates, track applications, and manage your financial profile.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={navigateToLogin}
                      className="border-aplyka-azure text-aplyka-azure hover:bg-aplyka-azure/10"
                    >
                      Sign In
                    </Button>
                    <Button 
                      size="sm"
                      onClick={navigateToSignUp}
                      className="bg-aplyka-lime hover:bg-aplyka-lime/90 text-aplyka-dark-gray font-medium"
                    >
                      Sign Up Free
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Hero Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-4">{getTabTitle()}</h1>
              <p className="text-muted-foreground max-w-2xl">
                {getTabDescription()}
              </p>
              <div className="mt-4 flex items-center gap-4">
                <div className="text-sm text-muted-foreground">
                  Showing <span className="font-medium text-aplyka-azure">{filteredLoans.length}</span> loan{filteredLoans.length !== 1 ? 's' : ''} 
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
            <div className="lg:hidden mt-8 p-4 bg-gradient-aplyka-primary text-white rounded-lg shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  <span className="text-sm">Need help choosing?</span>
                </div>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="bg-white text-aplyka-azure hover:bg-white/90" 
                  onClick={openHelpModal}
                >
                  Get Help
                </Button>
              </div>
            </div>
          </>
        );
      default:
        // For other sections, show a placeholder
        return (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-4">{getPageTitle()} Coming Soon!</h2>
            <p className="text-muted-foreground mb-8">
              We're working hard to bring you this feature. Stay tuned for updates!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="p-6 bg-gradient-to-r from-aplyka-azure/10 to-aplyka-azure/20 rounded-lg border border-aplyka-azure/20">
                <h3 className="font-semibold text-aplyka-azure mb-2">Feature Preview</h3>
                <p className="text-sm text-aplyka-dark-gray/70">
                  Advanced tools and personalized recommendations
                </p>
              </div>
              <div className="p-6 bg-gradient-to-r from-aplyka-lime/10 to-aplyka-lime/20 rounded-lg border border-aplyka-lime/20">
                <h3 className="font-semibold text-aplyka-dark-gray mb-2">Expert Guidance</h3>
                <p className="text-sm text-aplyka-dark-gray/70">
                  Professional advice from financial specialists
                </p>
              </div>
              <div className="p-6 bg-gradient-to-r from-aplyka-light-gray/50 to-aplyka-light-gray/70 rounded-lg border border-aplyka-light-gray/40">
                <h3 className="font-semibold text-aplyka-dark-gray mb-2">Smart Analytics</h3>
                <p className="text-sm text-aplyka-dark-gray/70">
                  Data-driven insights for better decisions
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  // Main layout for authenticated and public users
  return (
    <div className={cn("min-h-screen bg-background flex", darkMode && "dark")}>
      {/* Sidebar - only show for authenticated users */}
      {isAuthenticated && (
        <Sidebar 
          isCollapsed={sidebarCollapsed} 
          onCollapsedChange={setSidebarCollapsed}
          activeSection={currentPage}
          onSectionChange={handleSectionChange}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="border-b border-border bg-card">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-4">
                {/* Mobile Menu Button - only for authenticated users */}
                {isAuthenticated && (
                  <div className="lg:hidden">
                    <MobileMenuButton activeSection={currentPage} onSectionChange={handleSectionChange} />
                  </div>
                )}
                
                {/* Logo for non-authenticated users */}
                {!isAuthenticated && (
                  <AplykaLogo size="md" />
                )}
                
                {/* Page title for authenticated users */}
                {isAuthenticated && (
                  <h1 className="text-2xl font-semibold">{getPageTitle()}</h1>
                )}
              </div>
              
              <div className="flex items-center gap-4">
                {/* Authentication Buttons */}
                {!isAuthenticated ? (
                  <>
                    <Button
                      variant="outline"
                      onClick={navigateToLogin}
                      className="flex items-center gap-2 border-aplyka-azure text-aplyka-azure hover:bg-aplyka-azure/10"
                    >
                      <LogIn className="w-4 h-4" />
                      <span className="hidden sm:inline">Sign In</span>
                    </Button>
                    <Button
                      onClick={navigateToSignUp}
                      className="bg-aplyka-lime hover:bg-aplyka-lime/90 text-aplyka-dark-gray font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span className="hidden sm:inline">Sign Up</span>
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={navigateToDashboard}
                    className="bg-aplyka-azure hover:bg-aplyka-azure/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Dashboard
                  </Button>
                )}

                {/* Help Tooltip */}
                <div className="hidden border border-aplyka-azure lg:flex items-center gap-2 px-3 py-2 bg-gradient-aplyka-primary dark:text-white text-black rounded-md text-sm shadow-lg hover:shadow-xl transition-all duration-300 dark:bg-gradient-aplyka-primary dark:text-white">
                  <HelpCircle className="w-4 h-4" />
                  <span>Don't know which loan to choose?</span>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="text-xs ml-2 bg-white text-aplyka-azure hover:bg-aplyka-azure/10 hover:text-aplyka-azure dark:bg-white dark:text-aplyka-azure dark:hover:bg-white/90" 
                    onClick={openHelpModal}
                  >
                    Get help now
                  </Button>
                </div>
                
                {/* Dark Mode Toggle */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleDarkMode}
                  className="w-9 h-9 border-aplyka-azure/20 text-aplyka-azure hover:bg-aplyka-azure/10"
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
            {renderPageContent()}
          </div>

          {/* Footer - only show for loans page */}
          {currentPage === "loans" && (
            <footer className="border-t border-border mt-16">
              <div className="px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center text-sm text-muted-foreground">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <AplykaLogo size="sm" />
                  </div>
                  <p>© 2025 aplyka.com. All rights reserved.</p>
                  <p className="mt-2">
                    Rates and terms are subject to change. Contact lenders directly for final approval.
                  </p>
                </div>
              </div>
            </footer>
          )}
        </main>
      </div>

      {/* Modals */}
      <LoanDetailsModal 
        loan={selectedLoan}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSignUpClick={navigateToSignUp}
      />

      <HelpModal 
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />
    </div>
  );
}

