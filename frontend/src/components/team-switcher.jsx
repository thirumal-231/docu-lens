"use client";

import * as React from "react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ChevronsUpDownIcon } from "lucide-react";
import { UserButton } from "@clerk/react";

export function TeamSwitcher({ teams, user }) {
  const { isMobile } = useSidebar();
  const [activeTeam, setActiveTeam] = React.useState(teams[0]);
  if (!activeTeam) {
    return null;
  }
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          // Removed the data-open classes as the dropdown is gone
          className="bg-sidebar-accent text-sidebar-accent-foreground"
        >
          {/* Active Team Logo */}
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <UserButton />
          </div>
          {/* Active Team Details */}
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{user.firstName}</span>
            <span className="truncate text-xs">{user.lastName}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
