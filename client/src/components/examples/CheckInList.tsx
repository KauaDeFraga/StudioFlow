import { CheckInList } from "../checkin-list";

export default function CheckInListExample() {
  const mockClassInfo = {
    modality: "Spinning",
    instructor: "Carlos Mendes",
    time: "07:00",
    date: "Nov 22, 2025",
  };

  const mockStudents = [
    { id: "1", name: "Maria Silva", checkedIn: true, checkInTime: "06:55" },
    { id: "2", name: "João Santos", checkedIn: false },
    { id: "3", name: "Ana Costa", checkedIn: true, checkInTime: "06:58" },
    { id: "4", name: "Pedro Oliveira", checkedIn: false },
    { id: "5", name: "Laura Mendes", checkedIn: false },
  ];

  return (
    <CheckInList
      classInfo={mockClassInfo}
      students={mockStudents}
      onCheckIn={(id, checked) => console.log("Check-in:", id, checked)}
      onCheckAll={() => console.log("Check all")}
      onUncheckAll={() => console.log("Uncheck all")}
    />
  );
}
