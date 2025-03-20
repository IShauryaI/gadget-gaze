
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContentTab from './ContentTab';
import TextAnalysisTab from './TextAnalysisTab';
import SpellingTab from './SpellingTab';
import SuggestionsTab from './SuggestionsTab';
import FrequenciesTab from './FrequenciesTab';

interface CrawlData {
  title: string;
  content: string;
  analysis: {
    phoneNumbers: string[];
    emailAddresses: string[];
    urls: string[];
  };
  spellingCorrections: {
    original: string;
    suggested: string;
  }[];
  searchSuggestions: string[];
  wordFrequencies: {
    [word: string]: number;
  };
}

interface ResultTabsProps {
  data: CrawlData;
}

const ResultTabs: React.FC<ResultTabsProps> = ({ data }) => {
  return (
    <Tabs defaultValue="content" className="w-full">
      <TabsList className="grid grid-cols-5 mb-4">
        <TabsTrigger value="content">Content</TabsTrigger>
        <TabsTrigger value="text-analysis">Text Analysis</TabsTrigger>
        <TabsTrigger value="spelling">Spell Check</TabsTrigger>
        <TabsTrigger value="suggestions">Word Completion</TabsTrigger>
        <TabsTrigger value="frequencies">Word Frequencies</TabsTrigger>
      </TabsList>
      
      <TabsContent value="content">
        <ContentTab title={data.title} content={data.content} />
      </TabsContent>
      
      <TabsContent value="text-analysis">
        <TextAnalysisTab analysis={data.analysis} />
      </TabsContent>
      
      <TabsContent value="spelling">
        <SpellingTab corrections={data.spellingCorrections} />
      </TabsContent>
      
      <TabsContent value="suggestions">
        <SuggestionsTab suggestions={data.searchSuggestions} />
      </TabsContent>
      
      <TabsContent value="frequencies">
        <FrequenciesTab wordFrequencies={data.wordFrequencies} />
      </TabsContent>
    </Tabs>
  );
};

export default ResultTabs;
