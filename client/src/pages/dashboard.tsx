import { useQuery } from "@tanstack/react-query";
import { DashboardStats } from "@/components/dashboard-stats";
import { TopClasses } from "@/components/top-classes";
import type { Class, Modality, Enrollment } from "@shared/schema";

interface DashboardStatsData {
  activeClients: number;
  totalClients: number;
  weeklyClasses: number;
  occupancyRate: number;
}

export default function Dashboard() {
  const { data: stats } = useQuery<DashboardStatsData>({
    queryKey: ["/api/dashboard/stats"],
  });

  const { data: classes = [] } = useQuery<Class[]>({
    queryKey: ["/api/classes"],
  });

  const { data: modalities = [] } = useQuery<Modality[]>({
    queryKey: ["/api/modalities"],
  });

  const { data: enrollments = [] } = useQuery<Enrollment[]>({
    queryKey: ["/api/enrollments"],
  });

  const topClasses = classes
    .map((classItem) => {
      const modality = modalities.find((m) => m.id === classItem.modalityId);
      const enrolled = enrollments.filter((e) => e.classId === classItem.id).length;
      return {
        name: modality?.name || "N/A",
        enrolled,
        capacity: classItem.capacity,
      };
    })
    .sort((a, b) => b.enrolled - a.enrolled)
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Visão geral do desempenho do seu estúdio
        </p>
      </div>

      <DashboardStats
        activeClients={stats?.activeClients || 0}
        occupancyRate={stats?.occupancyRate || 0}
        weeklyClasses={stats?.weeklyClasses || 0}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopClasses classes={topClasses} />
        
        <div className="space-y-4">
          {/* Placeholder for future widgets */}
        </div>
      </div>
    </div>
  );
}
