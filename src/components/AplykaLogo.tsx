import { cn } from "@/lib/utils";
import { Check } from "lucide-react";


interface AplykaLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showIcon?: boolean;
  variant?: "full" | "icon" | "text";
}

const sizeClasses = {
  sm: {
    container: "h-6",
    icon: "w-4 h-4",
    text: "text-lg"
  },
  md: {
    container: "h-8",
    icon: "w-5 h-5",
    text: "text-xl"
  },
  lg: {
    container: "h-10",
    icon: "w-6 h-6",
    text: "text-2xl"
  },
  xl: {
    container: "h-12",
    icon: "w-8 h-8",
    text: "text-3xl"
  }
};

export function AplykaLogo({ 
  className, 
  size = "md", 
  showIcon = true, 
  variant = "full" 
}: AplykaLogoProps) {
  const sizes = sizeClasses[size];

  if (variant === "icon") {
    return (
      <div className={cn(
        "rounded-full bg-aplyka-azure flex items-center justify-center",
        sizes.container,
        "aspect-square",
        className
      )}>
        <Check className={cn(sizes.icon, "text-white")} />
      </div>
    );
  }

  if (variant === "text") {
    return (
      <span className={cn(
        "font-bold text-aplyka-dark-gray",
        sizes.text,
        className
      )}>
        aplyka
      </span>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {showIcon && (
        <div className={cn(
          "rounded-full bg-aplyka-azure flex items-center justify-center",
          sizes.container,
          "aspect-square"
        )}>
          <Check className={cn(sizes.icon, "text-white")} />
        </div>
      )}
      <span className={cn(
        "font-bold text-aplyka-dark-gray dark:text-aplyka-light-gray",
        sizes.text
      )}>
        aplyka
      </span>
    </div>
  );
}