"use client";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import TaskManager from "@/components/dashboard-component";
import { useEffect, useState } from "react";

const attendanceData = [
  { subject: "Math", attendance: 85 },
  { subject: "Science", attendance: 92 },
  { subject: "English", attendance: 78 },
  { subject: "History", attendance: 88 },
  { subject: "CS", attendance: 95 },
];

export default function Page() {
  return (
    <SidebarProvider className="bg-black">
      <AppSidebar />
      <SidebarInset>
        <TaskManager />
        <div className="mx-auto w-full">
          <div className="grid gap-6">
            <div className="mx-4">
              <div className="flex items-center gap-2 pb-2">
                <FileText className="h-5 w-5 text-white ml-8" />
                <h2 className="text-lg font-semibold text-white">My Timeline</h2>
              </div>
              <div className="space-y-4 px-5">
                <Card className="bg-black border border-gray-800 text-white">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Feb 18, Tuesday</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold">
                      Recruitment Notice: Chitkara University Toastmasters International Club
                    </h3>
                    <p className="text-sm text-gray-400">
                      Dear All, Please find attached notice and brochure of Recruitment for Chitkara University
                      Toastmasters International Club...
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-black border border-gray-800 text-white">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Feb 17, Monday</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold">Chitkara Circle Style Kabaddi Cup 2025</h3>
                    <p className="text-sm text-gray-400">
                      Dear All, Please find the attachment for the notice of the Chitkara Circle Style Kabaddi Cup
                      2025...
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}