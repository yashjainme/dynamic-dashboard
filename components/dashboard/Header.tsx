import { Button } from '@/components/ui/button';
import { Calendar, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Header = ({ isDarkMode, toggleTheme }: HeaderProps) => {
  return (
    <div className="border-b bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Side: Logo and Title */}
          <div className="flex items-center space-x-2 sm:space-x-4 overflow-hidden">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-primary-foreground font-bold text-sm">AD</span>
            </div>
            <div className="overflow-hidden">
              <h1 className="text-lg sm:text-xl font-bold truncate">ADmyBRAND Insights</h1>
              <p className="hidden sm:block text-sm text-muted-foreground">Digital Marketing Analytics</p>
            </div>
          </div>

          {/* Right Side: Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button variant="outline" size="sm" className="p-2 sm:px-3">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline sm:ml-2">Last 30 days</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9 flex-shrink-0"
            >
              <span className="sr-only">Toggle theme</span>
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;