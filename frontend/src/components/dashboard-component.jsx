"use client";

import React, { useState } from "react";
import { ChevronRight, Plus, Star, Video } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import  AttendanceChart  from "./attendance-chart";

export default function TaskManager() {
  const [tasks, setTasks] = useState([
    { id: "1", title: "Fundamental of Data Science", project: "Issued", completed: false, starred: false },
    { id: "2", title: "The Design of Everyday Things", project: "Issued", completed: false, starred: false },
    { id: "2", title: "Atomic Habits", project: "Returned", completed: false, starred: false },
    { id: "3", title: "Powers Of Mind", project: "Issued", completed: false, starred: false },
    { id: "3", title: "Ikigai", project: "Returned", completed: false, starred: false },
  ]);

  const [meetings, setMeetings] = useState([
    { id: "1", title: "Badminton Kit", time: "10:00", period: "AM"},
    { id: "2", title: "Basketball", time: "01:00", period: "PM" },
    { id: "3", title: "Tennis Racket", time: "03:00", period: "PM" },
  ]);

  const toggleTaskComplete = (taskId) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)));
  };

  const toggleTaskStar = (taskId) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, starred: !task.starred } : task)));
  };

  return (
    <div className="bg-background p-4 text-white m-6">
      <div className="mx-auto max-w-9xl space-y-8 text-white">
        <div className="grid gap-8 md:grid-cols-3 text-white">
          {/* Tasks Section */}
          <Card className="border-border bg-background text-white">
            <CardHeader className="flex flex-row items-center justify-between text-white">
              <div className="flex items-center gap-2 text-white">
                <CardTitle>Library</CardTitle>
                {/* <span className="rounded-full bg-secondary px-2 py-1 text-sm">{tasks.length}</span> */}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center gap-3 rounded-lg border border-border bg-secondary p-4">
                  <Checkbox checked={task.completed} onChange={() => toggleTaskComplete(task.id)} />
                  <div className="flex-1">
                    <Label className={task.completed ? "line-through opacity-50" : ""}>{task.title}</Label>
                    <p className="text-sm text-muted-foreground">{task.project}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleTaskStar(task.id)}
                    className={task.starred ? "text-primary" : "text-muted-foreground"}
                  >
                    <Star className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Meetings Section */}
          <Card className="border-border bg-background text-white">
            <CardHeader className="flex flex-row items-center justify-between text-white">
              <div className="flex items-center gap-2 text-white">
                <CardTitle>Sportorium</CardTitle>
                {/* <span className="rounded-full bg-secondary px-2 py-1 text-sm">{meetings.length}</span> */}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {meetings.map((meeting) => (
                <div key={meeting.id} className="flex items-center gap-3 rounded-lg border border-border bg-secondary p-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold">{meeting.time}</span>
                      <span className="text-sm text-muted-foreground">{meeting.period}</span>
                    </div>
                    <p className="text-sm">{meeting.title}</p>
                    <p className="text-sm text-muted-foreground">{meeting.description}</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Video className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" className="w-full gap-2 border-dashed text-black">
                <Plus className="h-4 w-4" />
                Issue Equipment
              </Button>
            </CardContent>
          </Card>
          <AttendanceChart />
        </div>
      </div>
    </div>
  );
}
