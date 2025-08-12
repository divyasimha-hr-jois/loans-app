"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";

export function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState([50000]);
  const [interestRate, setInterestRate] = useState([10]);
  const [loanTerm, setLoanTerm] = useState([5]);

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

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-blue-600" />
          Loan Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side - Controls */}
          <div className="space-y-6">
            {/* Loan Amount */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm text-muted-foreground">
                  Loan Amount ($20,000-$500,000)
                </label>
                <span className="font-medium">
                  {formatCurrency(loanAmount[0])}
                </span>
              </div>
              <Slider
                value={loanAmount}
                onValueChange={setLoanAmount}
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
                <span className="font-medium">{interestRate[0]}%</span>
              </div>
              <Slider
                value={interestRate}
                onValueChange={setInterestRate}
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
                <span className="font-medium">{loanTerm[0]} years</span>
              </div>
              <Slider
                value={loanTerm}
                onValueChange={setLoanTerm}
                max={30}
                min={1}
                step={1}
                className="w-full"
              />
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Calculate EMI
            </Button>
          </div>

          {/* Right side - Results */}
          <div className="lg:pl-8 lg:border-l border-border">
            <h3 className="font-medium mb-4">Calculation Results</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Monthly EMI</span>
                <span className="text-2xl font-semibold text-blue-600">
                  {formatCurrency(monthlyEMI)}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Interest Payable</span>
                <span className="text-xl font-medium">
                  {formatCurrency(totalInterest)}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Amount to Pay</span>
                <span className="text-xl font-medium">
                  {formatCurrency(totalAmount)}
                </span>
              </div>

              <div className="text-xs text-muted-foreground mt-4 p-3 bg-muted/30 rounded-md">
                <strong>Note:</strong> This is an estimated result and may differ based on your credit profile and bank policies.
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}