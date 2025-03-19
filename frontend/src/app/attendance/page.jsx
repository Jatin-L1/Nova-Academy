import { EmployeeDetail } from "@/components/employee-detail"
import { AttendanceHistory } from "@/components/attendance-history"
import { Reminders } from "@/components/reminders"
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

export default function Page() {
  return (
    <SidebarProvider className="bg-black">
      <AppSidebar />
      <SidebarInset>
        <div className="min-h-screen bg-black p-6 text-white">
          <div className="mx-auto max-w-9xl space-y-6">
            <div className="flex gap-4">
              <div className="space-y-4">
                <EmployeeDetail />
                <AttendanceHistory />
              </div>
              <div className="">
                <Reminders />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}