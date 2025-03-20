
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface ResultHeaderProps {
  status: string;
  completed: number;
  total: number;
  creditsUsed: number;
}

const ResultHeader: React.FC<ResultHeaderProps> = ({ status, completed, total, creditsUsed }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Crawl Results</h3>
        <Badge variant="secondary">
          Status: {status}
        </Badge>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="bg-muted/30 p-2 rounded">
          <span className="text-muted-foreground">Pages Crawled:</span>{" "}
          <span className="font-medium">{completed} / {total}</span>
        </div>
        <div className="bg-muted/30 p-2 rounded">
          <span className="text-muted-foreground">Credits Used:</span>{" "}
          <span className="font-medium">{creditsUsed}</span>
        </div>
      </div>
    </>
  );
};

export default ResultHeader;
