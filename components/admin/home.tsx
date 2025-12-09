"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, BookOpen, TrendingUp, Activity, Plus } from "lucide-react"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts"

export function AdminHome() {
    const analyticsData = [
        { month: "Jan", users: 400, active: 240 },
        { month: "Feb", users: 520, active: 310 },
        { month: "Mar", users: 680, active: 450 },
        { month: "Apr", users: 890, active: 620 },
        { month: "May", users: 1050, active: 780 },
        { month: "Jun", users: 1280, active: 920 },
    ]

    const roleDistribution = [
        { name: "Students", value: 850 },
        { name: "Teachers", value: 120 },
        { name: "Mentors", value: 80 },
        { name: "Admins", value: 5 },
    ]

    const COLORS = ["rgba(99, 102, 241, 1)", "rgba(168, 198, 209, 1)", "rgba(251, 191, 36, 1)", "rgba(239, 68, 68, 1)"]

    return (
        <div className="p-8 space-y-8">
        <div className="flex items-center justify-between">
            <div>
            <h1 className="text-3xl font-bold">Admin Control Panel</h1>
            <p className="text-muted-foreground mt-1">Platform analytics and management</p>
            </div>
            <Button className="bg-primary">
            <Plus className="w-4 h-4 mr-2" />
            Generate Report
            </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
            { label: "Total Users", value: "1,055", icon: Users, color: "text-primary" },
            { label: "Active Today", value: "920", icon: Activity, color: "text-secondary" },
            { label: "Content Items", value: "2,340", icon: BookOpen, color: "text-accent" },
            { label: "Growth", value: "+12.5%", icon: TrendingUp, color: "text-green-500" },
            ].map((metric, idx) => {
            const Icon = metric.icon
            return (
                <Card key={idx} className="glass">
                <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                        <p className="text-3xl font-bold">{metric.value}</p>
                    </div>
                    <Icon className={`w-8 h-8 ${metric.color}`} />
                    </div>
                </CardContent>
                </Card>
            )
            })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* User Growth Chart */}
            <div className="lg:col-span-2">
            <Card className="glass">
                <CardHeader>
                <CardTitle>User Growth Trends</CardTitle>
                </CardHeader>
                <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="users"
                        stroke="rgba(99, 102, 241, 1)"
                        strokeWidth={2}
                        dot={{ fill: "rgba(99, 102, 241, 1)" }}
                    />
                    <Line
                        type="monotone"
                        dataKey="active"
                        stroke="rgba(168, 198, 209, 1)"
                        strokeWidth={2}
                        dot={{ fill: "rgba(168, 198, 209, 1)" }}
                    />
                    </LineChart>
                </ResponsiveContainer>
                </CardContent>
            </Card>
            </div>

            {/* Role Distribution */}
            <Card className="glass">
            <CardHeader>
                <CardTitle>User Distribution</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                    <Pie
                    data={roleDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    >
                    {roleDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                    </Pie>
                </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                {roleDistribution.map((role, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }}></div>
                        {role.name}
                    </span>
                    <span className="font-semibold">{role.value}</span>
                    </div>
                ))}
                </div>
            </CardContent>
            </Card>
        </div>

        {/* System Status */}
        <Card className="glass">
            <CardHeader>
            <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                { service: "Database", status: "Healthy", uptime: "99.9%" },
                { service: "API Server", status: "Healthy", uptime: "99.8%" },
                { service: "AI Services", status: "Healthy", uptime: "99.7%" },
                ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-white/50 dark:bg-white/5 border border-white/20">
                    <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold">{item.service}</p>
                    <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200">
                        {item.status}
                    </span>
                    </div>
                    <p className="text-sm text-muted-foreground">Uptime: {item.uptime}</p>
                </div>
                ))}
            </div>
            </CardContent>
        </Card>
        </div>
    )
}
