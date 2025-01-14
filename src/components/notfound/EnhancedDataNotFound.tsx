import { FileQuestion, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EnhancedDataNotFoundProps {
  message?: string;
  onRefresh?: () => void;
}

export default function EnhancedDataNotFound({
  message = "No data found",
  onRefresh,
}: EnhancedDataNotFoundProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="relative">
        <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-blue-500 to-teal-500 opacity-50 blur-xl"></div>
        <div className="relative rounded-full bg-card p-6 shadow-xl">
          <FileQuestion className="h-16 w-16 text-primary" />
        </div>
      </div>
      <h2 className="mb-2 mt-8 text-3xl font-bold text-foreground">
        {message}
      </h2>
      <p className="mb-8 max-w-md text-muted-foreground">
        We couldn't find the data you're looking for. Don't worry, it happens to
        the best of us!
      </p>
      {onRefresh && (
        <Button
          onClick={onRefresh}
          className="group transition-all duration-300 ease-in-out"
        >
          <RefreshCw className="mr-2 h-4 w-4 transition-transform duration-300 ease-in-out group-hover:rotate-180" />
          Refresh Data
        </Button>
      )}
      <div className="mt-12 animate-bounce space-y-2">
        <div className="mx-auto h-1 w-1 rounded-full bg-primary"></div>
        <div className="mx-auto h-1 w-1 rounded-full bg-primary"></div>
        <div className="mx-auto h-1 w-1 rounded-full bg-primary"></div>
      </div>
    </div>
  );
}
