import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Student {
  id: string;
  name: string;
  checkedIn: boolean;
  checkInTime?: string;
}

interface CheckInListProps {
  classInfo: {
    modality: string;
    instructor: string;
    time: string;
    date: string;
  };
  students: Student[];
  onCheckIn?: (studentId: string, checked: boolean) => void;
  onCheckAll?: () => void;
  onUncheckAll?: () => void;
}

export function CheckInList({ classInfo, students, onCheckIn, onCheckAll, onUncheckAll }: CheckInListProps) {
  const [localStudents, setLocalStudents] = useState(students);

  const handleCheckIn = (studentId: string, checked: boolean) => {
    setLocalStudents((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? { ...s, checkedIn: checked, checkInTime: checked ? new Date().toLocaleTimeString() : undefined }
          : s
      )
    );
    onCheckIn?.(studentId, checked);
  };

  const handleCheckAll = () => {
    const time = new Date().toLocaleTimeString();
    setLocalStudents((prev) =>
      prev.map((s) => ({ ...s, checkedIn: true, checkInTime: time }))
    );
    onCheckAll?.();
  };

  const handleUncheckAll = () => {
    setLocalStudents((prev) =>
      prev.map((s) => ({ ...s, checkedIn: false, checkInTime: undefined }))
    );
    onUncheckAll?.();
  };

  const checkedInCount = localStudents.filter((s) => s.checkedIn).length;
  const totalCount = localStudents.length;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <CardTitle className="text-lg font-semibold">{classInfo.modality}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {classInfo.instructor} • {classInfo.date} at {classInfo.time}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm">
              {checkedInCount}/{totalCount} checked in
            </Badge>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Button variant="outline" size="sm" onClick={handleCheckAll} data-testid="button-check-all">
            Check All
          </Button>
          <Button variant="outline" size="sm" onClick={handleUncheckAll} data-testid="button-uncheck-all">
            Uncheck All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {localStudents.map((student) => (
            <div
              key={student.id}
              className="flex items-center justify-between p-3 rounded-md border hover-elevate"
              data-testid={`student-${student.id}`}
            >
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={student.checkedIn}
                  onCheckedChange={(checked) => handleCheckIn(student.id, checked as boolean)}
                  data-testid={`checkbox-${student.id}`}
                />
                <Avatar className="w-10 h-10">
                  <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{student.name}</p>
                  {student.checkedIn && student.checkInTime && (
                    <p className="text-xs text-muted-foreground">Checked in at {student.checkInTime}</p>
                  )}
                </div>
              </div>
              {student.checkedIn && (
                <Badge variant="outline" className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20">
                  Present
                </Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
