import { BookOpen, Sword, Shield, Map, Sparkles } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const guideItems = [
  { title: "Getting Started", url: "#getting-started", icon: BookOpen },
  { title: "Character Classes", url: "#character-classes", icon: Sword },
  { title: "Items & Equipment", url: "#items-equipment", icon: Shield },
  { title: "Quests & Dungeons", url: "#quests-dungeons", icon: Map },
  { title: "Advanced Tips", url: "#advanced-tips", icon: Sparkles },
];

export function GuideSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const currentHash = location.hash || "#getting-started";

  const isActive = (url: string) => currentHash === url;

  return (
    <Sidebar className={open ? "w-64" : "w-16"} collapsible="icon">
      <div className="flex items-center justify-between p-4 border-b border-border">
        {open && (
          <h2 className="text-lg font-bold bg-gradient-mythic bg-clip-text text-transparent">
            Guide Menu
          </h2>
        )}
        <SidebarTrigger />
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={!open ? "sr-only" : ""}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {guideItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-sidebar-accent"
                      activeClassName="bg-sidebar-accent text-primary font-medium"
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
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
