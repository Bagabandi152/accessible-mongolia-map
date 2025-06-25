
import { Button } from "@/components/ui/button";
import { Menu, X, Plus } from "lucide-react";
import { useState } from "react";

interface NavigationHeaderProps {
  onReportClick?: () => void;
}

const NavigationHeader = ({ onReportClick }: NavigationHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false); // Close mobile menu after clicking
  };

  const handleReportClick = () => {
    // Just scroll to the report section, don't automatically open form
    scrollToSection('report-section');
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs sm:text-sm">ID</span>
            </div>
            <span className="text-lg sm:text-xl font-bold text-gray-900 truncate">inclusivedata.mn</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => scrollToSection('features')} 
              className="text-gray-600 hover:text-green-600 transition-colors cursor-pointer whitespace-nowrap"
            >
              Онцлог
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')} 
              className="text-gray-600 hover:text-green-600 transition-colors cursor-pointer whitespace-nowrap"
            >
              Хэрхэн ажилладаг
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-gray-600 hover:text-green-600 transition-colors cursor-pointer whitespace-nowrap"
            >
              Тухай
            </button>
            <Button 
              onClick={handleReportClick}
              className="bg-yellow-500 hover:bg-yellow-600 text-white whitespace-nowrap"
              size="sm"
            >
              <Plus className="mr-1 h-4 w-4" />
              Мэдээлэх хэсэг рүү
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col space-y-3">
              <button 
                onClick={() => scrollToSection('features')} 
                className="text-gray-600 hover:text-green-600 transition-colors cursor-pointer text-left py-2"
              >
                Онцлог
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')} 
                className="text-gray-600 hover:text-green-600 transition-colors cursor-pointer text-left py-2"
              >
                Хэрхэн ажилладаг
              </button>
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-gray-600 hover:text-green-600 transition-colors cursor-pointer text-left py-2"
              >
                Тухай
              </button>
              <div className="pt-2">
                <Button 
                  onClick={handleReportClick}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white w-full"
                  size="sm"
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Мэдээлэх хэсэг рүү
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavigationHeader;
