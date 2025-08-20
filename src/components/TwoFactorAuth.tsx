import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  Smartphone, 
  Clock, 
  AlertCircle,
  CheckCircle,
  RefreshCw,
  ArrowLeft
} from "lucide-react";

interface TwoFactorAuthProps {
  email: string;
  onVerificationSuccess: () => void;
  onBack: () => void;
}

export function TwoFactorAuth({ email, onVerificationSuccess, onBack }: TwoFactorAuthProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // Countdown timer for resend
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!code || code.length !== 6) {
      setError("Please enter a valid 6-digit code");
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, accept any 6-digit code or "123456"
      if (code === "123456" || /^\d{6}$/.test(code)) {
        onVerificationSuccess();
      } else {
        setError("Invalid verification code. Please try again.");
      }
    } catch (error) {
      setError("Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setCanResend(false);
    setTimeLeft(30);
    setError("");
    
    // Simulate resending code
    await new Promise(resolve => setTimeout(resolve, 1000));
    // In a real app, you would call your API to resend the code
    console.log("2FA code resent to:", email);
  };

  const handleCodeInput = (value: string) => {
    // Only allow digits and limit to 6 characters
    const filteredValue = value.replace(/\D/g, '').slice(0, 6);
    setCode(filteredValue);
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-blue-950 dark:via-gray-900 dark:to-green-950">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Button>

          {/* Main Card */}
          <Card className="shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Two-Factor Authentication</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                Enter the 6-digit code from your authenticator app
              </p>
            </CardHeader>
            
            <CardContent className="p-6">
              {/* User Info */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
                  <Smartphone className="w-4 h-4" />
                  <span>Verification code sent to your device</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {email}
                </Badge>
              </div>

              {error && (
                <Alert className="mb-6 border-red-200 bg-red-50 dark:bg-red-900/20">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-700 dark:text-red-400">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="code" className="sr-only">Verification Code</Label>
                  <Input
                    id="code"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    className="text-center text-2xl font-mono tracking-widest h-14"
                    placeholder="000000"
                    value={code}
                    onChange={(e) => handleCodeInput(e.target.value)}
                    autoFocus
                  />
                  <p className="text-xs text-muted-foreground text-center">
                    Enter the 6-digit code from your authenticator app
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 h-12"
                  disabled={isLoading || code.length !== 6}
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Verify & Continue
                    </>
                  )}
                </Button>
              </form>

              {/* Resend Code Section */}
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-3">
                  <Clock className="w-4 h-4" />
                  <span>Didn't receive a code?</span>
                </div>
                
                {!canResend ? (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Resend available in {timeLeft}s
                    </p>
                    <Progress value={((30 - timeLeft) / 30) * 100} className="h-1" />
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    onClick={handleResendCode}
                    className="border-blue-200 text-blue-600 hover:bg-blue-50"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Resend Code
                  </Button>
                )}
              </div>

              {/* Help Text */}
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-600" />
                  Having trouble?
                </h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Make sure your device time is synchronized</li>
                  <li>• Check your authenticator app (Google Authenticator, Authy, etc.)</li>
                  <li>• Contact support if you've lost access to your device</li>
                </ul>
              </div>

              {/* Demo Info */}
              <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-md border border-yellow-200 dark:border-yellow-800">
                <p className="text-xs text-yellow-700 dark:text-yellow-400 text-center">
                  <strong>Demo:</strong> Use code "123456" or any 6-digit number to continue
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}