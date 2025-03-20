
import React from 'react';
import { Input } from "@/components/ui/input";

interface ApiKeyInputProps {
  apiKey: string;
  setApiKey: (value: string) => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ apiKey, setApiKey }) => {
  return (
    <div>
      <label htmlFor="apiKey" className="block text-sm font-medium mb-2">
        API Key
      </label>
      <Input
        id="apiKey"
        type="password"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        placeholder="Enter your API key"
        className="w-full"
      />
      <p className="text-xs text-muted-foreground mt-1">
        Your API key is stored locally and never sent to our servers
      </p>
    </div>
  );
};

export default ApiKeyInput;
