import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ScheduleGrid } from "@/components/schedule-grid";
import { AddClassDialog } from "@/components/add-class-dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Class, Modality, Instructor, Enrollment, InsertClass } from "@shared/schema";

interface ScheduleClass {
  id: string;
  modality: string;
  instructor: string;
  time: string;
  day: number;
  enrolled: number;
  capacity: number;
}

export default function Schedule() {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: classes = [] } = useQuery<Class[]>({
    queryKey: ["/api/classes"],
  });

  const { data: modalities = [] } = useQuery<Modality[]>({
    queryKey: ["/api/modalities"],
  });

  const { data: instructors = [] } = useQuery<Instructor[]>({
    queryKey: ["/api/instructors"],
  });

  const { data: enrollmentsData = [] } = useQuery<Enrollment[]>({
    queryKey: ["/api/enrollments"],
  });

  const createMutation = useMutation({
    mutationFn: (data: InsertClass) => apiRequest("/api/classes", "POST", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/classes"] });
      setDialogOpen(false);
      toast({
        title: "Aula criada",
        description: "A aula foi adicionada à grade com sucesso!",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível criar a aula.",
        variant: "destructive",
      });
    },
  });

  const handleAddClass = () => {
    setDialogOpen(true);
  };

  const handleSave = (classData: any) => {
    createMutation.mutate(classData);
  };

  const scheduleClasses: ScheduleClass[] = classes.map((classItem) => {
    const modality = modalities.find((m) => m.id === classItem.modalityId);
    const instructor = instructors.find((i) => i.id === classItem.instructorId);
    const enrolled = enrollmentsData.filter((e) => e.classId === classItem.id).length;

    return {
      id: classItem.id,
      modality: modality?.name || "N/A",
      instructor: instructor?.name || "N/A",
      time: classItem.time,
      day: classItem.dayOfWeek,
      enrolled,
      capacity: classItem.capacity,
    };
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Agenda</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Gerencie sua grade de aulas semanal
        </p>
      </div>

      <ScheduleGrid
        classes={scheduleClasses}
        onAddClass={handleAddClass}
        onClassClick={(id) => console.log("Class clicked:", id)}
      />

      <AddClassDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSave}
        modalities={modalities}
        instructors={instructors}
        isPending={createMutation.isPending}
      />
    </div>
  );
}
