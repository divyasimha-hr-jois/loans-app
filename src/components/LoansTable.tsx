import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface LoanData {
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
}

const loanData: LoanData[] = [
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
    processingTime: "24-48 hrs"
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
    processingTime: "1-2 days"
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
    processingTime: "10-24 hrs"
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
    processingTime: "2-4 days"
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
    processingTime: "1-2 days"
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
    processingTime: "24-72 hrs"
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
    processingTime: "2-5 days"
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
    processingTime: "1-4 days"
  }
];

export function LoansTable() {
  return (
    <div>
      {/* Desktop/Tablet Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <div className="min-w-full">
          {/* Table Header */}
          <div className="grid grid-cols-9 gap-4 p-4 border-b border-border bg-muted/30 rounded-t-lg text-sm text-muted-foreground">
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
            {loanData.map((loan, index) => (
              <div
                key={loan.id}
                className={`grid grid-cols-9 gap-4 p-4 items-center text-sm border-b border-border hover:bg-accent/50 transition-colors ${
                  index === 0 ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-lg">
                    {loan.logo}
                  </div>
                  <span className="font-medium">{loan.bankName}</span>
                </div>
                <div>{loan.minimumIncome}</div>
                <div>{loan.minimumCreditScore}+</div>
                <div>{loan.financing}</div>
                <div>{loan.loanAmount}</div>
                <div className="font-medium text-green-600 dark:text-green-400">
                  {loan.interestRate}
                </div>
                <div>{loan.term}</div>
                <div>{loan.processingTime}</div>
                <div>
                  <Button variant="outline" size="sm" className="text-xs">
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
        {loanData.map((loan, index) => (
          <Card 
            key={loan.id}
            className={`${index === 0 ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/10' : ''}`}
          >
            <CardContent className="p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xl">
                    {loan.logo}
                  </div>
                  <div>
                    <div className="font-medium">{loan.bankName}</div>
                    {index === 0 && (
                      <Badge variant="secondary" className="text-xs mt-1">
                        Recommended
                      </Badge>
                    )}
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Details
                </Button>
              </div>

              {/* Key Info */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Interest Rate</div>
                  <div className="font-medium text-green-600 dark:text-green-400">
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
    </div>
  );
}