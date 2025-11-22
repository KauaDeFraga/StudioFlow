import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, Calendar } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
}

function StatCard({ title, value, icon, description }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold" data-testid={`stat-${title.toLowerCase().replace(/\s+/g, '-')}`}>{value}</div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </CardContent>
    </Card>
  );
}

interface DashboardStatsProps {
  activeClients: number;
  occupancyRate: number;
  weeklyClasses: number;
}

export function DashboardStats({ activeClients, occupancyRate, weeklyClasses }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatCard
        title="Active Clients"
        value={activeClients}
        icon={<Users className="w-5 h-5" />}
        description="Currently enrolled"
      />
      <StatCard
        title="Occupancy Rate"
        value={`${occupancyRate}%`}
        icon={<TrendingUp className="w-5 h-5" />}
        description="Average weekly"
      />
      <StatCard
        title="Weekly Classes"
        value={weeklyClasses}
        icon={<Calendar className="w-5 h-5" />}
        description="Scheduled this week"
      />
    </div>
  );
}
