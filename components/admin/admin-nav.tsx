"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  BarChart3, 
  Settings,
  Music,
  Gem,
  ShoppingBag,
  FileText,
  Shield
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const adminNavItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    description: "Overview and quick actions"
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
    description: "Manage all products",
    subItems: [
      { title: "All Products", href: "/admin/products", icon: Package },
      { title: "Beats", href: "/admin/products/beats", icon: Music },
      { title: "NFTs", href: "/admin/products/nfts", icon: Gem },
      { title: "Merchandise", href: "/admin/products/merchandise", icon: ShoppingBag },
    ]
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
    description: "User management",
    subItems: [
      { title: "All Users", href: "/admin/users", icon: Users },
      { title: "Admins", href: "/admin/users/admins", icon: Shield },
    ]
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
    description: "Platform analytics"
  },
  {
    title: "Reports",
    href: "/admin/reports",
    icon: FileText,
    description: "Generate reports"
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
    description: "Platform settings"
  },
];

interface AdminNavProps {
  className?: string;
}

export function AdminNav({ className }: AdminNavProps) {
  const pathname = usePathname();

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Admin Navigation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {adminNavItems.map((item) => {
          const isActive = pathname === item.href || 
                          (item.subItems && item.subItems.some(sub => pathname === sub.href));
          
          return (
            <div key={item.href}>
              <Link href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className="w-full justify-start"
                  size="sm"
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.title}
                  {item.title === "Products" && (
                    <Badge variant="secondary" className="ml-auto">
                      3
                    </Badge>
                  )}
                </Button>
              </Link>
              
              {/* Sub-items */}
              {item.subItems && isActive && (
                <div className="ml-6 mt-2 space-y-1">
                  {item.subItems.map((subItem) => (
                    <Link key={subItem.href} href={subItem.href}>
                      <Button
                        variant={pathname === subItem.href ? "secondary" : "ghost"}
                        className="w-full justify-start"
                        size="sm"
                      >
                        <subItem.icon className="h-3 w-3 mr-2" />
                        {subItem.title}
                      </Button>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

interface AdminBreadcrumbProps {
  items: Array<{
    title: string;
    href?: string;
  }>;
}

export function AdminBreadcrumb({ items }: AdminBreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
      <Link href="/admin" className="hover:text-foreground">
        Admin
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <span>/</span>
          {item.href ? (
            <Link href={item.href} className="hover:text-foreground">
              {item.title}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.title}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
