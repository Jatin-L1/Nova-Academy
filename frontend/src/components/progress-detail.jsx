import { ArrowDownToLine, Clock, LogIn, Trophy } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function ProgressDetail() {
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
              <p className="text-white">student@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

