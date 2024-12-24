import React from 'react';
import { useSelector } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BookOpen, GraduationCap } from "lucide-react";
import { formatToIndianTime } from '@/utils/dateFormatter';

export function StudentTable() {
  const { students, loading, error } = useSelector((state) => state.students);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Sort students by date_joined in descending order (latest first)
  const sortedStudents = [...students].sort((a, b) => 
    new Date(b.date_joined) - new Date(a.date_joined)
  );

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold">Student Name</TableHead>
              <TableHead className="font-semibold">Cohort</TableHead>
              <TableHead className="font-semibold">Courses</TableHead>
              <TableHead className="font-semibold">Date Joined</TableHead>
              <TableHead className="font-semibold">Last login</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.cohort}</TableCell>
                <TableCell>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    {student.courses.map((course, index) => (
                      <div key={index} className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4 text-red-500" />
                        <span className="text-sm">{course}</span>
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{formatToIndianTime(student.date_joined)}</TableCell>
                <TableCell>{formatToIndianTime(student.last_login)}</TableCell>
                <TableCell>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      student.status ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
