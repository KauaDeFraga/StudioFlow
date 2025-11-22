import { ScheduleGrid } from "@/components/schedule-grid";

export default function Schedule() {
  // TODO: remove mock functionality
  const mockClasses = [
    { id: "1", modality: "Spinning", instructor: "Carlos M.", time: "07:00", day: 0, enrolled: 28, capacity: 30 },
    { id: "2", modality: "Yoga", instructor: "Ana P.", time: "08:00", day: 0, enrolled: 15, capacity: 20 },
    { id: "3", modality: "HIIT", instructor: "João S.", time: "18:00", day: 0, enrolled: 25, capacity: 25 },
    { id: "4", modality: "Pilates", instructor: "Maria L.", time: "09:00", day: 1, enrolled: 12, capacity: 15 },
    { id: "5", modality: "Functional", instructor: "Pedro R.", time: "19:00", day: 1, enrolled: 18, capacity: 20 },
    { id: "6", modality: "Spinning", instructor: "Carlos M.", time: "07:00", day: 2, enrolled: 27, capacity: 30 },
    { id: "7", modality: "Yoga Flow", instructor: "Ana P.", time: "10:00", day: 2, enrolled: 20, capacity: 25 },
    { id: "8", modality: "HIIT", instructor: "João S.", time: "18:00", day: 3, enrolled: 22, capacity: 25 },
    { id: "9", modality: "Pilates", instructor: "Maria L.", time: "08:00", day: 3, enrolled: 14, capacity: 15 },
    { id: "10", modality: "Functional", instructor: "Pedro R.", time: "19:00", day: 4, enrolled: 19, capacity: 20 },
    { id: "11", modality: "Spinning", instructor: "Carlos M.", time: "09:00", day: 5, enrolled: 24, capacity: 30 },
    { id: "12", modality: "Yoga", instructor: "Ana P.", time: "10:00", day: 5, enrolled: 18, capacity: 20 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Schedule</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your weekly class schedule
        </p>
      </div>

      <ScheduleGrid
        classes={mockClasses}
        onAddClass={() => console.log("Add class clicked")}
        onClassClick={(id) => console.log("Class clicked:", id)}
      />
    </div>
  );
}
