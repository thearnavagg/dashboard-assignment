import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StudentTable } from "@/components/student-table";
import AddStudent from "@/components/add-student";

export const Page = () => {
  return (
    <div className="space-y-6 p-6 bg-white rounded-lg">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Select defaultValue="2024-25">
            <SelectTrigger className="w-full sm:w-[180px] bg-slate-100">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024-25">AY 2024-25</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="9">
            <SelectTrigger className="w-full sm:w-[180px] bg-slate-100">
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="9">CBSE 9</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <AddStudent />
      </div>
      <StudentTable />
    </div>
  );
};
