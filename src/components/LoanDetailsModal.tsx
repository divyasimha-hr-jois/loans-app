"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Clock, DollarSign, CreditCard, FileText, Calculator } from "lucide-react";
import { LoanData } from "./LoansTable";

interface LoanDetailsModalProps {
  loan: LoanData | null;
  isOpen: boolean;
  onClose: () => void;
}

export function LoanDetailsModal({ loan, isOpen, onClose }: LoanDetailsModalProps) {
  if (!loan) return null;

  const features = [
    "No prepayment penalty",
    "Fast approval process",
    "Competitive interest rates",
    "Flexible repayment terms",
    "Online account management",
    "24/7 customer support"
  ];

  const requirements = [
    `Minimum credit score: ${loan.minimumCreditScore}+`,
    `Minimum income: ${loan.minimumIncome}`,
    "Valid government-issued ID",
    "Proof of income (recent pay stubs)",
    "Bank statements (last 3 months)",
    "Employment verification"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-2xl shadow-lg">
              {loan.logo}
            </div>
            {loan.bankName} Loan Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Key Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <span className="text-sm text-green-600 dark:text-green-400">Interest Rate</span>
              </div>
              <div className="text-2xl font-semibold text-green-700 dark:text-green-300">
                {loan.interestRate}
              </div>
            </div>

            <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-blue-600 dark:text-blue-400">Loan Amount</span>
              </div>
              <div className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                {loan.loanAmount}
              </div>
            </div>

            <div className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-purple-600" />
                <span className="text-sm text-purple-600 dark:text-purple-400">Processing Time</span>
              </div>
              <div className="text-lg font-semibold text-purple-700 dark:text-purple-300">
                {loan.processingTime}
              </div>
            </div>

            <div className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-5 h-5 text-orange-600" />
                <span className="text-sm text-orange-600 dark:text-orange-400">Financing</span>
              </div>
              <div className="text-lg font-semibold text-orange-700 dark:text-orange-300">
                {loan.financing}
              </div>
            </div>
          </div>

          <Separator />

          {/* Loan Categories */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Available Loan Types
            </h3>
            <div className="flex flex-wrap gap-2">
              {loan.loanType.map((type) => (
                <Badge
                  key={type}
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 capitalize"
                >
                  {type === "debt" ? "Debt Consolidation" : type}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Features and Requirements */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Features */}
            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Key Features
              </h3>
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Requirements
              </h3>
              <ul className="space-y-2">
                {requirements.map((requirement, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    </div>
                    {requirement}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Separator />

          {/* Additional Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Loan Terms</h4>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Term Length:</strong> {loan.term}
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Minimum Income:</strong> {loan.minimumIncome}
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Credit Requirements</h4>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Minimum Credit Score:</strong> {loan.minimumCreditScore}+
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Financing Available:</strong> Up to {loan.financing} of loan amount
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Apply Now
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 dark:border-blue-600 dark:text-blue-400 dark:hover:bg-blue-900/20"
            >
              Save for Later
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 dark:border-green-600 dark:text-green-400 dark:hover:bg-green-900/20"
            >
              Compare Rates
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}