import { InstructorCard } from "@/components/instructor-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Instructors() {
  // TODO: remove mock functionality
  const mockInstructors = [
    {
      id: "1",
      name: "Carlos Mendes",
      email: "carlos.mendes@studio.com",
      modalities: ["Spinning", "HIIT", "Functional Training"],
    },
    {
      id: "2",
      name: "Ana Paula",
      email: "ana.paula@studio.com",
      modalities: ["Yoga", "Pilates", "Yoga Flow"],
    },
    {
      id: "3",
      name: "João Silva",
      email: "joao.silva@studio.com",
      modalities: ["HIIT", "Functional Training", "CrossFit"],
    },
    {
      id: "4",
      name: "Maria Lima",
      email: "maria.lima@studio.com",
      modalities: ["Pilates", "Yoga"],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold">Instrutores</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gerencie os instrutores do seu estúdio
          </p>
        </div>
        <Button data-testid="button-add-instructor">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Instrutor
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockInstructors.map((instructor) => (
          <InstructorCard
            key={instructor.id}
            instructor={instructor}
            onEdit={(id) => console.log("Edit instructor:", id)}
            onDelete={(id) => console.log("Delete instructor:", id)}
          />
        ))}
      </div>
    </div>
  );
}
