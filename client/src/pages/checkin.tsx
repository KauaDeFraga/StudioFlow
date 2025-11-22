import { CheckInList } from "@/components/checkin-list";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function CheckIn() {
  // TODO: remove mock functionality
  const mockClassInfo = {
    modality: "Spinning",
    instructor: "Carlos Mendes",
    time: "07:00",
    date: "22 de Nov, 2025",
  };

  const mockStudents = [
    { id: "1", name: "Maria Silva", checkedIn: true, checkInTime: "06:55" },
    { id: "2", name: "João Santos", checkedIn: false },
    { id: "3", name: "Ana Costa", checkedIn: true, checkInTime: "06:58" },
    { id: "4", name: "Pedro Oliveira", checkedIn: false },
    { id: "5", name: "Laura Mendes", checkedIn: false },
    { id: "6", name: "Carlos Roberto", checkedIn: true, checkInTime: "06:52" },
    { id: "7", name: "Fernanda Lima", checkedIn: false },
    { id: "8", name: "Ricardo Santos", checkedIn: false },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Check-In</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Marque presença nas aulas de hoje
        </p>
      </div>

      <div className="max-w-xs">
        <Label htmlFor="class-select" className="text-sm font-medium mb-2 block">
          Selecione a Aula
        </Label>
        <Select defaultValue="1">
          <SelectTrigger id="class-select" data-testid="select-class">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Spinning - 07:00 (Carlos M.)</SelectItem>
            <SelectItem value="2">Yoga - 08:00 (Ana P.)</SelectItem>
            <SelectItem value="3">HIIT - 18:00 (João S.)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <CheckInList
        classInfo={mockClassInfo}
        students={mockStudents}
        onCheckIn={(id, checked) => console.log("Check-in:", id, checked)}
        onCheckAll={() => console.log("Check all")}
        onUncheckAll={() => console.log("Uncheck all")}
      />
    </div>
  );
}
