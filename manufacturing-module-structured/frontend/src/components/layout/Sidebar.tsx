import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Factory, 
  ShoppingCart, 
  ClipboardList, 
  Package, 
  Truck, 
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Calendar,
  Cog
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { 
    name: "Production", 
    href: "/production", 
    icon: Factory,
    subItems: [
      { name: "Master Production Schedule", href: "/production/mps", icon: Calendar },
      { name: "Material Requirement Planning", href: "/production/mrp", icon: Cog }
    ]
  },
  { name: "Procurement", href: "/procurement", icon: ShoppingCart },
  { name: "Order Management", href: "/order-management", icon: ClipboardList },
  { name: "Inventory", href: "/inventory", icon: Package },
  { name: "Logistics", href: "/logistics", icon: Truck },
  { name: "Quality", href: "/quality", icon: CheckCircle },
];

export const Sidebar = () => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const location = useLocation();

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    );
  };

  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  const isSubItemActive = (href: string) => {
    return location.pathname === href;
  };

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border">
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
            <Factory className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-sidebar-foreground">ERP</span>
        </div>
      </div>
      
      <nav className="mt-8 px-3">
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item.name}>
              {item.subItems ? (
                <div>
                  <button
                    onClick={() => toggleExpanded(item.name)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-3 text-sm font-medium rounded-lg transition-colors duration-200",
                      isActive(item.href)
                        ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-soft"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <div className="flex items-center">
                      <item.icon className="w-5 h-5 mr-3" />
                      {item.name}
                    </div>
                    {expandedItems.includes(item.name) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  
                  {expandedItems.includes(item.name) && (
                    <ul className="mt-2 ml-4 space-y-1">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.name}>
                          <NavLink
                            to={subItem.href}
                            className={cn(
                              "flex items-center px-3 py-2 text-sm rounded-lg transition-colors duration-200",
                              isSubItemActive(subItem.href)
                                ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                                : "text-sidebar-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                            )}
                          >
                            <subItem.icon className="w-4 h-4 mr-3" />
                            {subItem.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <NavLink
                  to={item.href}
                  end={item.href === "/"}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors duration-200",
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-soft"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )
                  }
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};