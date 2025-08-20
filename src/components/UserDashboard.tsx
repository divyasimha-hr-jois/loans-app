import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Smartphone
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
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user.firstName}!
            </h1>
            <p className="text-blue-100">
              Manage your loans, credit cards, and financial applications from your dashboard.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">A+</div>
              <div className="text-sm text-blue-100">Credit Grade</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">3</div>
              <div className="text-sm text-blue-100">Active Loans</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Credit Limit</p>
                <p className="text-2xl font-bold text-blue-600">$40,000</p>
              </div>
              <CreditCard className="w-8 h-8 text-blue-600" />
            </div>
            <Button variant="link" className="p-0 h-auto text-xs mt-2" onClick={onNavigateToCreditCards}>
              View Details →
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Loans</p>
                <p className="text-2xl font-bold text-green-600">3</p>
              </div>
              <FileText className="w-8 h-8 text-green-600" />
            </div>
            <Button variant="link" className="p-0 h-auto text-xs mt-2" onClick={onNavigateToLoans}>
              Apply for More →
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Credit Utilization</p>
                <p className="text-2xl font-bold text-orange-600">{creditUtilization}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
            <Button variant="link" className="p-0 h-auto text-xs mt-2" onClick={() => alert("Tips: Keep utilization below 30%")}>
              View Tips →
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Credit Score</p>
                <p className="text-2xl font-bold text-purple-600">
                  {user.creditScore === "excellent" ? "800+" : 
                   user.creditScore === "very-good" ? "740+" :
                   user.creditScore === "good" ? "670+" : "620+"}
                </p>
              </div>
              <Star className="w-8 h-8 text-purple-600" />
            </div>
            <Button variant="link" className="p-0 h-auto text-xs mt-2" onClick={() => alert("Credit monitoring available")}>
              Monitor Score →
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Loan Applications */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Loan Applications
              </CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={onNavigateToLoans}
                className="border-blue-200 text-blue-600 hover:bg-blue-50 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Apply for New Loan
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loanApplications.map((loan) => (
                  <div key={loan.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center text-white font-semibold">
                        {loan.bank.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-medium">{loan.type}</h4>
                        <p className="text-sm text-muted-foreground">
                          {loan.bank} • Applied {new Date(loan.appliedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{loan.amount}</div>
                      <div className="flex items-center gap-2 mt-1">
                        {getStatusBadge(loan.status)}
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleViewLoanDetails(loan.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleDownloadDocument(loan.id, "agreement")}
                            className="h-8 w-8 p-0"
                          >
                            <Download className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Credit Cards */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-green-600" />
                Credit Cards
              </CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={onNavigateToCreditCards}
                className="border-green-200 text-green-600 hover:bg-green-50 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Apply for New Card
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {creditCards.map((card) => (
                  <div key={card.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center text-white">
                          <CreditCard className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">{card.name}</h4>
                          <p className="text-sm text-muted-foreground">{card.bank}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(card.status)}
                        {card.status === "active" && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => alert(`Managing ${card.name}`)}
                            className="h-8 px-2 text-xs"
                          >
                            Manage
                          </Button>
                        )}
                      </div>
                    </div>
                    {card.status === "active" && (
                      <>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Available Credit</span>
                          <span className="font-medium">{card.availableCredit}</span>
                        </div>
                        <Progress value={parseInt(card.balance.replace(/[$,]/g, '')) / parseInt(card.limit.replace(/[$,]/g, '')) * 100} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>Balance: {card.balance}</span>
                          <span>Limit: {card.limit}</span>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Sidebar */}
        <div className="space-y-6">
          {/* Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                  {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-medium">{user.firstName} {user.lastName}</h3>
                  <p className="text-sm text-muted-foreground">Member since {new Date(user.createdAt).getFullYear()}</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{user.city}, {user.state}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-muted-foreground" />
                  <span className="capitalize">{user.employmentStatus}</span>
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
                <Settings className="w-5 h-5 text-green-600" />
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
                Security Settings
                {user.twoFactorEnabled && (
                  <Badge variant="secondary" className="ml-auto text-xs">
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
                Payment Schedule
              </Button>
              <Separator />
              <Button 
                variant="outline" 
                className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
                onClick={() => {
                  if (confirm("Are you sure you want to sign out?")) {
                    logout();
                  }
                }}
              >
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      
      {/* Notifications Modal */}
      <Dialog open={activeModal === "notifications"} onOpenChange={() => setActiveModal(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-600" />
              Notifications
            </DialogTitle>
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