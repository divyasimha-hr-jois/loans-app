import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export interface LoanData {
  id: string;
  bankName: string;
  logo: string;
  minimumIncome: string;
  minimumCreditScore: number;
  financing: string;
  loanAmount: string;
  interestRate: string;
  term: string;
  processingTime: string;
  loanType: string[];
}

// All loan data with categories
export const allLoanData: LoanData[] = [
  {
    id: "1",
    bankName: "JP Bank",
    logo: "🏦",
    minimumIncome: "$5,000",
    minimumCreditScore: 650,
    financing: "90%",
    loanAmount: "$5,000 - $500,000",
    interestRate: "7.99% - 12.99%",
    term: "1 - 7 years",
    processingTime: "24-48 hrs",
    loanType: ["personal", "auto", "business"]
  },
  {
    id: "2",
    bankName: "Smart Finance",
    logo: "💳",
    minimumIncome: "$2,500",
    minimumCreditScore: 600,
    financing: "85%",
    loanAmount: "$3,000 - $75,000",
    interestRate: "8.49% - 15.99%",
    term: "2 - 5 years",
    processingTime: "1-2 days",
    loanType: ["personal", "debt"]
  },
  {
    id: "3",
    bankName: "Global Bank",
    logo: "🌍",
    minimumIncome: "$3,500",
    minimumCreditScore: 700,
    financing: "95%",
    loanAmount: "$10,000 - $500,000",
    interestRate: "6.99% - 11.99%",
    term: "1 - 10 years",
    processingTime: "10-24 hrs",
    loanType: ["personal", "auto", "business"]
  },
  {
    id: "4",
    bankName: "Secure Bank",
    logo: "🔒",
    minimumIncome: "$2,800",
    minimumCreditScore: 620,
    financing: "80%",
    loanAmount: "$2,500 - $50,000",
    interestRate: "9.99% - 16.99%",
    term: "2 - 6 years",
    processingTime: "2-4 days",
    loanType: ["personal", "student"]
  },
  {
    id: "5",
    bankName: "Money Care",
    logo: "💰",
    minimumIncome: "$4,000",
    minimumCreditScore: 680,
    financing: "75%",
    loanAmount: "$1,000 - $50,000",
    interestRate: "10.99% - 18.99%",
    term: "1 - 5 years",
    processingTime: "1-2 days",
    loanType: ["personal", "debt"]
  },
  {
    id: "6",
    bankName: "Money Talk",
    logo: "💬",
    minimumIncome: "$3,000",
    minimumCreditScore: 640,
    financing: "90%",
    loanAmount: "$5,000 - $75,000",
    interestRate: "7.49% - 12.49%",
    term: "2 - 8 years",
    processingTime: "24-72 hrs",
    loanType: ["auto", "business"]
  },
  {
    id: "7",
    bankName: "Premium Bank",
    logo: "⭐",
    minimumIncome: "$2,700",
    minimumCreditScore: 610,
    financing: "85%",
    loanAmount: "$2,000 - $80,000",
    interestRate: "8.99% - 15.49%",
    term: "1 - 6 years",
    processingTime: "2-5 days",
    loanType: ["personal", "student", "debt"]
  },
  {
    id: "8",
    bankName: "Factor Bank",
    logo: "📊",
    minimumIncome: "$4,500",
    minimumCreditScore: 690,
    financing: "90%",
    loanAmount: "$7,000 - $80,000",
    interestRate: "6.99% - 13.99%",
    term: "2 - 7 years",
    processingTime: "1-4 days",
    loanType: ["auto", "business"]
  },
  {
    id: "9",
    bankName: "Student First Bank",
    logo: "🎓",
    minimumIncome: "$1,500",
    minimumCreditScore: 580,
    financing: "100%",
    loanAmount: "$1,000 - $200,000",
    interestRate: "4.99% - 8.99%",
    term: "5 - 20 years",
    processingTime: "3-7 days",
    loanType: ["student"]
  },
  {
    id: "10",
    bankName: "Auto Finance Plus",
    logo: "🚗",
    minimumIncome: "$3,200",
    minimumCreditScore: 650,
    financing: "95%",
    loanAmount: "$10,000 - $150,000",
    interestRate: "5.99% - 10.99%",
    term: "3 - 8 years",
    processingTime: "12-24 hrs",
    loanType: ["auto"]
  }
];

interface LoansTableProps {
  loans: LoanData[];
  onDetailsClick: (loan: LoanData) => void;
}

export function LoansTable({ loans, onDetailsClick }: LoansTableProps) {
  return (
    <div>
      {/* Desktop/Tablet Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <div className="min-w-full">
          {/* Table Header */}
          <div className="grid grid-cols-9 gap-4 p-4 border-b border-border bg-gradient-to-r from-slate-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-t-lg text-sm text-muted-foreground">
            <div>Bank/Institution</div>
            <div>Minimum Income</div>
            <div>Minimum Credit Score</div>
            <div>Financing</div>
            <div>Loan Amount</div>
            <div>Interest Rate (APR)</div>
            <div>Term</div>
            <div>Processing Time</div>
            <div></div>
          </div>

          {/* Table Rows */}
          <div className="space-y-0">
            {loans.map((loan, index) => (
              <div
                key={loan.id}
                className={`grid grid-cols-9 gap-4 p-4 items-center text-sm border-b border-border hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 dark:hover:from-blue-900/20 dark:hover:to-green-900/20 transition-all duration-300 hover:shadow-md ${
                  index === 0 ? 'bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/10 dark:to-green-900/10 border-l-4 border-l-blue-500' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-lg shadow-sm">
                    {loan.logo}
                  </div>
                  <span className="font-medium">{loan.bankName}</span>
                </div>
                <div>{loan.minimumIncome}</div>
                <div>{loan.minimumCreditScore}+</div>
                <div className="font-medium text-blue-600 dark:text-blue-400">{loan.financing}</div>
                <div>{loan.loanAmount}</div>
                <div className="font-semibold text-green-600 dark:text-green-400">
                  {loan.interestRate}
                </div>
                <div>{loan.term}</div>
                <div>{loan.processingTime}</div>
                <div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs border-blue-200 text-blue-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:shadow-lg transition-all duration-300 dark:border-blue-600 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white"
                    onClick={() => onDetailsClick(loan)}
                  >
                    Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4 p-4">
        {loans.map((loan, index) => (
          <Card 
            key={loan.id}
            className={`transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${
              index === 0 ? 'ring-2 ring-blue-500 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/10 dark:to-green-900/10' : 'hover:ring-2 hover:ring-blue-200'
            }`}
          >
            <CardContent className="p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-xl shadow-md">
                    {loan.logo}
                  </div>
                  <div>
                    <div className="font-medium">{loan.bankName}</div>
                    {index === 0 && (
                      <Badge variant="secondary" className="text-xs mt-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                        Recommended
                      </Badge>
                    )}
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-blue-200 text-blue-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:shadow-lg transition-all duration-300 dark:border-blue-600 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white"
                  onClick={() => onDetailsClick(loan)}
                >
                  Details
                </Button>
              </div>

              {/* Key Info */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Interest Rate</div>
                  <div className="font-semibold text-green-600 dark:text-green-400">
                    {loan.interestRate}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Loan Amount</div>
                  <div className="text-sm">{loan.loanAmount}</div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Credit Score</div>
                  <div>{loan.minimumCreditScore}+</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Processing</div>
                  <div>{loan.processingTime}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Min Income</div>
                  <div>{loan.minimumIncome}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Term</div>
                  <div>{loan.term}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results Message */}
      {loans.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">No loans found for this category</div>
          <p className="text-sm text-muted-foreground">Try selecting a different loan type or check back later for more options.</p>
        </div>
      )}
    </div>
  );
}