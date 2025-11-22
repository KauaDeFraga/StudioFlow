import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, Calendar } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
}

function StatCard({ title, value, icon, description }: StatCardProps) {
  const gradients = [
    "bg-gradient-to-br from-purple-500 to-purple-700",
    "bg-gradient-to-br from-cyan-500 to-cyan-700",
    "bg-gradient-to-br from-pink-500 to-pink-700",
  ];
  
  const gradient = title === "Active Clients" ? gradients[0] : 
                   title === "Occupancy Rate" ? gradients[1] : gradients[2];

  return (
    <Card className="overflow-hidden border-0 shadow-lg">
      <div className={`${gradient} p-6 text-white`}>
        <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 p-0 pb-3">
          <CardTitle className="text-sm font-semibold text-white/90">{title}</CardTitle>
          <div className="bg-white/20 p-2 rounded-lg">{icon}</div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="text-4xl font-bold" data-testid={`stat-${title.toLowerCase().replace(/\s+/g, '-')}`}>{value}</div>
          {description && <p className="text-sm text-white/80 mt-2">{description}</p>}
        </CardContent>
      </div>
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
        title="Clientes Ativos"
        value={activeClients}
        icon={<Users className="w-5 h-5" />}
        description="Matriculados atualmente"
      />
      <StatCard
        title="Taxa de Ocupação"
        value={`${occupancyRate}%`}
        icon={<TrendingUp className="w-5 h-5" />}
        description="Média semanal"
      />
      <StatCard
        title="Aulas Semanais"
        value={weeklyClasses}
        icon={<Calendar className="w-5 h-5" />}
        description="Agendadas esta semana"
      />
    </div>
  );
}
