import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useAuth } from "../contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  CreditCard, 
  FileText, 
  TrendingUp, 
  Bell,
  Settings,
  Shield,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Building2,
  Phone,
  Mail,
  MapPin,
  Edit,
  Plus,
  Download,
  Eye,
  Key,
  Smartphone,
  Newspaper,
  BookOpen,
  Target,
  PiggyBank,
  Zap,
  TrendingDown,
  Activity,
  BarChart3,
  Lightbulb,
  ArrowRight,
  ExternalLink,
  Award,
  Calculator,
  Wallet,
  Globe,
  Crown,
  LineChart
} from "lucide-react";

const loanApplications = [
  {
    id: "1",
    type: "Personal Loan",
    amount: "$25,000",
    bank: "JP Bank",
    status: "approved",
    appliedDate: "2025-01-10",
    rate: "8.99%",
    term: "5 years"
  },
  {
    id: "2", 
    type: "Auto Loan",
    amount: "$35,000",
    bank: "Global Bank",
    status: "pending",
    appliedDate: "2025-01-12",
    rate: "6.49%",
    term: "6 years"
  },
  {
    id: "3",
    type: "Business Loan", 
    amount: "$100,000",
    bank: "Smart Finance",
    status: "under_review",
    appliedDate: "2025-01-08",
    rate: "9.99%",
    term: "7 years"
  }
];

const creditCards = [
  {
    id: "1",
    name: "Platinum Rewards Card",
    bank: "Premium Bank",
    limit: "$15,000",
    status: "active",
    balance: "$2,450",
    availableCredit: "$12,550",
    rewards: "1.5% cashback"
  },
  {
    id: "2",
    name: "Travel Elite Card",
    bank: "Global Bank", 
    limit: "$25,000",
    status: "pending",
    balance: "$0",
    availableCredit: "$25,000",
    rewards: "2x travel points"
  }
];

const notifications = [
  {
    id: "1",
    title: "Loan Application Update",
    message: "Your personal loan application has been approved!",
    time: "2 hours ago",
    type: "success",
    unread: true
  },
  {
    id: "2",
    title: "Payment Reminder",
    message: "Your Platinum Rewards Card payment is due in 3 days",
    time: "1 day ago",
    type: "warning",
    unread: true
  },
  {
    id: "3",
    title: "Credit Score Update",
    message: "Your credit score has improved by 15 points this month",
    time: "3 days ago",
    type: "info",
    unread: false
  }
];

// Banking News Data
const bankingNews = [
  {
    id: "1",
    title: "Federal Reserve Signals Rate Cuts May Continue Through 2025",
    excerpt: "Analysts predict continued monetary easing could benefit loan seekers and refinancing opportunities.",
    time: "2 hours ago",
    category: "Interest Rates",
    source: "Financial Times",
    impact: "positive"
  },
  {
    id: "2", 
    title: "New Banking Regulations Enhance Consumer Protection",
    excerpt: "CFPB introduces stronger safeguards for personal loan borrowers and credit card users.",
    time: "6 hours ago",
    category: "Regulation",
    source: "Wall Street Journal",
    impact: "neutral"
  },
  {
    id: "3",
    title: "Digital Banking Adoption Reaches All-Time High",
    excerpt: "Mobile banking usage surges as consumers embrace fintech solutions for loan applications.",
    time: "1 day ago", 
    category: "Technology",
    source: "Banking Today",
    impact: "positive"
  }
];

// Aplyka Products Data
const aplykaProducts = [
  {
    id: "1",
    name: "aplyka Smart Loans",
    description: "AI-powered loan matching with personalized rates",
    features: ["Instant pre-approval", "No hidden fees", "Rate matching guarantee"],
    status: "available",
    tag: "Most Popular",
    color: "from-aplyka-azure to-blue-600"
  },
  {
    id: "2",
    name: "aplyka Credit Optimizer",
    description: "Automated credit score improvement and monitoring",
    features: ["24/7 monitoring", "Personalized tips", "Score improvement tracking"],
    status: "available", 
    tag: "New",
    color: "from-green-500 to-aplyka-azure"
  },
  {
    id: "3",
    name: "aplyka Wealth Manager",
    description: "Comprehensive financial planning and investment guidance",
    features: ["Portfolio analysis", "Goal-based planning", "Tax optimization"],
    status: "coming_soon",
    tag: "Coming Soon",
    color: "from-aplyka-dark-gray to-aplyka-azure"
  }
];

// Personalized Recommendations Data
const recommendations = [
  {
    id: "1",
    type: "loan",
    title: "Refinance Your Auto Loan",
    description: "Save up to $2,400 with current rates",
    potential_savings: "$2,400",
    confidence: 94,
    action: "View Offers",
    urgency: "high",
    icon: "car"
  },
  {
    id: "2", 
    type: "credit_card",
    title: "Upgrade to Premium Card",
    description: "Earn 3x more rewards on your spending",
    potential_savings: "+$540/year",
    confidence: 87,
    action: "Compare Cards", 
    urgency: "medium",
    icon: "credit-card"
  },
  {
    id: "3",
    type: "investment",
    title: "Emergency Fund Optimization",
    description: "Maximize returns on your savings",
    potential_savings: "+$180/year",
    confidence: 82,
    action: "Learn More",
    urgency: "low", 
    icon: "piggy-bank"
  }
];

// Financial Education Content
const educationContent = [
  {
    id: "1",
    title: "Complete Guide to Credit Score Improvement",
    category: "Credit Education",
    duration: "8 min read",
    level: "Beginner",
    points: [
      "Understanding credit score factors",
      "Strategies to increase your score",
      "Common myths debunked"
    ],
    progress: 0
  },
  {
    id: "2",
    title: "Smart Debt Consolidation Strategies",
    category: "Debt Management", 
    duration: "12 min read",
    level: "Intermediate",
    points: [
      "When consolidation makes sense",
      "Choosing the right loan type",
      "Avoiding common pitfalls"
    ],
    progress: 65
  },
  {
    id: "3",
    title: "Investment Basics for Loan Borrowers",
    category: "Investment Planning",
    duration: "15 min read", 
    level: "Advanced",
    points: [
      "Balancing debt and investments",
      "Risk assessment strategies",
      "Building long-term wealth"
    ],
    progress: 100
  }
];

interface UserDashboardProps {
  onNavigateToLoans: () => void;
  onNavigateToCreditCards: () => void;
  onNavigateTo2FASetup: () => void;
}

type ModalType = "notifications" | "security" | "payment-schedule" | "profile-edit" | null;

export function UserDashboard({ onNavigateToLoans, onNavigateToCreditCards, onNavigateTo2FASetup }: UserDashboardProps) {
  const { user, logout, updateProfile, toggle2FA } = useAuth();
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [profileForm, setProfileForm] = useState({
    phone: user?.phone || "",
    employer: user?.employer || "",
    jobTitle: user?.jobTitle || ""
  });

  if (!user) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Approved</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">Pending</Badge>;
      case "under_review":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">Under Review</Badge>;
      case "active":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Active</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleViewLoanDetails = (loanId: string) => {
    const loan = loanApplications.find(l => l.id === loanId);
    alert(`Viewing details for ${loan?.type} - ${loan?.amount}`);
  };

  const handleDownloadDocument = (loanId: string, docType: string) => {
    alert(`Downloading ${docType} for loan ${loanId}`);
  };

  const handleSaveProfile = () => {
    updateProfile(profileForm);
    setActiveModal(null);
    alert("Profile updated successfully!");
  };

  const creditUtilization = Math.round((2450 / 40000) * 100);

  return (
    <div className="space-y-8">
      {/* Animated Welcome Hero */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden"
      >
        <div className="bg-gradient-aplyka-primary text-white rounded-2xl p-8 relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full transform translate-x-32 -translate-y-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full transform -translate-x-24 translate-y-24"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <h1 className="mb-2">
                    Welcome back, {user.firstName}! 
                    <motion.span 
                      className="inline-block ml-2"
                      animate={{ rotate: [0, 15, 0] }}
                      transition={{ delay: 1, duration: 0.6 }}
                    >
                      👋
                    </motion.span>
                  </h1>
                  <p className="text-white/80 mb-6">
                    Your financial command center is ready. Discover personalized insights, manage your portfolio, and explore new opportunities.
                  </p>
                </motion.div>
                
                <motion.div 
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <Button 
                    className="bg-white/20 backdrop-blur border-white/30 text-white hover:bg-white/30 transition-all duration-300"
                    onClick={onNavigateToLoans}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Apply for Loan
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                    onClick={onNavigateToCreditCards}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Get Credit Card
                  </Button>
                </motion.div>
              </div>
              
              {/* Financial Stats */}
              <motion.div 
                className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <div className="text-center">
                  <div className="text-3xl mb-1">A+</div>
                  <div className="text-white/70">Credit Grade</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-1">3</div>
                  <div className="text-white/70">Active Loans</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-1">$40k</div>
                  <div className="text-white/70">Credit Limit</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-1">{creditUtilization}%</div>
                  <div className="text-white/70">Utilization</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Dashboard Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-aplyka-light-gray/20">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="news" className="flex items-center gap-2">
            <Newspaper className="w-4 h-4" />
            <span className="hidden sm:inline">News</span>
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            <span className="hidden sm:inline">Products</span>
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            <span className="hidden sm:inline">AI Tips</span>
          </TabsTrigger>
          <TabsTrigger value="education" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Learn</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Quick Stats Cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {[
              { title: "Total Credit Limit", value: "$40,000", icon: CreditCard, color: "text-aplyka-azure", action: onNavigateToCreditCards },
              { title: "Active Loans", value: "3", icon: FileText, color: "text-aplyka-lime", action: onNavigateToLoans },
              { title: "Credit Utilization", value: `${creditUtilization}%`, icon: TrendingUp, color: "text-orange-500", action: () => alert("Tips: Keep utilization below 30%") },
              { title: "Credit Score", value: user.creditScore === "excellent" ? "800+" : 
               user.creditScore === "very-good" ? "740+" :
               user.creditScore === "good" ? "670+" : "620+", icon: Star, color: "text-purple-500", action: () => alert("Credit monitoring available") }
            ].map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group" onClick={stat.action}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-muted-foreground mb-2">{stat.title}</p>
                        <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                      </div>
                      <stat.icon className={`w-8 h-8 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                    </div>
                    <div className="mt-4 flex items-center text-sm text-muted-foreground group-hover:text-aplyka-azure transition-colors">
                      View Details <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Loan Applications */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <Card className="h-full">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-aplyka-azure" />
                      Recent Loan Activity
                    </CardTitle>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={onNavigateToLoans}
                      className="border-aplyka-azure/20 text-aplyka-azure hover:bg-aplyka-azure/10"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      New Application
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {loanApplications.map((loan, index) => (
                        <motion.div
                          key={loan.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index, duration: 0.5 }}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-aplyka-primary rounded-xl flex items-center justify-center text-white font-semibold shadow-lg">
                              {loan.bank.charAt(0)}
                            </div>
                            <div>
                              <h4 className="font-medium group-hover:text-aplyka-azure transition-colors">{loan.type}</h4>
                              <p className="text-sm text-muted-foreground">
                                {loan.bank} • {new Date(loan.appliedDate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-lg">{loan.amount}</div>
                            <div className="flex items-center gap-2 mt-1">
                              {getStatusBadge(loan.status)}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Quick Actions Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="space-y-6"
            >
              {/* Profile Card */}
              <Card className="overflow-hidden">
                <CardHeader className="bg-gradient-aplyka-secondary text-white">
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 bg-gradient-aplyka-primary rounded-full flex items-center justify-center text-white shadow-lg">
                      {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold">{user.firstName} {user.lastName}</h3>
                      <p className="text-sm text-muted-foreground">Member since {new Date(user.createdAt).getFullYear()}</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setActiveModal("profile-edit")}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-aplyka-lime" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setActiveModal("notifications")}
                  >
                    <Bell className="w-4 h-4 mr-2" />
                    Notifications
                    {notifications.filter(n => n.unread).length > 0 && (
                      <Badge variant="destructive" className="ml-auto">
                        {notifications.filter(n => n.unread).length}
                      </Badge>
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setActiveModal("security")}
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Security
                    {user.twoFactorEnabled && (
                      <Badge variant="secondary" className="ml-auto">
                        2FA
                      </Badge>
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setActiveModal("payment-schedule")}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Payments
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        {/* Banking News Tab */}
        <TabsContent value="news" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Newspaper className="w-5 h-5 text-aplyka-azure" />
                  Banking & Finance News
                  <Badge variant="secondary" className="ml-auto">Live Updates</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {bankingNews.map((article, index) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="group border-l-4 border-l-aplyka-azure/30 pl-6 py-4 hover:border-l-aplyka-azure transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Badge 
                            variant="outline" 
                            className={`
                              ${article.impact === 'positive' ? 'border-green-200 text-green-700 bg-green-50' : 
                                article.impact === 'negative' ? 'border-red-200 text-red-700 bg-red-50' : 
                                'border-blue-200 text-blue-700 bg-blue-50'}
                            `}
                          >
                            {article.category}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{article.source}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{article.time}</span>
                      </div>
                      <h3 className="font-semibold mb-2 group-hover:text-aplyka-azure transition-colors cursor-pointer">
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">{article.excerpt}</p>
                      <Button variant="ghost" size="sm" className="p-0 h-auto text-aplyka-azure hover:underline">
                        Read More <ExternalLink className="w-3 h-3 ml-1" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Aplyka Products Tab */}
        <TabsContent value="products" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">aplyka Financial Products</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover our suite of AI-powered financial tools designed to optimize your financial journey and maximize your potential.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aplykaProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className={`h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden ${product.status === 'coming_soon' ? 'opacity-75' : ''}`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-5`}></div>
                    <CardHeader className="relative">
                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-12 h-12 bg-gradient-to-br ${product.color} rounded-xl flex items-center justify-center shadow-lg`}>
                          {product.id === "1" && <Zap className="w-6 h-6 text-white" />}
                          {product.id === "2" && <LineChart className="w-6 h-6 text-white" />}
                          {product.id === "3" && <Crown className="w-6 h-6 text-white" />}
                        </div>
                        <Badge variant={product.status === 'available' ? 'default' : 'secondary'}>
                          {product.tag}
                        </Badge>
                      </div>
                      <CardTitle className="mb-2">{product.name}</CardTitle>
                      <p className="text-muted-foreground text-sm">{product.description}</p>
                    </CardHeader>
                    <CardContent className="relative">
                      <ul className="space-y-2 mb-6">
                        {product.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-aplyka-lime mt-0.5 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      <Button 
                        className={`w-full ${product.status === 'available' ? 'bg-gradient-aplyka-primary hover:shadow-lg' : ''}`}
                        disabled={product.status === 'coming_soon'}
                      >
                        {product.status === 'available' ? 'Get Started' : 'Coming Soon'}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </TabsContent>

        {/* AI Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">
                AI-Powered Recommendations
                <motion.span
                  className="inline-block ml-2"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  🤖
                </motion.span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our AI analyzes your financial profile to provide personalized recommendations that could save you money and improve your financial health.
              </p>
            </div>

            <div className="space-y-6">
              {recommendations.map((rec, index) => (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className={`hover:shadow-lg transition-all duration-300 border-l-4 ${
                    rec.urgency === 'high' ? 'border-l-red-400' :
                    rec.urgency === 'medium' ? 'border-l-yellow-400' :
                    'border-l-green-400'
                  }`}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className={`w-12 h-12 bg-gradient-aplyka-primary rounded-xl flex items-center justify-center shadow-lg`}>
                            {rec.icon === 'car' && <Activity className="w-6 h-6 text-white" />}
                            {rec.icon === 'credit-card' && <CreditCard className="w-6 h-6 text-white" />}
                            {rec.icon === 'piggy-bank' && <PiggyBank className="w-6 h-6 text-white" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{rec.title}</h3>
                              <Badge variant={
                                rec.urgency === 'high' ? 'destructive' :
                                rec.urgency === 'medium' ? 'default' :
                                'secondary'
                              }>
                                {rec.urgency} priority
                              </Badge>
                            </div>
                            <p className="text-muted-foreground mb-3">{rec.description}</p>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-green-600" />
                                <span className="font-semibold text-green-600">{rec.potential_savings}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Target className="w-4 h-4 text-aplyka-azure" />
                                <span className="text-sm text-muted-foreground">{rec.confidence}% match</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="mb-3">
                            <div className="w-16 h-16 mx-auto">
                              <Progress value={rec.confidence} className="rotate-90 w-16 h-2" />
                            </div>
                            <span className="text-xs text-muted-foreground">Confidence</span>
                          </div>
                          <Button 
                            className="bg-aplyka-azure hover:bg-aplyka-azure/90"
                            onClick={() => alert(`Exploring ${rec.title}`)}
                          >
                            {rec.action}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </TabsContent>

        {/* Financial Education Tab */}
        <TabsContent value="education" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Financial Education Center</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Expand your financial knowledge with our curated learning materials, from basic concepts to advanced strategies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {educationContent.map((content, index) => (
                <motion.div
                  key={content.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-12 h-12 bg-gradient-aplyka-secondary rounded-xl flex items-center justify-center shadow-lg">
                          <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <Badge variant={
                          content.level === 'Beginner' ? 'secondary' :
                          content.level === 'Intermediate' ? 'default' :
                          'destructive'
                        }>
                          {content.level}
                        </Badge>
                      </div>
                      <CardTitle className="group-hover:text-aplyka-azure transition-colors">
                        {content.title}
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {content.duration}
                        </span>
                        <Badge variant="outline">{content.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-6">
                        {content.points.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <Lightbulb className="w-4 h-4 text-aplyka-lime mt-0.5 flex-shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>
                      
                      {content.progress > 0 && (
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{content.progress}%</span>
                          </div>
                          <Progress value={content.progress} className="h-2" />
                        </div>
                      )}
                      
                      <Button 
                        variant={content.progress === 100 ? "outline" : "default"}
                        className={`w-full ${content.progress === 0 ? 'bg-aplyka-azure hover:bg-aplyka-azure/90' : ''}`}
                        onClick={() => alert(`${content.progress === 100 ? 'Reviewing' : content.progress > 0 ? 'Continuing' : 'Starting'} ${content.title}`)}
                      >
                        {content.progress === 100 ? (
                          <>
                            <Award className="w-4 h-4 mr-2" />
                            Review Completed
                          </>
                        ) : content.progress > 0 ? (
                          <>
                            <BookOpen className="w-4 h-4 mr-2" />
                            Continue Reading
                          </>
                        ) : (
                          <>
                            <Lightbulb className="w-4 h-4 mr-2" />
                            Start Learning
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      
      {/* Notifications Modal */}
      <Dialog open={activeModal === "notifications"} onOpenChange={() => setActiveModal(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-600" />
              Notifications
            </DialogTitle>
            <DialogDescription>
              View and manage your notifications here.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <div key={notification.id} className={`p-4 rounded-lg border ${notification.unread ? "bg-blue-50 border-blue-200 dark:bg-blue-900/20" : "bg-muted"}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium">{notification.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                  </div>
                  {notification.unread && <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>}
                </div>
              </div>
            ))}
          </div>
          <Button onClick={() => alert("All notifications marked as read")}>
            Mark All as Read
          </Button>
        </DialogContent>
      </Dialog>

      {/* Security Settings Modal */}
      <Dialog open={activeModal === "security"} onOpenChange={() => setActiveModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              Security Settings
            </DialogTitle>
            <DialogDescription>
              Manage your account security settings.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {/* 2FA Status */}
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    user.twoFactorEnabled ? 'bg-green-100 dark:bg-green-900/20' : 'bg-gray-100 dark:bg-gray-900/20'
                  }`}>
                    <Smartphone className={`w-4 h-4 ${
                      user.twoFactorEnabled ? 'text-green-600' : 'text-gray-400'
                    }`} />
                  </div>
                  <div>
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">
                      {user.twoFactorEnabled ? "Enabled" : "Disabled"}
                    </p>
                  </div>
                </div>
                <Badge variant={user.twoFactorEnabled ? "default" : "secondary"}>
                  {user.twoFactorEnabled ? "Active" : "Inactive"}
                </Badge>
              </div>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setActiveModal(null);
                  onNavigateTo2FASetup();
                }}
              >
                <Key className="w-4 h-4 mr-2" />
                {user.twoFactorEnabled ? "Manage 2FA" : "Setup 2FA"}
              </Button>
            </div>

            {/* Other Security Options */}
            <div className="grid grid-cols-1 gap-3">
              <Button variant="outline" onClick={() => alert("Change password form would open")}>
                Change Password
              </Button>
              <Button variant="outline" onClick={() => alert("Login history would show")}>
                Login History
              </Button>
              <Button variant="outline" onClick={() => alert("Security questions would open")}>
                Security Questions
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Schedule Modal */}
      <Dialog open={activeModal === "payment-schedule"} onOpenChange={() => setActiveModal(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              Payment Schedule
            </DialogTitle>
            <DialogDescription>
              View your payment schedule and manage payments.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">Personal Loan - JP Bank</h4>
                  <p className="text-sm text-muted-foreground">Next payment: Jan 25, 2025</p>
                  <p className="text-lg font-semibold">$524.67</p>
                  <Button size="sm" className="mt-2">Make Payment</Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">Platinum Rewards Card</h4>
                  <p className="text-sm text-muted-foreground">Due: Jan 22, 2025</p>
                  <p className="text-lg font-semibold">$98.50</p>
                  <Button size="sm" className="mt-2">Make Payment</Button>
                </CardContent>
              </Card>
            </div>
            <Button variant="outline" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Download Payment Calendar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Profile Edit Modal */}
      <Dialog open={activeModal === "profile-edit"} onOpenChange={() => setActiveModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="w-5 h-5 text-blue-600" />
              Edit Profile
            </DialogTitle>
            <DialogDescription>
              Update your profile information.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={profileForm.phone}
                onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="employer">Employer</Label>
              <Input
                id="employer"
                value={profileForm.employer}
                onChange={(e) => setProfileForm({...profileForm, employer: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                value={profileForm.jobTitle}
                onChange={(e) => setProfileForm({...profileForm, jobTitle: e.target.value})}
              />
            </div>
            <div className="flex gap-2 pt-4">
              <Button onClick={handleSaveProfile} className="flex-1">
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setActiveModal(null)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}