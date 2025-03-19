import { AppSidebar } from "@/components/app-sidebar";
import ProgressPage from "@/components/progress-page";
import { EventReminders } from "@/components/reminder-event";
import { Reminders } from "@/components/reminders";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";


export default function Page() {
  return (
    <SidebarProvider className="bg-black">
      <AppSidebar />
      <SidebarInset>
        <EventReminders />
      </SidebarInset>
    </SidebarProvider>
  );
}