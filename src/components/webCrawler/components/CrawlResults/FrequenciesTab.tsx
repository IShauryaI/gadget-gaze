
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface FrequenciesTabProps {
  wordFrequencies: {
    [word: string]: number;
  };
}

const FrequenciesTab: React.FC<FrequenciesTabProps> = ({ wordFrequencies }) => {
  return (
    <div className="space-y-4">
      <h4 className="font-medium">Word Frequencies (FrequencyCount):</h4>
      <div className="bg-muted/20 p-3 rounded-md max-h-80 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Word</TableHead>
              <TableHead>Frequency</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(wordFrequencies)
              .sort(([, a]: [string, any], [, b]: [string, any]) => b - a)
              .map(([word, count]: [string, any], i: number) => (
                <TableRow key={i}>
                  <TableCell>{word}</TableCell>
                  <TableCell>{count}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FrequenciesTab;
