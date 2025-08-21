"use client";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, TrendingUp, DollarSign, Clock, Lightbulb, Download, Share } from "lucide-react";

export function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState([50000]);
  const [interestRate, setInterestRate] = useState([10]);
  const [loanTerm, setLoanTerm] = useState([5]);
  const [isCalculated, setIsCalculated] = useState(false);

  // Calculate EMI using standard formula
  const calculateEMI = () => {
    const principal = loanAmount[0];
    const monthlyRate = interestRate[0] / 12 / 100;
    const months = loanTerm[0] * 12;
    
    if (monthlyRate === 0) {
      return principal / months;
    }
    
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    return emi;
  };

  const monthlyEMI = calculateEMI();
  const totalAmount = monthlyEMI * loanTerm[0] * 12;
  const totalInterest = totalAmount - loanAmount[0];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const handleCalculateClick = () => {
    setIsCalculated(true);
    // Add a small delay to show the calculation "working"
    setTimeout(() => {
      // Scroll to results if needed
      const resultsElement = document.getElementById('calculation-results');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleDownloadReport = () => {
    const reportData = {
      loanAmount: formatCurrency(loanAmount[0]),
      interestRate: `${interestRate[0]}%`,
      loanTerm: `${loanTerm[0]} years`,
      monthlyEMI: formatCurrency(monthlyEMI),
      totalInterest: formatCurrency(totalInterest),
      totalAmount: formatCurrency(totalAmount)
    };
    
    // Create a simple text report
    const reportText = `
APLYKA LOAN CALCULATION REPORT
Generated on: ${new Date().toLocaleDateString()}

Loan Details:
- Principal Amount: ${reportData.loanAmount}
- Interest Rate: ${reportData.interestRate}
- Loan Term: ${reportData.loanTerm}

Calculation Results:
- Monthly EMI: ${reportData.monthlyEMI}
- Total Interest: ${reportData.totalInterest}
- Total Amount: ${reportData.totalAmount}

Note: This is an estimated calculation. Actual rates and terms may vary based on your credit profile and lender policies.

Visit aplyka.com for more financial tools and services.
    `;

    // Create and download the file
    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'aplyka-loan-calculation-report.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShareCalculation = () => {
    if (navigator.share) {
      navigator.share({
        title: 'aplyka Loan Calculation Results',
        text: `Monthly EMI: ${formatCurrency(monthlyEMI)} for a ${formatCurrency(loanAmount[0])} loan at ${interestRate[0]}% for ${loanTerm[0]} years`,
        url: window.location.href
      });
    } else {
      // Fallback to copying to clipboard
      const shareText = `Check out my loan calculation on aplyka: Monthly EMI of ${formatCurrency(monthlyEMI)} for a ${formatCurrency(loanAmount[0])} loan at ${interestRate[0]}% for ${loanTerm[0]} years`;
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Calculation details copied to clipboard!');
      });
    }
  };

  const getSavingsTip = () => {
    if (interestRate[0] > 12) {
      return "💡 Tip: Improving your credit score could help you qualify for better rates!";
    } else if (loanTerm[0] > 7) {
      return "💡 Tip: Consider a shorter term to save on total interest paid.";
    } else if (loanAmount[0] > 100000) {
      return "💡 Tip: For large loans, shop around with multiple lenders for the best rates.";
    }
    return "💡 Tip: Making extra payments toward principal can significantly reduce total interest!";
  };

  return (
    <Card className="mt-8 shadow-lg hover:shadow-xl transition-all duration-300 border-aplyka-azure/20">
      <CardHeader className="bg-gradient-to-r from-aplyka-azure/10 to-aplyka-lime/10">
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-aplyka-azure" />
          Loan Calculator
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Adjust the values below to see how different loan terms affect your monthly payments
        </p>
      </CardHeader>
      <CardContent className="space-y-8 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side - Controls */}
          <div className="space-y-6">
            {/* Loan Amount */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm text-muted-foreground">
                  Loan Amount ($20,000-$500,000)
                </label>
                <span className="font-semibold text-aplyka-azure">
                  {formatCurrency(loanAmount[0])}
                </span>
              </div>
              <Slider
                value={loanAmount}
                onValueChange={(value) => {
                  setLoanAmount(value);
                  setIsCalculated(false);
                }}
                max={500000}
                min={20000}
                step={5000}
                className="w-full"
              />
            </div>

            {/* Interest Rate */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm text-muted-foreground">
                  Interest Rate (APR) (3%-30%)
                </label>
                <span className="font-semibold text-aplyka-lime">{interestRate[0]}%</span>
              </div>
              <Slider
                value={interestRate}
                onValueChange={(value) => {
                  setInterestRate(value);
                  setIsCalculated(false);
                }}
                max={30}
                min={3}
                step={0.1}
                className="w-full"
              />
            </div>

            {/* Loan Term */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm text-muted-foreground">
                  Loan Term (1-30 years)
                </label>
                <span className="font-semibold text-aplyka-dark-gray">{loanTerm[0]} years</span>
              </div>
              <Slider
                value={loanTerm}
                onValueChange={(value) => {
                  setLoanTerm(value);
                  setIsCalculated(false);
                }}
                max={30}
                min={1}
                step={1}
                className="w-full"
              />
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={handleCalculateClick}
                className="flex-1 bg-aplyka-azure hover:bg-aplyka-azure/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                <Calculator className="w-4 h-4 mr-2" />
                Calculate EMI
              </Button>
              {isCalculated && (
                <Button
                  variant="outline"
                  onClick={handleDownloadReport}
                  className="border-aplyka-azure text-aplyka-azure hover:bg-aplyka-azure/10"
                >
                  <Download className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Right side - Results */}
          <div className="lg:pl-8 lg:border-l border-border" id="calculation-results">
            <h3 className="font-semibold mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-aplyka-azure" />
              Calculation Results
              {isCalculated && (
                <Badge className="bg-aplyka-lime text-aplyka-dark-gray">
                  Updated
                </Badge>
              )}
            </h3>
            <div className="space-y-6">
              <div className={`p-4 bg-gradient-to-br from-aplyka-azure/10 to-aplyka-azure/20 rounded-lg border border-aplyka-azure/30 transition-all duration-300 ${isCalculated ? 'ring-2 ring-aplyka-azure shadow-lg' : ''}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-aplyka-azure" />
                    <span className="text-muted-foreground">Monthly EMI</span>
                  </div>
                  <span className="text-2xl font-semibold text-aplyka-azure">
                    {formatCurrency(monthlyEMI)}
                  </span>
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-aplyka-lime/10 to-aplyka-lime/20 rounded-lg border border-aplyka-lime/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-aplyka-dark-gray" />
                    <span className="text-muted-foreground">Total Interest Payable</span>
                  </div>
                  <span className="text-xl font-semibold text-aplyka-dark-gray">
                    {formatCurrency(totalInterest)}
                  </span>
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-aplyka-light-gray/50 to-aplyka-light-gray/70 rounded-lg border border-aplyka-light-gray/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-aplyka-dark-gray" />
                    <span className="text-muted-foreground">Total Amount to Pay</span>
                  </div>
                  <span className="text-xl font-semibold text-aplyka-dark-gray">
                    {formatCurrency(totalAmount)}
                  </span>
                </div>
              </div>

              {/* Savings Tip */}
              <div className="p-3 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-md border border-orange-200 dark:border-orange-800">
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-orange-700 dark:text-orange-400">
                    {getSavingsTip()}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              {isCalculated && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShareCalculation}
                    className="flex-1 border-aplyka-lime text-aplyka-dark-gray hover:bg-aplyka-lime/10"
                  >
                    <Share className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              )}

              <div className="text-xs text-muted-foreground">
                <strong>Note:</strong> This is an estimated result and may differ based on your credit profile and bank policies.
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}