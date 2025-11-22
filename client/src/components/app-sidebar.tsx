import { Home, Users, Calendar, UserCircle, Grid3x3, CheckCircle } from "lucide-react";
import { Link, useLocation } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Clientes",
    url: "/clients",
    icon: Users,
  },
  {
    title: "Agenda",
    url: "/schedule",
    icon: Calendar,
  },
  {
    title: "Instrutores",
    url: "/instructors",
    icon: UserCircle,
  },
  {
    title: "Modalidades",
    url: "/modalities",
    icon: Grid3x3,
  },
  {
    title: "Check-in",
    url: "/checkin",
    icon: CheckCircle,
  },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar className="bg-gradient-to-b from-purple-600 to-purple-800 dark:from-purple-800 dark:to-purple-950">
      <SidebarHeader className="p-6 border-b border-white/10">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-400 flex items-center justify-center text-white font-bold">
            SF
          </div>
          StudioFlow
        </h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/70 text-xs font-semibold uppercase tracking-wider">Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location === item.url} data-testid={`link-${item.title.toLowerCase()}`}>
                    <Link href={item.url}>
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
