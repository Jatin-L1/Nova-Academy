import { AppSidebar } from "@/components/app-sidebar";
import ProgressEvent from "@/components/progress-event";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

export default function Page() {
  return (
    <SidebarProvider className="bg-black">
      <AppSidebar />
      <SidebarInset>
        <ProgressEvent />
      </SidebarInset>
    </SidebarProvider>
  );
}