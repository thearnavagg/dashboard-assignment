import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addStudent } from "@/api/studentsAPI";
import MultipleSelector from "@/components/ui/multiple-selector";
import { formatToIndianTime } from '@/utils/dateFormatter';

const COURSE_OPTIONS = [
  { label: 'CBSE 9 Science', value: 'CBSE 9 Science' },
  { label: 'CBSE 9 Math', value: 'CBSE 9 Math' },
];

const AddStudent = () => {
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    cohort: "",
    status: null, // Initialize status to null
    courses: [],
    last_login: "", // Add this field
    date_joined: "", // Add this field
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const handleSelectChange = (id, value) => {
    setFormValues({
      ...formValues,
      [id]: id === "status" ? value === "active" : value,
    });
  };

  const handleCoursesChange = (selectedCourses) => {
    setFormValues({
      ...formValues,
      courses: selectedCourses.map(course => course.value),
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.name) newErrors.name = "Name is required";
    if (!formValues.cohort) newErrors.cohort = "Cohort is required";
    if (formValues.status === null) newErrors.status = "Status is required"; // Check for null
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createNewStudent = async () => {
    if (validateForm()) {
      try {
        const currentTime = new Date().toISOString();
        const studentData = {
          ...formValues,
          last_login: currentTime,
          date_joined: currentTime,
        };
        
        await addStudent(studentData);
        console.log("Student added successfully:", {
          ...studentData,
          last_login: formatToIndianTime(currentTime),
          date_joined: formatToIndianTime(currentTime),
        });
        setOpen(false);
      } catch (error) {
        console.error("Error adding student:", error);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-slate-200 text-slate-900 hover:bg-slate-400 w-full sm:w-auto">
          + Add new Student
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Add new Student
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <Input
            id="name"
            placeholder="Student Name"
            value={formValues.name}
            onChange={handleChange}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name}</p>
          )}
          <Input
            id="cohort"
            placeholder="Cohort"
            value={formValues.cohort}
            onChange={handleChange}
          />
          {errors.cohort && (
            <p className="text-red-500 text-sm">{errors.cohort}</p>
          )}
          <Select
            value={formValues.status !== null ? (formValues.status ? "active" : "inactive") : ""}
            onValueChange={(value) => handleSelectChange("status", value)}
          >
            <SelectTrigger className="w-full bg-slate-100">
              <SelectValue>{formValues.status !== null ? (formValues.status ? "Active" : "Inactive") : "Select status"}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          {errors.status && (
            <p className="text-red-500 text-sm">{errors.status}</p>
          )}
          <MultipleSelector
            value={COURSE_OPTIONS.filter(option => formValues.courses.includes(option.value))}
            onChange={handleCoursesChange}
            defaultOptions={COURSE_OPTIONS}
            placeholder="Select courses"
            emptyIndicator={
              <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                no results found.
              </p>
            }
          />
        </div>
        <DialogFooter className="mt-6">
          <Button className="w-full" onClick={createNewStudent}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddStudent;
