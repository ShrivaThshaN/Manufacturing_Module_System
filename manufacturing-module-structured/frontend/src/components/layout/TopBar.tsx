import { Link, useLocation } from "react-router-dom";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const TopBar = () => {
  const location = useLocation();
  
  // Map routes to page titles
  const getPageTitle = (pathname: string) => {
    switch (pathname) {
      case "/":
        return "Dashboard";
      case "/production":
        return "Production";
      case "/production/mps":
        return "Master Production Schedule";
      case "/production/mrp":
        return "Material Requirement Planning";
      case "/procurement":
        return "Procurement";
      case "/order-management":
        return "Order Management";
      case "/inventory":
        return "Inventory";
      case "/logistics":
        return "Logistics";
      case "/quality":
        return "Quality";
      default:
        return "Dashboard";
    }
  };

  const pageTitle = getPageTitle(location.pathname);

  return (
    <header className="h-16 bg-card border-b border-border px-6 flex items-center justify-between shadow-soft">
      <div>
        <Link 
          to="/" 
          className="text-2xl font-bold text-foreground hover:text-primary transition-colors duration-200"
        >
          {pageTitle}
        </Link>
      </div>
      
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="w-10 h-10 rounded-full hover:bg-muted"
            >
              <User className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>
              <User className="w-4 h-4 mr-2" />
              View Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Help
            </DropdownMenuItem>
            <DropdownMenuItem>
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};