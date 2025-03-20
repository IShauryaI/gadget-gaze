
import React from 'react';
import { Input } from "@/components/ui/input";

interface UrlInputProps {
  url: string;
  setUrl: (value: string) => void;
}

const UrlInput: React.FC<UrlInputProps> = ({ url, setUrl }) => {
  return (
    <div>
      <label htmlFor="url" className="block text-sm font-medium mb-2">
        Website URL
      </label>
      <Input
        id="url"
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://example.com"
        required
        className="w-full"
      />
    </div>
  );
};

export default UrlInput;
