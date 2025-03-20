
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

interface TextAnalysis {
  phoneNumbers: string[];
  emailAddresses: string[];
  urls: string[];
}

interface TextAnalysisTabProps {
  analysis: TextAnalysis;
}

const TextAnalysisTab: React.FC<TextAnalysisTabProps> = ({ analysis }) => {
  return (
    <div className="space-y-4">
      <h4 className="font-medium">Text Analysis (TextAnalyser):</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="py-2">
            <CardTitle className="text-sm">Phone Numbers</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 text-sm">
              {analysis.phoneNumbers.map((phone: string, i: number) => (
                <li key={i}>{phone}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-2">
            <CardTitle className="text-sm">Email Addresses</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 text-sm">
              {analysis.emailAddresses.map((email: string, i: number) => (
                <li key={i}>{email}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-2">
            <CardTitle className="text-sm">URLs</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 text-sm">
              {analysis.urls.map((url: string, i: number) => (
                <li key={i} className="break-all">{url}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TextAnalysisTab;
