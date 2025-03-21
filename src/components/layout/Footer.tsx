
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail, MapPin, Phone, Code } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-muted/30 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-bold text-xl tracking-tight">
                Gadget<span className="text-primary">Gaze</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              GadgetGaze provides comprehensive smartphone information with the latest specs, prices, and reviews to help you make informed decisions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="GitHub">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/compare" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Compare Phones
                </Link>
              </li>
              <li>
                <Link to="/search?filter=trending" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Trending Phones
                </Link>
              </li>
              <li>
                <Link to="/search?filter=newest" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Latest Releases
                </Link>
              </li>
              <li>
                <Link to="/search?filter=popular" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Most Popular
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Brands */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Popular Brands</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/search?brand=apple" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Apple
                </Link>
              </li>
              <li>
                <Link to="/search?brand=samsung" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Samsung
                </Link>
              </li>
              <li>
                <Link to="/search?brand=google" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Google
                </Link>
              </li>
              <li>
                <Link to="/search?brand=xiaomi" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Xiaomi
                </Link>
              </li>
              <li>
                <Link to="/search?brand=oneplus" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  OnePlus
                </Link>
              </li>
            </ul>
          </div>

          {/* Data Analysis Tools */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Our Toolbox</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Code className="w-5 h-5 text-muted-foreground mr-3 mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  WebCrawler(Shaurya) - Data Collection
                </span>
              </li>
              <li className="flex items-start">
                <Code className="w-5 h-5 text-muted-foreground mr-3 mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  HTMLParser(Shaurya) - Raw Data Processing
                </span>
              </li>
              <li className="flex items-start">
                <Code className="w-5 h-5 text-muted-foreground mr-3 mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  TextAnalyser(Shaurya) - Content Analysis
                </span>
              </li>
              <li className="flex items-start">
                <Code className="w-5 h-5 text-muted-foreground mr-3 mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  SpellChecker(Aiswariya) - Data Accuracy
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Additional Tools Section */}
        <div className="mt-8 pt-6 border-t border-border">
          <h3 className="font-semibold text-lg mb-4">Advanced Data Tools</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium text-sm mb-2">WordCompletion(Shrinicketh)</h4>
              <p className="text-xs text-muted-foreground">Prefix Tree implementation for intelligent word suggestions and auto-complete functionality.</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium text-sm mb-2">FrequencyCount(Tanjina)</h4>
              <p className="text-xs text-muted-foreground">Boyer-Moore algorithm implementation for efficient pattern matching and frequency analysis.</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium text-sm mb-2">SearchFrequency(Shaurya)</h4>
              <p className="text-xs text-muted-foreground">Knuth-Morris-Pratt implementation for tracking and analyzing search patterns.</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} GadgetGaze. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
