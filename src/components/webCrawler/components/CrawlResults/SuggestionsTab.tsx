
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface SuggestionsTabProps {
  suggestions: string[];
}

const SuggestionsTab: React.FC<SuggestionsTabProps> = ({ suggestions }) => {
  return (
    <div className="space-y-4">
      <h4 className="font-medium">Word Completion (WordCompletion):</h4>
      <div className="bg-muted/20 p-3 rounded-md">
        <p className="mb-2">Suggestions for prefix "ph":</p>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion: string, i: number) => (
            <Badge key={i} variant="outline">{suggestion}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuggestionsTab;
