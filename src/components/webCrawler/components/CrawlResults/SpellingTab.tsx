
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface SpellCorrection {
  original: string;
  suggested: string;
}

interface SpellingTabProps {
  corrections: SpellCorrection[];
}

const SpellingTab: React.FC<SpellingTabProps> = ({ corrections }) => {
  return (
    <div className="space-y-4">
      <h4 className="font-medium">Spell Checking (SpellChecker):</h4>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Original</TableHead>
            <TableHead>Suggested</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {corrections.map((correction: SpellCorrection, i: number) => (
            <TableRow key={i}>
              <TableCell className="font-mono">{correction.original}</TableCell>
              <TableCell className="font-mono">{correction.suggested}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SpellingTab;
