import { ArrowDownToLine, Clock, LogIn, Trophy } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function EmployeeDetail() {
  return (
    <Card className="bg-zinc-900 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold text-white">Student Details</h1>
        </div>
      </div>
      <div className="mb-8 flex items-start gap-6">
        <Avatar className="h-24 w-24">
          <AvatarImage
            src="/jatin.jpg"
            alt="Employee"
          />
          <AvatarFallback>NK</AvatarFallback>
        </Avatar>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-white">Jatin Sharma</h2>
          </div>
          <div className="grid grid-cols-3 gap-12">
            <div>
              <p className="text-sm text-zinc-400">Roll No: </p>
              <p className="text-white">123456578</p>
            </div>
            <div>
              <p className="text-sm text-zinc-400">Phone Number</p>
              <p className="text-white">(+62) 812 3456-7890</p>
            </div>
            <div>
              <p className="text-sm text-zinc-400">Email Adress</p>
              <p className="text-white">jatinsahrma@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-zinc-800 p-4">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-zinc-700 p-2">
              <LogIn className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">13</p>
              <p className="text-sm text-zinc-400">Total Attendance</p>
            </div>
          </div>
        </Card>
        <Card className="bg-zinc-800 p-4">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-zinc-700 p-2">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">Total Dl&apos;s</p>
              <p className="text-sm text-zinc-400">0</p>
            </div>
          </div>
        </Card>

        <Card className="bg-zinc-800 p-4">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-zinc-700 p-2">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">Total Ml&apos;s</p>
              <p className="text-sm text-zinc-400">0</p>
            </div>
          </div>
        </Card>
      
        <Card className="bg-zinc-800 p-4">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-zinc-700 p-2">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">Mentor Name</p>
              <p className="text-sm text-zinc-400">Vijaita Kashyap</p>
            </div>
          </div>
        </Card>
      </div>
    </Card>
  )
}

