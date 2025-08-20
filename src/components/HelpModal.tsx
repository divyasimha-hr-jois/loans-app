import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  HelpCircle, 
  MessageSquare, 
  Phone, 
  Mail, 
  Clock,
  CheckCircle,
  CreditCard,
  Calculator,
  FileText,
  Users
} from "lucide-react";
import { useState } from "react";

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const helpTopics = [
  {
    id: "loan-types",
    title: "Understanding Loan Types",
    description: "Learn about personal, auto, student, and business loans",
    icon: FileText
  },
  {
    id: "credit-score",
    title: "Credit Score Impact",
    description: "How your credit score affects loan approval and rates",
    icon: CreditCard
  },
  {
    id: "loan-calculator",
    title: "Using the Calculator",
    description: "Calculate monthly payments and total interest",
    icon: Calculator
  },
  {
    id: "application-process",
    title: "Application Process",
    description: "Step-by-step guide to applying for loans",
    icon: CheckCircle
  }
];

const faqs = [
  {
    question: "What credit score do I need for a loan?",
    answer: "Most lenders prefer a credit score of 650 or higher, but some options are available for lower scores."
  },
  {
    question: "How long does approval take?",
    answer: "Approval times vary from 24 hours to 5 days depending on the lender and loan type."
  },
  {
    question: "Can I pay off my loan early?",
    answer: "Most of our partner lenders don't charge prepayment penalties, allowing you to pay off loans early."
  }
];

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  const [activeTab, setActiveTab] = useState("topics");
  const [contactForm, setContactForm] = useState({
    topic: "",
    message: "",
    email: "",
    phone: ""
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", contactForm);
    // Here you would send the form data
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <HelpCircle className="w-6 h-6 text-blue-600" />
            How can we help you?
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-muted rounded-lg p-1">
            <button
              onClick={() => setActiveTab("topics")}
              className={`flex-1 py-2 px-4 rounded-md text-sm transition-colors ${
                activeTab === "topics" 
                  ? "bg-background text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Help Topics
            </button>
            <button
              onClick={() => setActiveTab("faq")}
              className={`flex-1 py-2 px-4 rounded-md text-sm transition-colors ${
                activeTab === "faq" 
                  ? "bg-background text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              FAQ
            </button>
            <button
              onClick={() => setActiveTab("contact")}
              className={`flex-1 py-2 px-4 rounded-md text-sm transition-colors ${
                activeTab === "contact" 
                  ? "bg-background text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Contact Support
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "topics" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {helpTopics.map((topic) => {
                const Icon = topic.icon;
                return (
                  <Card key={topic.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{topic.title}</h3>
                          <p className="text-sm text-muted-foreground">{topic.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {activeTab === "faq" && (
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {activeTab === "contact" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Contact Form */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    Send us a message
                  </h3>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="topic">What can we help you with?</Label>
                      <Select value={contactForm.topic} onValueChange={(value) => setContactForm({...contactForm, topic: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a topic" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="loan-application">Loan Application</SelectItem>
                          <SelectItem value="account">Account Issues</SelectItem>
                          <SelectItem value="rates">Interest Rates</SelectItem>
                          <SelectItem value="technical">Technical Support</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        value={contactForm.message}
                        onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                        placeholder="Please describe your question or issue..."
                        rows={4}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                          placeholder="your@email.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone (optional)</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Phone className="w-5 h-5 text-green-600" />
                      Call us directly
                    </h3>
                    <p className="text-muted-foreground mb-2">Speak with our loan specialists</p>
                    <p className="font-semibold text-lg">1-800-LOANS-24</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Mon-Fri: 8AM-8PM EST</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Mail className="w-5 h-5 text-blue-600" />
                      Email support
                    </h3>
                    <p className="text-muted-foreground mb-2">We typically respond within 24 hours</p>
                    <p className="font-semibold">support@loancompare.com</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-purple-600" />
                      Live chat
                    </h3>
                    <p className="text-muted-foreground mb-4">Get instant answers to common questions</p>
                    <Button variant="outline" className="w-full border-purple-200 text-purple-600 hover:bg-purple-50">
                      Start Live Chat
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Badge variant="secondary" className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              24/7 Support Available
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Average response: 2 hours
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}