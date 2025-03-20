
import React from 'react';

interface ContentTabProps {
  title: string;
  content: string;
}

const ContentTab: React.FC<ContentTabProps> = ({ title, content }) => {
  return (
    <div className="space-y-4">
      <h4 className="font-medium">Content Preview:</h4>
      <div className="bg-muted/20 p-3 rounded-md max-h-80 overflow-auto">
        <h5 className="font-medium">{title}</h5>
        <div className="mt-2 prose prose-sm max-w-none">
          {/* Use dangerouslySetInnerHTML only for displaying parsed content from a trusted source */}
          <div dangerouslySetInnerHTML={{ __html: 
            content
              .split('\n')
              .map(line => line.trim())
              .filter(line => line.length > 0)
              .map(line => `<p>${line}</p>`)
              .join('')
          }} />
        </div>
      </div>
    </div>
  );
};

export default ContentTab;
