
import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { getAutocompleteSuggestions, checkSpelling } from '@/utils/searchUtils';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  fullWidth?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  className = '', 
  placeholder = 'Search phones, brands, or features...', 
  fullWidth = false 
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [spellcheckSuggestion, setSpellcheckSuggestion] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length >= 2) {
      const results = getAutocompleteSuggestions(query);
      setSuggestions(results);
      
      // Check spelling if no suggestions found
      if (results.length === 0) {
        const { isCorrect, suggestion } = checkSpelling(query);
        setSpellcheckSuggestion(isCorrect ? null : suggestion);
      } else {
        setSpellcheckSuggestion(null);
      }
    } else {
      setSuggestions([]);
      setSpellcheckSuggestion(null);
    }
  }, [query]);

  useEffect(() => {
    // Handle clicks outside of the component to close suggestions
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current && 
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (searchQuery: string = query) => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsFocused(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  const handleCorrectionClick = () => {
    if (spellcheckSuggestion) {
      setQuery(spellcheckSuggestion);
      handleSearch(spellcheckSuggestion);
    }
  };

  return (
    <div className={`relative ${fullWidth ? 'w-full' : 'max-w-md'} ${className}`}>
      <div className={`relative flex items-center transition-all duration-300 ${
        isFocused ? 'ring-2 ring-primary/70 shadow-sm' : ''
      }`}>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full py-3 px-4 pr-10 rounded-lg border border-border bg-background focus:outline-none transition-all"
        />
        <button 
          onClick={() => handleSearch()}
          className="absolute right-3 text-muted-foreground hover:text-primary transition-colors"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>
      </div>
      
      {isFocused && (suggestions.length > 0 || spellcheckSuggestion) && (
        <div 
          ref={suggestionsRef}
          className="absolute z-10 mt-1 w-full bg-card shadow-lg rounded-lg border border-border overflow-hidden animate-slide-down"
        >
          {spellcheckSuggestion && (
            <div className="p-3 border-b border-border">
              <p className="text-sm text-muted-foreground">
                Did you mean: <button 
                  onClick={handleCorrectionClick}
                  className="text-primary font-medium hover:underline"
                >
                  {spellcheckSuggestion}
                </button>?
              </p>
            </div>
          )}
          
          {suggestions.map((suggestion, index) => (
            <div 
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="p-3 hover:bg-muted cursor-pointer transition-colors border-b border-border last:border-0"
            >
              <p className="text-sm">{suggestion}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
