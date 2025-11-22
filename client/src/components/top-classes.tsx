import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ClassData {
  name: string;
  enrolled: number;
  capacity: number;
}

interface TopClassesProps {
  classes: ClassData[];
}

export function TopClasses({ classes }: TopClassesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Aulas Mais Populares</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {classes.map((classItem, index) => {
          const percentage = Math.round((classItem.enrolled / classItem.capacity) * 100);
          return (
            <div key={index} className="space-y-2" data-testid={`class-${index}`}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{classItem.name}</span>
                <span className="text-muted-foreground">
                  {classItem.enrolled}/{classItem.capacity}
                </span>
              </div>
              <Progress value={percentage} className="h-2" />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
