import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { AplykaLogo } from "@/components/AplykaLogo";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  Shield,
  TrendingUp,
  Users,
  Award,
  Star,
  CheckCircle,
  AlertCircle,
  ArrowRight
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

interface LoginPageProps {
  onNavigateToSignUp: () => void;
  onNavigateToLoans: () => void;
  onNavigateTo2FA: () => void;
}

const features = [
  {
    icon: Shield,
    title: "Secure & Trusted",
    description: "Bank-level security with 256-bit encryption"
  },
  {
    icon: TrendingUp,
    title: "Best Rates",
    description: "Access to competitive rates from top lenders"
  },
  {
    icon: Users,
    title: "Expert Support",
    description: "24/7 customer support from financial experts"
  },
  {
    icon: Award,
    title: "Award Winning",
    description: "Recognized for excellence in financial services"
  }
];

const stats = [
  { label: "Active Users", value: "500K+", icon: Users },
  { label: "Loans Funded", value: "$2.5B+", icon: TrendingUp },
  { label: "Avg Rating", value: "4.9/5", icon: Star },
  { label: "Success Rate", value: "98%", icon: CheckCircle }
];

export function LoginPage({ onNavigateToSignUp, onNavigateToLoans, onNavigateTo2FA }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const result = await login(email, password);
    if (!result.success) {
      setError("Invalid email or password");
    } else if (result.requires2FA) {
      // Redirect to 2FA verification page
      onNavigateTo2FA();
    }
    // If successful and no 2FA required, the user will be logged in automatically
  };

  const handleDemoLogin = () => {
    setEmail("demo@example.com");
    setPassword("demo123");
  };

  const handleDemo2FALogin = () => {
    setEmail("user2fa@example.com");
    setPassword("password123");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-aplyka-azure/5 via-white to-aplyka-lime/5 dark:from-aplyka-dark-gray dark:via-gray-900 dark:to-aplyka-dark-gray">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-aplyka-azure/10 to-aplyka-lime/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <AplykaLogo size="xl" />
            </div>
            <Badge className="mb-4 bg-aplyka-azure text-white border-0">
              Welcome Back
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-aplyka-dark-gray">
              Access Your Account
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Sign in to manage your loans, track applications, and access personalized financial recommendations.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-aplyka-primary rounded-full text-white mb-2">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-2xl font-bold text-aplyka-azure">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </div>

            <Button 
              variant="outline" 
              onClick={onNavigateToLoans}
              className="mb-8 border-aplyka-azure text-aplyka-azure hover:bg-aplyka-azure/10"
            >
              ← Browse Loans Without Account
            </Button>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Login Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-xl max-w-md mx-auto">
                <CardHeader className="bg-gradient-to-r from-aplyka-azure/10 to-aplyka-lime/10">
                  <CardTitle className="flex items-center gap-2 text-2xl text-aplyka-dark-gray">
                    <Shield className="w-6 h-6 text-aplyka-azure" />
                    Sign In
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {error && (
                    <Alert className="mb-6 border-red-200 bg-red-50 dark:bg-red-900/20">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-700 dark:text-red-400">
                        {error}
                      </AlertDescription>
                    </Alert>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          className="pl-10"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          className="pl-10 pr-10"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <button 
                        type="button"
                        className="text-sm text-aplyka-azure hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-aplyka-azure hover:bg-aplyka-azure/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing In..." : (
                        <>
                          Sign In
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>

                  <Separator className="my-6" />

                  <div className="space-y-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-aplyka-lime text-aplyka-dark-gray hover:bg-aplyka-lime/10"
                      onClick={handleDemoLogin}
                    >
                      Try Demo Account (No 2FA)
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-aplyka-azure text-aplyka-azure hover:bg-aplyka-azure/10"
                      onClick={handleDemo2FALogin}
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Try Demo with 2FA
                    </Button>

                    <div className="text-center text-sm text-muted-foreground">
                      Don't have an account?{" "}
                      <button
                        onClick={onNavigateToSignUp}
                        className="text-aplyka-azure hover:underline font-medium"
                      >
                        Sign up here
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Content */}
            <div className="space-y-8">
              {/* Features */}
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-aplyka-lime" />
                    Why Sign In?
                  </h3>
                  <div className="space-y-4">
                    {features.map((feature, index) => {
                      const Icon = feature.icon;
                      return (
                        <div key={index} className="flex gap-3">
                          <div className="w-10 h-10 bg-gradient-aplyka-primary rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">{feature.title}</h4>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Security Notice */}
              <Card className="shadow-lg bg-gradient-to-r from-aplyka-azure/10 to-aplyka-lime/10 border-aplyka-azure/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-5 h-5 text-aplyka-azure" />
                    <h4 className="font-semibold text-aplyka-dark-gray">Secure Login</h4>
                  </div>
                  <p className="text-sm text-aplyka-dark-gray/70 mb-3">
                    Your login is protected with multi-factor authentication and industry-standard encryption.
                  </p>
                  <div className="text-xs text-aplyka-dark-gray/60 space-y-1">
                    <div>• Two-factor authentication available</div>
                    <div>• 256-bit SSL encryption</div>
                    <div>• Session monitoring</div>
                  </div>
                </CardContent>
              </Card>

              {/* Demo Info */}
              <Card className="shadow-lg bg-gradient-to-r from-aplyka-lime/10 to-aplyka-lime/20 border-aplyka-lime/30">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="w-5 h-5 text-aplyka-dark-gray" />
                    <h4 className="font-semibold text-aplyka-dark-gray">Demo Accounts</h4>
                  </div>
                  <div className="text-sm text-aplyka-dark-gray/70 space-y-2">
                    <div>
                      <strong>Regular Demo:</strong>
                      <br />demo@example.com / demo123
                    </div>
                    <div>
                      <strong>2FA Demo:</strong>
                      <br />user2fa@example.com / password123
                      <br /><em>Use code "123456" for 2FA</em>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}