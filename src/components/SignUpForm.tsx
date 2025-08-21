import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard, 
  Building2, 
  Lock, 
  Eye, 
  EyeOff,
  Shield,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "../contexts/AuthContext";

interface FormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  ssn: string;
  
  // Address Information
  address: string;
  city: string;
  state: string;
  zipCode: string;
  
  // Employment Information
  employmentStatus: string;
  employer: string;
  jobTitle: string;
  annualIncome: string;
  
  // Financial Information
  creditScore: string;
  bankingRelationship: string;
  
  // Account Security
  password: string;
  confirmPassword: string;
  
  // Agreements
  termsAccepted: boolean;
  privacyAccepted: boolean;
  marketingConsent: boolean;
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  ssn: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  employmentStatus: "",
  employer: "",
  jobTitle: "",
  annualIncome: "",
  creditScore: "",
  bankingRelationship: "",
  password: "",
  confirmPassword: "",
  termsAccepted: false,
  privacyAccepted: false,
  marketingConsent: false
};

const steps = [
  { id: 1, title: "Personal Information", icon: User },
  { id: 2, title: "Address & Employment", icon: MapPin },
  { id: 3, title: "Financial Details", icon: CreditCard },
  { id: 4, title: "Account Security", icon: Shield }
];

const states = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

export function SignUpForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitError, setSubmitError] = useState("");
  
  const { signup, isLoading } = useAuth();

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    // Clear submit error when user makes changes
    if (submitError) {
      setSubmitError("");
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FormData> = {};

    switch (step) {
      case 1:
        if (!formData.firstName) newErrors.firstName = "First name is required";
        if (!formData.lastName) newErrors.lastName = "Last name is required";
        if (!formData.email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
        if (!formData.phone) newErrors.phone = "Phone number is required";
        if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
        if (!formData.ssn) newErrors.ssn = "SSN is required";
        break;
      
      case 2:
        if (!formData.address) newErrors.address = "Address is required";
        if (!formData.city) newErrors.city = "City is required";
        if (!formData.state) newErrors.state = "State is required";
        if (!formData.zipCode) newErrors.zipCode = "ZIP code is required";
        if (!formData.employmentStatus) newErrors.employmentStatus = "Employment status is required";
        break;
      
      case 3:
        if (!formData.annualIncome) newErrors.annualIncome = "Annual income is required";
        if (!formData.creditScore) newErrors.creditScore = "Credit score range is required";
        break;
      
      case 4:
        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
        if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
        else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords don't match";
        if (!formData.termsAccepted) newErrors.termsAccepted = "You must accept the terms and conditions";
        if (!formData.privacyAccepted) newErrors.privacyAccepted = "You must accept the privacy policy";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (validateStep(4)) {
      const success = await signup(formData);
      if (!success) {
        setSubmitError("An account with this email already exists. Please try logging in instead.");
      }
      // If successful, the auth context will handle the login automatically
    }
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => updateFormData("firstName", e.target.value)}
                  className={errors.firstName ? "border-red-500" : ""}
                />
                {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => updateFormData("lastName", e.target.value)}
                  className={errors.lastName ? "border-red-500" : ""}
                />
                {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                />
              </div>
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  className={`pl-10 ${errors.phone ? "border-red-500" : ""}`}
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                  placeholder="(555) 123-4567"
                />
              </div>
              {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                  className={errors.dateOfBirth ? "border-red-500" : ""}
                />
                {errors.dateOfBirth && <p className="text-sm text-red-500">{errors.dateOfBirth}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="ssn">Social Security Number *</Label>
                <Input
                  id="ssn"
                  type="password"
                  value={formData.ssn}
                  onChange={(e) => updateFormData("ssn", e.target.value)}
                  className={errors.ssn ? "border-red-500" : ""}
                  placeholder="XXX-XX-XXXX"
                />
                {errors.ssn && <p className="text-sm text-red-500">{errors.ssn}</p>}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Street Address *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => updateFormData("address", e.target.value)}
                className={errors.address ? "border-red-500" : ""}
              />
              {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => updateFormData("city", e.target.value)}
                  className={errors.city ? "border-red-500" : ""}
                />
                {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Select value={formData.state} onValueChange={(value) => updateFormData("state", value)}>
                  <SelectTrigger className={errors.state ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map(state => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.state && <p className="text-sm text-red-500">{errors.state}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP Code *</Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => updateFormData("zipCode", e.target.value)}
                  className={errors.zipCode ? "border-red-500" : ""}
                />
                {errors.zipCode && <p className="text-sm text-red-500">{errors.zipCode}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="employmentStatus">Employment Status *</Label>
              <Select value={formData.employmentStatus} onValueChange={(value) => updateFormData("employmentStatus", value)}>
                <SelectTrigger className={errors.employmentStatus ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select employment status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employed">Employed</SelectItem>
                  <SelectItem value="self-employed">Self-Employed</SelectItem>
                  <SelectItem value="unemployed">Unemployed</SelectItem>
                  <SelectItem value="retired">Retired</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                </SelectContent>
              </Select>
              {errors.employmentStatus && <p className="text-sm text-red-500">{errors.employmentStatus}</p>}
            </div>

            {(formData.employmentStatus === "employed" || formData.employmentStatus === "self-employed") && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="employer">Employer/Company Name</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="employer"
                      className="pl-10"
                      value={formData.employer}
                      onChange={(e) => updateFormData("employer", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input
                    id="jobTitle"
                    value={formData.jobTitle}
                    onChange={(e) => updateFormData("jobTitle", e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="annualIncome">Annual Income *</Label>
              <Select value={formData.annualIncome} onValueChange={(value) => updateFormData("annualIncome", value)}>
                <SelectTrigger className={errors.annualIncome ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select income range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-25k">Under $25,000</SelectItem>
                  <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                  <SelectItem value="50k-75k">$50,000 - $75,000</SelectItem>
                  <SelectItem value="75k-100k">$75,000 - $100,000</SelectItem>
                  <SelectItem value="100k-150k">$100,000 - $150,000</SelectItem>
                  <SelectItem value="over-150k">Over $150,000</SelectItem>
                </SelectContent>
              </Select>
              {errors.annualIncome && <p className="text-sm text-red-500">{errors.annualIncome}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="creditScore">Credit Score Range *</Label>
              <Select value={formData.creditScore} onValueChange={(value) => updateFormData("creditScore", value)}>
                <SelectTrigger className={errors.creditScore ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select credit score range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="poor">Poor (300-579)</SelectItem>
                  <SelectItem value="fair">Fair (580-669)</SelectItem>
                  <SelectItem value="good">Good (670-739)</SelectItem>
                  <SelectItem value="very-good">Very Good (740-799)</SelectItem>
                  <SelectItem value="excellent">Excellent (800-850)</SelectItem>
                  <SelectItem value="unknown">I don't know</SelectItem>
                </SelectContent>
              </Select>
              {errors.creditScore && <p className="text-sm text-red-500">{errors.creditScore}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bankingRelationship">Current Banking Relationship</Label>
              <Select value={formData.bankingRelationship} onValueChange={(value) => updateFormData("bankingRelationship", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your current bank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="chase">Chase</SelectItem>
                  <SelectItem value="bofa">Bank of America</SelectItem>
                  <SelectItem value="wells-fargo">Wells Fargo</SelectItem>
                  <SelectItem value="citi">Citibank</SelectItem>
                  <SelectItem value="usbank">US Bank</SelectItem>
                  <SelectItem value="credit-union">Credit Union</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="none">No current banking relationship</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            {submitError && (
              <Alert className="border-red-200 bg-red-50 dark:bg-red-900/20">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-700 dark:text-red-400">
                  {submitError}
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className={`pl-10 pr-10 ${errors.password ? "border-red-500" : ""}`}
                  value={formData.password}
                  onChange={(e) => updateFormData("password", e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {formData.password && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Password strength:</span>
                    <Badge variant={passwordStrength < 50 ? "destructive" : passwordStrength < 75 ? "secondary" : "default"}>
                      {passwordStrength < 50 ? "Weak" : passwordStrength < 75 ? "Good" : "Strong"}
                    </Badge>
                  </div>
                  <Progress value={passwordStrength} className="h-2" />
                </div>
              )}
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  className={`pl-10 pr-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
                  value={formData.confirmPassword}
                  onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.termsAccepted}
                  onCheckedChange={(checked) => updateFormData("termsAccepted", checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm leading-5">
                  I agree to the <button className="text-blue-600 hover:underline">Terms and Conditions</button> and 
                  acknowledge that I have read the loan disclosures. *
                </Label>
              </div>
              {errors.termsAccepted && <p className="text-sm text-red-500">{errors.termsAccepted}</p>}

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="privacy"
                  checked={formData.privacyAccepted}
                  onCheckedChange={(checked) => updateFormData("privacyAccepted", checked as boolean)}
                />
                <Label htmlFor="privacy" className="text-sm leading-5">
                  I agree to the <button className="text-blue-600 hover:underline">Privacy Policy</button> and 
                  consent to the processing of my personal data. *
                </Label>
              </div>
              {errors.privacyAccepted && <p className="text-sm text-red-500">{errors.privacyAccepted}</p>}

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="marketing"
                  checked={formData.marketingConsent}
                  onCheckedChange={(checked) => updateFormData("marketingConsent", checked as boolean)}
                />
                <Label htmlFor="marketing" className="text-sm leading-5">
                  I would like to receive marketing communications about loan products and financial services.
                </Label>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            
            return (
              <div key={step.id} className="flex items-center">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                  isActive ? "bg-blue-600 border-blue-600 text-white" :
                  isCompleted ? "bg-green-600 border-green-600 text-white" :
                  "bg-muted border-muted-foreground text-muted-foreground"
                )}>
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={cn(
                    "w-16 h-0.5 mx-2 transition-all duration-300",
                    isCompleted ? "bg-green-600" : "bg-muted"
                  )} />
                )}
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-2">
          {steps.map((step) => (
            <div key={step.id} className="flex-1 text-center">
              <p className={cn(
                "text-xs transition-all duration-300",
                currentStep === step.id ? "text-blue-600 font-medium" :
                currentStep > step.id ? "text-green-600" :
                "text-muted-foreground"
              )}>
                {step.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Form Card */}
      <Card className="shadow-xl">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20">
          <CardTitle className="flex items-center gap-2">
            {(() => {
              const Icon = steps[currentStep - 1]?.icon;
              return Icon ? <Icon className="w-6 h-6 text-blue-600" /> : null;
            })()}
            {steps[currentStep - 1]?.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {renderStepContent()}
          
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>
            
            {currentStep < 4 ? (
              <Button
                onClick={nextStep}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
              >
                {isLoading ? "Creating Account..." : (
                  <>
                    Complete Registration
                    <CheckCircle className="w-4 h-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}