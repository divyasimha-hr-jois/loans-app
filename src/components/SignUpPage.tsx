import { SignUpForm } from "./SignUpForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Clock, 
  TrendingUp, 
  CheckCircle, 
  Star,
  Users,
  Award,
  Lock
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Bank-Level Security",
    description: "Your data is protected with 256-bit encryption and multi-factor authentication"
  },
  {
    icon: Clock,
    title: "Fast Approval",
    description: "Get pre-approved in minutes with our streamlined application process"
  },
  {
    icon: TrendingUp,
    title: "Best Rates",
    description: "Access competitive rates from top lenders nationwide"
  },
  {
    icon: CheckCircle,
    title: "No Hidden Fees",
    description: "Transparent pricing with no origination fees or prepayment penalties"
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Small Business Owner",
    content: "Got approved for my business loan in just 2 hours. The process was incredibly smooth!",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Teacher",
    content: "Found the perfect personal loan rate. Saved over $2,000 compared to my bank's offer.",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "Recent Graduate",
    content: "The student loan refinancing options helped me reduce my monthly payments significantly.",
    rating: 5
  }
];

const stats = [
  { label: "Loans Funded", value: "$2.5B+", icon: TrendingUp },
  { label: "Happy Customers", value: "500K+", icon: Users },
  { label: "Average Rating", value: "4.9/5", icon: Star },
  { label: "Years of Trust", value: "15+", icon: Award }
];

interface SignUpPageProps {
  onBackToLoans: () => void;
}

export function SignUpPage({ onBackToLoans }: SignUpPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-blue-950 dark:via-gray-900 dark:to-green-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-green-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-green-600 text-white">
              Trusted by 500K+ customers
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Start Your Financial Journey
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Join thousands of satisfied customers who have found their perfect loan solution. 
              Get pre-approved in minutes with competitive rates and transparent terms.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full text-white mb-2">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </div>

            <Button 
              variant="outline" 
              onClick={onBackToLoans}
              className="mb-8 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 dark:border-blue-600 dark:text-blue-400 dark:hover:bg-blue-900/20"
            >
              ← Back to Loan Comparison
            </Button>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Sign Up Form */}
            <div className="lg:col-span-2">
              <SignUpForm />
            </div>

            {/* Sidebar Content */}
            <div className="space-y-8">
              {/* Features */}
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-blue-600" />
                    Why Choose Us?
                  </h3>
                  <div className="space-y-4">
                    {features.map((feature, index) => {
                      const Icon = feature.icon;
                      return (
                        <div key={index} className="flex gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
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

              {/* Testimonials */}
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    Customer Stories
                  </h3>
                  <div className="space-y-6">
                    {testimonials.map((testimonial, index) => (
                      <div key={index} className="border-l-4 border-blue-500 pl-4">
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">"{testimonial.content}"</p>
                        <div>
                          <p className="font-medium text-sm">{testimonial.name}</p>
                          <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Security Notice */}
              <Card className="shadow-lg bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 border-blue-200 dark:border-blue-800">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300">Your Data is Secure</h4>
                  </div>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    We use industry-standard encryption and never share your personal information with third parties without your consent.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}