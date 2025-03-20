
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Moon, Sun, ChevronDown } from 'lucide-react';
import SearchBar from '@/components/ui/SearchBar';

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className = '' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchVisible(false);
  }, [location.pathname]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Compare', path: '/compare' },
    { label: 'Trending', path: '/search?filter=trending' },
    {
      label: 'Brands',
      path: '#',
      dropdown: [
        { label: 'Apple', path: '/search?brand=apple' },
        { label: 'Samsung', path: '/search?brand=samsung' },
        { label: 'Google', path: '/search?brand=google' },
        { label: 'OnePlus', path: '/search?brand=oneplus' },
        { label: 'Xiaomi', path: '/search?brand=xiaomi' }
      ]
    }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 bg-background/80 backdrop-blur-md shadow-sm' : 'py-4 bg-transparent'
      } ${className}`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center z-10">
          <span className="font-bold text-xl tracking-tight transition-all duration-300">
            Gadget<span className="text-primary">Gaze</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => 
            link.dropdown ? (
              <div key={index} className="relative group">
                <button className="flex items-center text-sm font-medium hover:text-primary transition-colors">
                  {link.label}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute left-0 mt-2 w-48 origin-top-left rounded-md bg-card shadow-lg border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                  <div className="py-1 rounded-md">
                    {link.dropdown.map((dropdownItem, dropdownIndex) => (
                      <Link
                        key={dropdownIndex}
                        to={dropdownItem.path}
                        className="block px-4 py-2 text-sm hover:bg-muted transition-colors"
                      >
                        {dropdownItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link 
                key={index} 
                to={link.path}
                className={`text-sm font-medium hover:text-primary transition-colors ${
                  location.pathname === link.path ? 'text-primary' : ''
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4 z-10">
          {/* Search toggle (mobile) */}
          <button 
            className="md:hidden"
            onClick={() => setSearchVisible(!searchVisible)}
            aria-label="Toggle search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Desktop search */}
          <div className="hidden md:block">
            <SearchBar />
          </div>

          {/* Dark mode toggle */}
          <button 
            onClick={toggleDarkMode}
            className="rounded-full p-2 text-foreground hover:bg-muted transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile search bar */}
      {searchVisible && (
        <div className="md:hidden py-3 px-4 border-b border-border animate-slide-down bg-background">
          <SearchBar fullWidth />
        </div>
      )}

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[57px] bg-background z-40 animate-fade-in">
          <nav className="container mx-auto px-4 py-8 flex flex-col space-y-4">
            {navLinks.map((link, index) => 
              link.dropdown ? (
                <div key={index} className="space-y-3">
                  <div className="font-medium">{link.label}</div>
                  <div className="ml-4 flex flex-col space-y-3">
                    {link.dropdown.map((dropdownItem, dropdownIndex) => (
                      <Link
                        key={dropdownIndex}
                        to={dropdownItem.path}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {dropdownItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link 
                  key={index} 
                  to={link.path}
                  className={`font-medium hover:text-primary transition-colors ${
                    location.pathname === link.path ? 'text-primary' : ''
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
