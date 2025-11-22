import { DashboardStats } from "@/components/dashboard-stats";
import { TopClasses } from "@/components/top-classes";

export default function Dashboard() {
  // TODO: remove mock functionality
  const mockTopClasses = [
    { name: "Spinning", enrolled: 28, capacity: 30 },
    { name: "Yoga Flow", enrolled: 22, capacity: 25 },
    { name: "Functional Training", enrolled: 18, capacity: 20 },
    { name: "Pilates", enrolled: 15, capacity: 18 },
    { name: "HIIT", enrolled: 24, capacity: 30 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Visão geral do desempenho do seu estúdio
        </p>
      </div>

      <DashboardStats activeClients={142} occupancyRate={78} weeklyClasses={45} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopClasses classes={mockTopClasses} />
        
        <div className="space-y-4">
          {/* Placeholder for future widgets */}
        </div>
      </div>
    </div>
  );
}
