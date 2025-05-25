"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Package,
  Music,
  Gem,
  ShoppingBag,
  BarChart3,
  Settings,
  Plus,
  TrendingUp,
  DollarSign
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";

interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalBeats: number;
  totalNFTs: number;
  totalMerch: number;
  totalRevenue: number;
  recentOrders: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalProducts: 0,
    totalBeats: 0,
    totalNFTs: 0,
    totalMerch: 0,
    totalRevenue: 0,
    recentOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch user count
        const { count: userCount } = await supabase
          .from("users")
          .select("*", { count: "exact", head: true });

        // Fetch product counts
        const { count: productCount } = await supabase
          .from("products")
          .select("*", { count: "exact", head: true });

        const { count: beatCount } = await supabase
          .from("products")
          .select("*", { count: "exact", head: true })
          .eq("category", "beat");

        const { count: nftCount } = await supabase
          .from("products")
          .select("*", { count: "exact", head: true })
          .eq("category", "nft");

        const { count: merchCount } = await supabase
          .from("products")
          .select("*", { count: "exact", head: true })
          .eq("category", "merchandise");

        // Fetch order count (recent orders in last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const { count: orderCount } = await supabase
          .from("orders")
          .select("*", { count: "exact", head: true })
          .gte("created_at", thirtyDaysAgo.toISOString());

        // Calculate total revenue (sum of all completed orders)
        const { data: orders } = await supabase
          .from("orders")
          .select("total_amount")
          .eq("status", "completed");

        const totalRevenue = orders?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0;

        setStats({
          totalUsers: userCount || 0,
          totalProducts: productCount || 0,
          totalBeats: beatCount || 0,
          totalNFTs: nftCount || 0,
          totalMerch: merchCount || 0,
          totalRevenue,
          recentOrders: orderCount || 0,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const quickActions = [
    {
      title: "Add Beat",
      description: "Upload a new beat to the marketplace",
      href: "/dashboard/beats/upload",
      icon: Music,
      color: "bg-blue-500",
    },
    {
      title: "Create NFT",
      description: "Mint a new NFT collectible",
      href: "/dashboard/nfts/upload",
      icon: Gem,
      color: "bg-purple-500",
    },
    {
      title: "Add Merchandise",
      description: "Add new merchandise to the store",
      href: "/admin/products/merchandise/new",
      icon: ShoppingBag,
      color: "bg-green-500",
    },
    {
      title: "Manage Users",
      description: "View and manage user accounts",
      href: "/admin/users",
      icon: Users,
      color: "bg-orange-500",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your Its Different Productions platform
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." : stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              Registered platform users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." : stats.totalProducts}</div>
            <div className="flex gap-2 mt-2">
              <Badge variant="secondary">{stats.totalBeats} Beats</Badge>
              <Badge variant="secondary">{stats.totalNFTs} NFTs</Badge>
              <Badge variant="secondary">{stats.totalMerch} Merch</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${loading ? "..." : stats.totalRevenue.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Total platform revenue
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Orders</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." : stats.recentOrders}</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link key={action.href} href={action.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center mb-2`}>
                    <action.icon className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Management Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Product Management
            </CardTitle>
            <CardDescription>
              Manage beats, NFTs, and merchandise
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Link href="/admin/products">
                <Button variant="outline" className="w-full justify-start">
                  View All Products
                </Button>
              </Link>
              <Link href="/admin/products/pending">
                <Button variant="outline" className="w-full justify-start">
                  Pending Approval
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Management
            </CardTitle>
            <CardDescription>
              Manage user accounts and permissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Link href="/admin/users">
                <Button variant="outline" className="w-full justify-start">
                  All Users
                </Button>
              </Link>
              <Link href="/admin/users/admins">
                <Button variant="outline" className="w-full justify-start">
                  Admin Users
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Analytics
            </CardTitle>
            <CardDescription>
              View platform analytics and reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Link href="/admin/analytics">
                <Button variant="outline" className="w-full justify-start">
                  View Analytics
                </Button>
              </Link>
              <Link href="/admin/reports">
                <Button variant="outline" className="w-full justify-start">
                  Generate Reports
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
