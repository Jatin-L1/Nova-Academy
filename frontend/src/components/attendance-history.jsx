import { Filter, Grid2X2, List, ArrowDownUp, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function AttendanceHistory() {
  const attendanceData = [
    {
      date: "Data Structures",
      status: "On Time",
      checkIn: "0%",
    },
    {
      date: "Linux Administration",
      status: "Late",
      checkIn: "5%",
    },
    {
      date: "Java",
      status: "Absent",
      checkIn: "0%",
    },
    {
      date: "Object Oriented Programming",
      status: "On Time",
      checkIn: "0%",
    },
    {
      date: "Python",
      status: "On Time",
      checkIn: "0%",
    },
    {
      date: "Cyber Security",
      status: "Late",
      checkIn: "100%",
    },
  ];

  return (
    <Card className="bg-zinc-900 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-semibold text-white">Attendance History</h2>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {attendanceData.map((item, index) => {
          const attendancePercentage = parseFloat(item.checkIn);
          const isShort = attendancePercentage < 75;

          return (
            <Card key={index} className="bg-zinc-800 p-4">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-zinc-400" />
                  <span className="text-white">{item.date}</span>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-sm ${
                    isShort
                      ? "bg-red-400/10 text-red-400"
                      : "bg-emerald-400/10 text-emerald-400"
                  }`}
                >
                  {isShort ? "Short" : "Optimum"}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-zinc-400">Current Attendance</p>
                  <p className="text-lg font-semibold text-white">{item.checkIn}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </Card>
  );
}