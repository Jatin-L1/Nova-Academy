"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ProgressDetail } from "./progress-detail"
const attendanceData = [
  { course: "22CS009", attendance: 94.74 },
  { course: "22CS017", attendance: 86.96 },
  { course: "23CS004", attendance: 84.62 },
  { course: "23CS005", attendance: 83.78 },
  { course: "23CS006", attendance: 87.5 },
  { course: "23IC002", attendance: 90.0 },
]

const semesterOneData = [
  { code: "22AS001", name: "CALCULUS AND STATISTICAL ANALYSIS", credits: "-", grade: "NA", period: "1 SEM" },
  { code: "22GE001", name: "HUMAN VALUES & PROFESSIONAL ETHICS", credits: "-", grade: "NA", period: "1 SEM" },
  { code: "23CS001", name: "PROBLEM SOLVING USING PYTHON PROGRAMMING", credits: "-", grade: "NA", period: "1 SEM" },
  { code: "23CS002", name: "FRONT END ENGINEERING-I", credits: "-", grade: "NA", period: "1 SEM" },
  {
    code: "23IC001",
    name: "DIGITAL ELECTRONICS AND COMPUTERS ARCHITECTURE",
    credits: "-",
    grade: "NA",
    period: "1 SEM",
  },
  { code: "23OE004", name: "OPEN ELECTIVE 1 - IPR & CYBER LAWS - I", credits: "-", grade: "NA", period: "1 SEM" },
]

const semesterTwoData = [
  { code: "22AS002", name: "DIFFERENTIAL EQUATION AND TRANSFORMATIONS", credits: "-", grade: "NA", period: "2 SEM" },
  { code: "22AS015", name: "MODERN AND COMPUTATIONAL PHYSICS", credits: "-", grade: "NA", period: "2 SEM" },
  { code: "22CS003", name: "SOURCE CODE MANAGEMENT", credits: "-", grade: "NA", period: "2 SEM" },
  { code: "22CS005", name: "OPERATING SYSTEM", credits: "-", grade: "NA", period: "2 SEM" },
  { code: "22CS019", name: "CLOUD, DATA ENGINEERING AND DEV OPS", credits: "-", grade: "NA", period: "2 SEM" },
  { code: "23CS003", name: "FUNDAMENTALS OF C PROGRAMMING", credits: "-", grade: "NA", period: "2 SEM" },
  { code: "23GE002", name: "ENVIRONMENTAL SCIENCES", credits: "-", grade: "NA", period: "2 SEM" },
  { code: "23OE009", name: "OPEN ELECTIVE 2 - IPR & CYBER LAWS - II", credits: "-", grade: "NA", period: "2 SEM" },
]

export default function ProgressPageEvent() {
  return (
    <div className="bg-black h-screen p-6">
      <div className="container mx-auto space-y-8">
        <ProgressDetail />
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">
                Semester 1 <span className="text-emerald-400">(SGPA: 9.28 | CGPA: 9.28)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-zinc-800">
                    <TableHead className="text-zinc-400">Code</TableHead>
                    <TableHead className="text-zinc-400">Subject</TableHead>
                    <TableHead className="text-zinc-400">Credits</TableHead>
                    <TableHead className="text-zinc-400">Grade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {semesterOneData.map((subject) => (
                    <TableRow key={subject.code} className="border-zinc-800">
                      <TableCell className="font-medium text-emerald-400">{subject.code}</TableCell>
                      <TableCell className="text-white">{subject.name}</TableCell>
                      <TableCell className="text-white">{subject.credits}</TableCell>
                      <TableCell className="text-white">{subject.grade}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">
                Semester 2 <span className="text-emerald-400">(SGPA: 8.70 | CGPA: 8.96)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-zinc-800">
                    <TableHead className="text-zinc-400">Code</TableHead>
                    <TableHead className="text-zinc-400">Subject</TableHead>
                    <TableHead className="text-zinc-400">Credits</TableHead>
                    <TableHead className="text-zinc-400">Grade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {semesterTwoData.map((subject) => (
                    <TableRow key={subject.code} className="border-zinc-800">
                      <TableCell className="font-medium text-emerald-400">{subject.code}</TableCell>
                      <TableCell className="text-white">{subject.name}</TableCell>
                      <TableCell className="text-white">{subject.credits}</TableCell>
                      <TableCell className="text-white">{subject.grade}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

