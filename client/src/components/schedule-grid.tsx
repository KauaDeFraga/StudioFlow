import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

interface ScheduleClass {
  id: string;
  modality: string;
  instructor: string;
  time: string;
  day: number;
  enrolled: number;
  capacity: number;
}

interface ScheduleGridProps {
  classes: ScheduleClass[];
  onAddClass?: () => void;
  onClassClick?: (classId: string) => void;
}

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const timeSlots = ["06:00", "07:00", "08:00", "09:00", "10:00", "17:00", "18:00", "19:00", "20:00"];

export function ScheduleGrid({ classes, onAddClass, onClassClick }: ScheduleGridProps) {
  const [currentWeek] = useState(new Date());

  const getClassForSlot = (day: number, time: string) => {
    return classes.find((c) => c.day === day && c.time === time);
  };

  const getCapacityColor = (enrolled: number, capacity: number) => {
    const percentage = (enrolled / capacity) * 100;
    if (percentage >= 90) return "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20";
    if (percentage >= 70) return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20";
    return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" data-testid="button-prev-week">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h2 className="text-lg font-semibold">
            Week of {currentWeek.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </h2>
          <Button variant="outline" size="icon" data-testid="button-next-week">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        <Button onClick={onAddClass} data-testid="button-add-class">
          <Plus className="w-4 h-4 mr-2" />
          Add Class
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Weekly Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-max">
              <div className="grid grid-cols-8 gap-2">
                <div className="text-xs font-semibold text-muted-foreground p-2">Time</div>
                {daysOfWeek.map((day, index) => (
                  <div key={index} className="text-xs font-semibold text-muted-foreground p-2">
                    {day}
                  </div>
                ))}
                
                {timeSlots.map((time) => (
                  <>
                    <div key={`time-${time}`} className="text-xs text-muted-foreground p-2 flex items-center">
                      {time}
                    </div>
                    {daysOfWeek.map((_, dayIndex) => {
                      const classItem = getClassForSlot(dayIndex, time);
                      return (
                        <div key={`${dayIndex}-${time}`} className="p-1">
                          {classItem ? (
                            <Button
                              variant="outline"
                              className="w-full h-auto p-3 flex flex-col items-start gap-1 hover-elevate"
                              onClick={() => onClassClick?.(classItem.id)}
                              data-testid={`class-${classItem.id}`}
                            >
                              <div className="font-semibold text-sm">{classItem.modality}</div>
                              <div className="text-xs text-muted-foreground">{classItem.instructor}</div>
                              <Badge
                                variant="outline"
                                className={`text-xs ${getCapacityColor(classItem.enrolled, classItem.capacity)}`}
                              >
                                {classItem.enrolled}/{classItem.capacity}
                              </Badge>
                            </Button>
                          ) : (
                            <div className="w-full h-24 rounded-md border border-dashed border-border bg-muted/20" />
                          )}
                        </div>
                      );
                    })}
                  </>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
