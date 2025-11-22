import { InstructorCard } from "../instructor-card";

export default function InstructorCardExample() {
  const mockInstructor = {
    id: "1",
    name: "Carlos Mendes",
    email: "carlos.mendes@studio.com",
    modalities: ["Spinning", "HIIT", "Functional Training"],
  };

  return (
    <InstructorCard
      instructor={mockInstructor}
      onEdit={(id) => console.log("Edit instructor:", id)}
      onDelete={(id) => console.log("Delete instructor:", id)}
    />
  );
}
