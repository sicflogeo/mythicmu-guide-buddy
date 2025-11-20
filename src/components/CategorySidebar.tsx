import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { getBlockGuideContent } from "@/utils/blockStorage";

interface CategorySidebarProps {
  categories?: any[];
}

export function CategorySidebar({ categories }: CategorySidebarProps = {}) {
  const { open } = useSidebar();
  const location = useLocation();
  const currentHash = location.hash || "#getting-started-creating-character";
  const guideCategories = categories || getBlockGuideContent().map(cat => ({
    ...cat,
    icon: require("lucide-react")[cat.iconName] || require("lucide-react").BookOpen
  }));
  
  // Determine which category contains the current section
  const activeCategory = guideCategories.find(cat => 
    currentHash.startsWith(`#${cat.id}`)
  )?.id || "getting-started";

  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    [activeCategory]: true
  });

  // Keep the active category open when hash changes
  useEffect(() => {
    const category = guideCategories.find(cat => 
      currentHash.startsWith(`#${cat.id}`)
    );
    if (category) {
      setOpenCategories(prev => ({ ...prev, [category.id]: true }));
    }
  }, [currentHash]);

  const toggleCategory = (categoryId: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  return (
    <Sidebar className={open ? "w-64" : "w-16"} collapsible="icon">
      <div className="flex items-center justify-between p-4 border-b border-border">
        {open && (
          <h2 className="text-lg font-bold bg-gradient-mythic bg-clip-text text-transparent">
            Categories
          </h2>
        )}
        <SidebarTrigger />
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={!open ? "sr-only" : ""}>
            Guide Sections
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {guideCategories.map((category) => (
                <Collapsible
                  key={category.id}
                  open={openCategories[category.id]}
                  onOpenChange={() => toggleCategory(category.id)}
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton className="w-full">
                        <category.icon className="h-5 w-5 shrink-0" />
                        {open && (
                          <>
                            <span className="flex-1 text-left">{category.title}</span>
                            <ChevronRight 
                              className={`h-4 w-4 transition-transform ${
                                openCategories[category.id] ? 'rotate-90' : ''
                              }`}
                            />
                          </>
                        )}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    {open && (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {category.subSections.map((subSection) => {
                            const hash = `#${category.id}-${subSection.id}`;
                            return (
                              <SidebarMenuSubItem key={subSection.id}>
                                <SidebarMenuSubButton asChild>
                                  <NavLink
                                    to={hash}
                                    className="text-sm hover:bg-sidebar-accent rounded-md transition-colors"
                                    activeClassName="bg-sidebar-accent text-primary font-medium"
                                  >
                                    {subSection.title}
                                  </NavLink>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            );
                          })}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    )}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
