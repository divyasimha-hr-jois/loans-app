import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";  
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Shield, 
  Smartphone, 
  QrCode, 
  Copy,
  CheckCircle,
  AlertCircle,
  Download,
  Key,
  Settings,
  Trash2,
  RefreshCw
} from "lucide-react";

interface TwoFactorSetupProps {
  onBack: () => void;
  currentStatus: boolean;
  onStatusChange: (enabled: boolean) => void;
}

export function TwoFactorSetup({ onBack, currentStatus, onStatusChange }: TwoFactorSetupProps) {
  const [setupStep, setSetupStep] = useState<"overview" | "setup" | "verify">("overview");
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [backupCodes] = useState([
    "8B9C2D4F", "1A5E7G3H", "9K2M4N6P", "3Q7R5S8T",
    "6U1V9W2X", "4Y8Z1A3B", "7C5D9E2F", "2G6H4I8J"
  ]);
  const [showBackupCodes, setShowBackupCodes] = useState(false);
  const [copiedSecret, setCopiedSecret] = useState(false);

  // Mock secret key for QR code
  const secretKey = "JBSWY3DPEHPK3PXP";
  const qrCodeUrl = `otpauth://totp/LoanHub:user@example.com?secret=${secretKey}&issuer=LoanHub`;

  const handleEnable2FA = () => {
    setSetupStep("setup");
    setError("");
  };

  const handleDisable2FA = () => {
    if (confirm("Are you sure you want to disable 2FA? This will make your account less secure.")) {
      onStatusChange(false);
      alert("2FA has been disabled for your account.");
    }
  };

  const handleVerifySetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!verificationCode || verificationCode.length !== 6) {
      setError("Please enter a valid 6-digit code");
      return;
    }

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo, accept any 6-digit code
      if (/^\d{6}$/.test(verificationCode)) {
        onStatusChange(true);
        setShowBackupCodes(true);
        setSetupStep("overview");
      } else {
        setError("Invalid verification code. Please try again.");
      }
    } catch (error) {
      setError("Setup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, type: 'secret' | 'backup') => {
    navigator.clipboard.writeText(text).then(() => {
      if (type === 'secret') {
        setCopiedSecret(true);
        setTimeout(() => setCopiedSecret(false), 2000);
      } else {
        alert("Backup codes copied to clipboard!");
      }
    });
  };

  const downloadBackupCodes = () => {
    const content = `LoanHub 2FA Backup Codes
Generated: ${new Date().toLocaleDateString()}

Keep these backup codes safe. Each code can only be used once.

${backupCodes.join('\n')}

Important:
- Store these codes in a secure location
- Each code can only be used once
- Generate new codes if you lose these
`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'loanhub-2fa-backup-codes.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Current Status */}
      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            currentStatus ? 'bg-green-100 dark:bg-green-900/20' : 'bg-gray-100 dark:bg-gray-900/20'
          }`}>
            <Shield className={`w-5 h-5 ${
              currentStatus ? 'text-green-600' : 'text-gray-400'
            }`} />
          </div>
          <div>
            <h3 className="font-medium">Two-Factor Authentication</h3>
            <p className="text-sm text-muted-foreground">
              {currentStatus ? "2FA is currently enabled" : "2FA is currently disabled"}
            </p>
          </div>
        </div>
        <Badge variant={currentStatus ? "default" : "secondary"}>
          {currentStatus ? "Enabled" : "Disabled"}
        </Badge>
      </div>

      {/* Actions */}
      {!currentStatus ? (
        <div className="space-y-4">
          <Button
            onClick={handleEnable2FA}
            className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
          >
            <Shield className="w-4 h-4 mr-2" />
            Enable Two-Factor Authentication
          </Button>
          
          <Alert>
            <Shield className="h-4 w-4 text-blue-600" />
            <AlertDescription>
              Enabling 2FA adds an extra layer of security to your account by requiring a code from your mobile device when signing in.
            </AlertDescription>
          </Alert>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => setShowBackupCodes(true)}
              className="border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              <Key className="w-4 h-4 mr-2" />
              View Backup Codes
            </Button>
            <Button
              variant="outline"
              onClick={handleDisable2FA}
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Disable 2FA
            </Button>
          </div>

          <Alert className="border-green-200 bg-green-50 dark:bg-green-900/20">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700 dark:text-green-400">
              Your account is protected with two-factor authentication. You'll need your authenticator app to sign in.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Information */}
      <div className="space-y-4">
        <h4 className="font-medium flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-blue-600" />
          Compatible Apps
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div className="p-3 border rounded-lg text-center">
            <div className="font-medium">Google Authenticator</div>
            <div className="text-muted-foreground text-xs">iOS & Android</div>
          </div>
          <div className="p-3 border rounded-lg text-center">
            <div className="font-medium">Authy</div>
            <div className="text-muted-foreground text-xs">Cross-platform</div>
          </div>
          <div className="p-3 border rounded-lg text-center">
            <div className="font-medium">1Password</div>
            <div className="text-muted-foreground text-xs">Premium</div>
          </div>
          <div className="p-3 border rounded-lg text-center">
            <div className="font-medium">Microsoft Authenticator</div>
            <div className="text-muted-foreground text-xs">Free</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSetup = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Setup Two-Factor Authentication</h3>
        <p className="text-muted-foreground">
          Scan the QR code with your authenticator app, then verify with the generated code.
        </p>
      </div>

      {/* Step 1: QR Code */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <QrCode className="w-5 h-5 text-blue-600" />
            Step 1: Scan QR Code
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          {/* Placeholder QR Code */}
          <div className="w-48 h-48 mx-auto bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">QR Code</p>
              <p className="text-xs text-gray-400">Scan with your app</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Can't scan the code?</p>
            <div className="flex items-center gap-2 p-2 bg-muted rounded border">
              <code className="flex-1 text-sm font-mono">{secretKey}</code>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(secretKey, 'secret')}
                className="p-1 h-auto"
              >
                {copiedSecret ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Enter this key manually in your authenticator app</p>
          </div>
        </CardContent>
      </Card>

      {/* Step 2: Verify */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Key className="w-5 h-5 text-green-600" />
            Step 2: Verify Setup
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-4 border-red-200 bg-red-50 dark:bg-red-900/20">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700 dark:text-red-400">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleVerifySetup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="verification">Enter the 6-digit code from your app</Label>
              <Input
                id="verification"
                type="text"
                inputMode="numeric"
                className="text-center text-xl font-mono tracking-widest"
                placeholder="000000"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                autoFocus
              />
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setSetupStep("overview")}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading || verificationCode.length !== 6}
                className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Enable 2FA
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground"
        >
          ← Back to Security Settings
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20">
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-6 h-6 text-blue-600" />
            Two-Factor Authentication Setup
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {setupStep === "overview" && renderOverview()}
          {setupStep === "setup" && renderSetup()}
        </CardContent>
      </Card>

      {/* Backup Codes Modal */}
      <Dialog open={showBackupCodes} onOpenChange={setShowBackupCodes}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Key className="w-5 h-5 text-blue-600" />
              Backup Codes
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <AlertDescription>
                Save these backup codes in a secure location. Each code can only be used once.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-2 gap-2 p-4 bg-muted rounded font-mono text-sm">
              {backupCodes.map((code, index) => (
                <div key={index} className="p-2 bg-background rounded text-center">
                  {code}
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => copyToClipboard(backupCodes.join('\n'), 'backup')}
                className="flex-1"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy All
              </Button>
              <Button
                variant="outline"
                onClick={downloadBackupCodes}
                className="flex-1"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}