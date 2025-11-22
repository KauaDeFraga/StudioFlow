import { DashboardStats } from "../dashboard-stats";

export default function DashboardStatsExample() {
  return (
    <DashboardStats
      activeClients={142}
      occupancyRate={78}
      weeklyClasses={45}
    />
  );
}
