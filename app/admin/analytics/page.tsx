"use client";

import { useState, useEffect } from "react";
import { 
  TrendingUp, 
  Users, 
  Package, 
  DollarSign,
  Calendar,
  BarChart3,
  PieChart,
  Activity
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdminBreadcrumb } from "@/components/admin/admin-nav";
import { supabase } from "@/lib/supabase";

interface AnalyticsData {
  totalUsers: number;
  totalProducts: number;
  totalRevenue: number;
  totalOrders: number;
  userGrowth: number;
  productGrowth: number;
  revenueGrowth: number;
  orderGrowth: number;
  topCategories: Array<{ category: string; count: number; revenue: number }>;
  recentActivity: Array<{ type: string; description: string; timestamp: string }>;
}

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalUsers: 0,
    totalProducts: 0,
    totalRevenue: 0,
    totalOrders: 0,
    userGrowth: 0,
    productGrowth: 0,
    revenueGrowth: 0,
    orderGrowth: 0,
    topCategories: [],
    recentActivity: [],
  });
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("30d");

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      const now = new Date();
      const daysAgo = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90;
      const startDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
      const previousStartDate = new Date(startDate.getTime() - daysAgo * 24 * 60 * 60 * 1000);

      // Fetch current period data
      const [usersResult, productsResult, ordersResult] = await Promise.all([
        supabase.from("users").select("*", { count: "exact", head: true }),
        supabase.from("products").select("*", { count: "exact", head: true }),
        supabase
          .from("orders")
          .select("total_amount, created_at")
          .gte("created_at", startDate.toISOString()),
      ]);

      // Fetch previous period data for growth calculation
      const [prevUsersResult, prevProductsResult, prevOrdersResult] = await Promise.all([
        supabase
          .from("users")
          .select("*", { count: "exact", head: true })
          .gte("created_at", previousStartDate.toISOString())
          .lt("created_at", startDate.toISOString()),
        supabase
          .from("products")
          .select("*", { count: "exact", head: true })
          .gte("created_at", previousStartDate.toISOString())
          .lt("created_at", startDate.toISOString()),
        supabase
          .from("orders")
          .select("total_amount")
          .gte("created_at", previousStartDate.toISOString())
          .lt("created_at", startDate.toISOString()),
      ]);

      // Fetch category data
      const { data: categoryData } = await supabase
        .from("products")
        .select("category, price")
        .eq("status", "published");

      // Calculate metrics
      const totalUsers = usersResult.count || 0;
      const totalProducts = productsResult.count || 0;
      const currentOrders = ordersResult.data || [];
      const totalOrders = currentOrders.length;
      const totalRevenue = currentOrders.reduce((sum, order) => sum + (order.total_amount || 0), 0);

      const prevUsers = prevUsersResult.count || 0;
      const prevProducts = prevProductsResult.count || 0;
      const prevOrders = prevOrdersResult.data || [];
      const prevOrderCount = prevOrders.length;
      const prevRevenue = prevOrders.reduce((sum, order) => sum + (order.total_amount || 0), 0);

      // Calculate growth percentages
      const userGrowth = prevUsers > 0 ? ((totalUsers - prevUsers) / prevUsers) * 100 : 0;
      const productGrowth = prevProducts > 0 ? ((totalProducts - prevProducts) / prevProducts) * 100 : 0;
      const orderGrowth = prevOrderCount > 0 ? ((totalOrders - prevOrderCount) / prevOrderCount) * 100 : 0;
      const revenueGrowth = prevRevenue > 0 ? ((totalRevenue - prevRevenue) / prevRevenue) * 100 : 0;

      // Process category data
      const categoryStats = (categoryData || []).reduce((acc, product) => {
        const category = product.category || "unknown";
        if (!acc[category]) {
          acc[category] = { count: 0, revenue: 0 };
        }
        acc[category].count += 1;
        acc[category].revenue += product.price || 0;
        return acc;
      }, {} as Record<string, { count: number; revenue: number }>);

      const topCategories = Object.entries(categoryStats)
        .map(([category, stats]) => ({ category, ...stats }))
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5);

      // Mock recent activity (in a real app, you'd have an activity log table)
      const recentActivity = [
        { type: "user", description: "New user registered", timestamp: new Date().toISOString() },
        { type: "product", description: "New NFT created", timestamp: new Date(Date.now() - 3600000).toISOString() },
        { type: "order", description: "Beat purchased", timestamp: new Date(Date.now() - 7200000).toISOString() },
        { type: "user", description: "User upgraded to admin", timestamp: new Date(Date.now() - 10800000).toISOString() },
      ];

      setAnalytics({
        totalUsers,
        totalProducts,
        totalRevenue,
        totalOrders,
        userGrowth,
        productGrowth,
        revenueGrowth,
        orderGrowth,
        topCategories,
        recentActivity,
      });
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatGrowth = (growth: number) => {
    const isPositive = growth >= 0;
    return (
      <span className={isPositive ? "text-green-600" : "text-red-600"}>
        {isPositive ? "+" : ""}{growth.toFixed(1)}%
      </span>
    );
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user":
        return <Users className="h-4 w-4" />;
      case "product":
        return <Package className="h-4 w-4" />;
      case "order":
        return <DollarSign className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div>
      <AdminBreadcrumb items={[{ title: "Analytics" }]} />
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Platform performance and insights
            </p>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading analytics...</div>
      ) : (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.totalUsers}</div>
                <p className="text-xs text-muted-foreground">
                  {formatGrowth(analytics.userGrowth)} from last period
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.totalProducts}</div>
                <p className="text-xs text-muted-foreground">
                  {formatGrowth(analytics.productGrowth)} from last period
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${analytics.totalRevenue.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">
                  {formatGrowth(analytics.revenueGrowth)} from last period
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Orders</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.totalOrders}</div>
                <p className="text-xs text-muted-foreground">
                  {formatGrowth(analytics.orderGrowth)} from last period
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Category Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Categories</CardTitle>
                <CardDescription>Performance by product category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.topCategories.map((category, index) => (
                    <div key={category.category} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium capitalize">{category.category}</div>
                          <div className="text-sm text-muted-foreground">
                            {category.count} products
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${category.revenue.toFixed(2)}</div>
                        <div className="text-sm text-muted-foreground">revenue</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest platform activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm">{activity.description}</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(activity.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
