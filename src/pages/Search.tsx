
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SearchBar from '@/components/ui/SearchBar';
import PhoneCard from '@/components/ui/PhoneCard';
import { phones, Phone, getPhonesByBrand, getPhonesByFeature, getTrendingPhones } from '@/utils/mockData';
import { searchPhones, checkSpelling } from '@/utils/searchUtils';
import { Filter, SlidersHorizontal, LayoutGrid, List, AlertCircle } from 'lucide-react';

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const brandFilter = searchParams.get('brand') || '';
  const featureFilter = searchParams.get('feature') || '';
  const filterType = searchParams.get('filter') || '';
  
  const [results, setResults] = useState<Phone[]>([]);
  const [spellingSuggestion, setSpellingSuggestion] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Fetch search results based on query params
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      let searchResults: Phone[] = [];
      
      if (query) {
        searchResults = searchPhones(query);
        
        // If no results, check for spelling errors
        if (searchResults.length === 0) {
          const { suggestion } = checkSpelling(query);
          setSpellingSuggestion(suggestion);
        } else {
          setSpellingSuggestion(null);
        }
      } else if (brandFilter) {
        searchResults = getPhonesByBrand(brandFilter);
      } else if (featureFilter) {
        searchResults = getPhonesByFeature(featureFilter);
      } else if (filterType === 'trending') {
        searchResults = getTrendingPhones();
      } else {
        // Default to all phones if no filters or query
        searchResults = [...phones];
      }
      
      // Filter results based on active filters
      if (activeFilters.length > 0) {
        searchResults = searchResults.filter(phone => {
          return activeFilters.every(filter => {
            switch (filter) {
              case '5g':
                return phone.specs.features.some(f => f.toLowerCase().includes('5g'));
              case 'fast-charging':
                return phone.specs.features.some(f => f.toLowerCase().includes('charging'));
              case 'high-refresh':
                return phone.specs.display.toLowerCase().includes('120hz');
              case 'wireless-charging':
                return phone.specs.features.some(f => f.toLowerCase().includes('wireless'));
              case 'price-low':
                return phone.price < 700;
              case 'price-mid':
                return phone.price >= 700 && phone.price < 1000;
              case 'price-high':
                return phone.price >= 1000;
              default:
                return true;
            }
          });
        });
      }
      
      setResults(searchResults);
      setIsLoading(false);
    }, 500); // Simulate loading
  }, [query, brandFilter, featureFilter, filterType, activeFilters]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter) 
        : [...prev, filter]
    );
  };

  // Generate title based on search context
  const getPageTitle = (): string => {
    if (query) return `Search results for "${query}"`;
    if (brandFilter) return `${brandFilter} Smartphones`;
    if (featureFilter) return `Smartphones with ${featureFilter}`;
    if (filterType === 'trending') return 'Trending Smartphones';
    return 'Browse Smartphones';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{getPageTitle()}</h1>
            <SearchBar fullWidth placeholder="Refine your search..." />
          </div>
          
          {/* Spelling suggestion */}
          {spellingSuggestion && (
            <div className="max-w-4xl mx-auto mb-8 p-4 bg-muted/50 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p>
                  No results found for <span className="font-medium">"{query}"</span>.
                  Did you mean <a href={`/search?q=${spellingSuggestion}`} className="text-primary font-medium hover:underline">
                    "{spellingSuggestion}"
                  </a>?
                </p>
              </div>
            </div>
          )}
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters sidebar */}
            <div className="lg:w-64 shrink-0">
              <div className="sticky top-24 bg-card rounded-lg border border-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <Filter className="w-5 h-5 mr-2" />
                    <h2 className="font-medium">Filters</h2>
                  </div>
                  <button 
                    onClick={() => setActiveFilters([])}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Reset
                  </button>
                </div>
                
                {/* Filter groups */}
                <div className="space-y-6">
                  {/* Price range */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Price Range</h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="rounded text-primary focus:ring-primary"
                          checked={activeFilters.includes('price-low')}
                          onChange={() => toggleFilter('price-low')}
                        />
                        <span className="text-sm ml-2">Under $700</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="rounded text-primary focus:ring-primary"
                          checked={activeFilters.includes('price-mid')}
                          onChange={() => toggleFilter('price-mid')}
                        />
                        <span className="text-sm ml-2">$700 - $999</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="rounded text-primary focus:ring-primary"
                          checked={activeFilters.includes('price-high')}
                          onChange={() => toggleFilter('price-high')}
                        />
                        <span className="text-sm ml-2">$1000+</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Features */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Features</h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="rounded text-primary focus:ring-primary"
                          checked={activeFilters.includes('5g')}
                          onChange={() => toggleFilter('5g')}
                        />
                        <span className="text-sm ml-2">5G Connectivity</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="rounded text-primary focus:ring-primary"
                          checked={activeFilters.includes('fast-charging')}
                          onChange={() => toggleFilter('fast-charging')}
                        />
                        <span className="text-sm ml-2">Fast Charging</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="rounded text-primary focus:ring-primary"
                          checked={activeFilters.includes('high-refresh')}
                          onChange={() => toggleFilter('high-refresh')}
                        />
                        <span className="text-sm ml-2">High Refresh Rate</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="rounded text-primary focus:ring-primary"
                          checked={activeFilters.includes('wireless-charging')}
                          onChange={() => toggleFilter('wireless-charging')}
                        />
                        <span className="text-sm ml-2">Wireless Charging</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Results */}
            <div className="flex-grow">
              <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-muted-foreground">
                  {isLoading ? 'Searching...' : `${results.length} results found`}
                </p>
                
                <div className="flex items-center space-x-2">
                  <div className="flex items-center bg-muted rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-card shadow-sm' : 'text-muted-foreground'}`}
                      aria-label="Grid view"
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-card shadow-sm' : 'text-muted-foreground'}`}
                      aria-label="List view"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <select className="p-2 text-sm border border-border rounded-lg bg-card">
                    <option value="relevance">Sort by Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest First</option>
                  </select>
                </div>
              </div>
              
              {/* Active filters */}
              {activeFilters.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {activeFilters.map(filter => (
                    <div 
                      key={filter}
                      className="bg-muted px-3 py-1 rounded-full text-xs flex items-center"
                    >
                      <span>
                        {filter === 'price-low' && 'Under $700'}
                        {filter === 'price-mid' && '$700 - $999'}
                        {filter === 'price-high' && '$1000+'}
                        {filter === '5g' && '5G Connectivity'}
                        {filter === 'fast-charging' && 'Fast Charging'}
                        {filter === 'high-refresh' && 'High Refresh Rate'}
                        {filter === 'wireless-charging' && 'Wireless Charging'}
                      </span>
                      <button 
                        onClick={() => toggleFilter(filter)}
                        className="ml-2 text-muted-foreground hover:text-foreground"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button 
                    onClick={() => setActiveFilters([])}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Clear all
                  </button>
                </div>
              )}
              
              {/* Results grid/list */}
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((_, index) => (
                    <div key={index} className="bg-muted/30 rounded-lg h-96 shimmer"></div>
                  ))}
                </div>
              ) : results.length > 0 ? (
                viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.map((phone, index) => (
                      <div 
                        key={phone.id} 
                        className="animate-fade-in"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <PhoneCard phone={phone} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {results.map((phone, index) => (
                      <div 
                        key={phone.id} 
                        className="border border-border rounded-lg p-4 flex gap-4 animate-fade-in"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <img 
                          src={phone.image} 
                          alt={`${phone.brand} ${phone.model}`}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">{phone.brand}</p>
                              <h3 className="font-medium">{phone.model}</h3>
                            </div>
                            <p className="text-lg font-semibold">${phone.price}</p>
                          </div>
                          <div className="mt-2 text-sm text-muted-foreground">
                            <p>{phone.specs.processor} • {phone.specs.ram} • {phone.specs.battery}</p>
                            <p>{phone.specs.display}</p>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {phone.specs.features.slice(0, 3).map((feature, index) => (
                              <span key={index} className="text-xs bg-secondary py-1 px-2 rounded-full">
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : !isLoading && !spellingSuggestion ? (
                <div className="text-center py-10 border border-dashed border-border rounded-lg">
                  <SlidersHorizontal className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">No results found</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Try adjusting your search or filter criteria to find smartphones that match your preferences.
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Search;
