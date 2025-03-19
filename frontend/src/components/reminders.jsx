import { Bell, Gift, PartyPopper, Cloud } from "lucide-react"
import { Card } from "@/components/ui/card"

export function Reminders() {
  const reminders = [
    {
      icon: <Gift className="h-5 w-5" />,
      title: "Java Assignment due",
      description: "Don't forget to submit your Java assignment today before 11:59 PM!",
      date: "3 Feb, 2025",
    }
  ]

  return (
    <Card className="bg-zinc-900 p-6 h-full">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-semibold text-white">Reminder</h2>
        </div>
      </div>

      <div className="space-y-4">
        {reminders.map((reminder, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-white">{reminder.title}</h3>
              <p className="text-sm text-zinc-400">{reminder.description}</p>
              <p className="mt-1 text-sm text-zinc-500">{reminder.date}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

