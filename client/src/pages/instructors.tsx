import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { InstructorCard } from "@/components/instructor-card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Plus, Loader2 } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Instructor, InsertInstructor, Modality } from "@shared/schema";

interface InstructorWithModalities extends Instructor {
  modalities: string[];
}

export default function Instructors() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingInstructor, setEditingInstructor] = useState<Instructor | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [selectedModalities, setSelectedModalities] = useState<string[]>([]);

  const { data: instructors = [], isLoading: isLoadingInstructors } = useQuery<Instructor[]>({
    queryKey: ["/api/instructors"],
  });

  const { data: allModalities = [] } = useQuery<Modality[]>({
    queryKey: ["/api/modalities"],
  });

  const { data: instructorModalitiesMap = {} } = useQuery<Record<string, Modality[]>>({
    queryKey: ["/api/instructors-modalities-map"],
  });

  const createMutation = useMutation({
    mutationFn: async ({ data, modalityIds }: { data: InsertInstructor; modalityIds: string[] }) => {
      const instructor = await apiRequest("/api/instructors", "POST", data);
      for (const modalityId of modalityIds) {
        await apiRequest("/api/instructor-modalities", "POST", {
          instructorId: instructor.id,
          modalityId,
        });
      }
      return instructor;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/instructors"] });
      queryClient.invalidateQueries({ queryKey: ["/api/instructors-modalities-map"] });
      setIsDialogOpen(false);
      setFormData({ name: "", email: "" });
      setSelectedModalities([]);
      toast({
        title: "Instrutor criado",
        description: "O instrutor foi criado com sucesso!",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível criar o instrutor.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data, modalityIds, currentModalityIds }: { 
      id: string; 
      data: Partial<InsertInstructor>; 
      modalityIds: string[];
      currentModalityIds: string[];
    }) => {
      const instructor = await apiRequest(`/api/instructors/${id}`, "PUT", data);
      
      const toAdd = modalityIds.filter(modalityId => !currentModalityIds.includes(modalityId));
      const toRemove = currentModalityIds.filter(modalityId => !modalityIds.includes(modalityId));
      
      for (const modalityId of toAdd) {
        await apiRequest("/api/instructor-modalities", "POST", {
          instructorId: id,
          modalityId,
        });
      }
      
      for (const modalityId of toRemove) {
        await apiRequest("/api/instructor-modalities", "DELETE", {
          instructorId: id,
          modalityId,
        });
      }
      
      return instructor;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/instructors"] });
      queryClient.invalidateQueries({ queryKey: ["/api/instructors-modalities-map"] });
      setIsDialogOpen(false);
      setEditingInstructor(null);
      setFormData({ name: "", email: "" });
      setSelectedModalities([]);
      toast({
        title: "Instrutor atualizado",
        description: "O instrutor foi atualizado com sucesso!",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o instrutor.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest(`/api/instructors/${id}`, "DELETE"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/instructors"] });
      queryClient.invalidateQueries({ queryKey: ["/api/instructors-modalities-map"] });
      toast({
        title: "Instrutor removido",
        description: "O instrutor foi removido com sucesso!",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível remover o instrutor.",
        variant: "destructive",
      });
    },
  });

  const handleAdd = () => {
    setEditingInstructor(null);
    setFormData({ name: "", email: "" });
    setSelectedModalities([]);
    setIsDialogOpen(true);
  };

  const handleEdit = (instructor: InstructorWithModalities) => {
    const fullInstructor = instructors.find(i => i.id === instructor.id);
    if (!fullInstructor) return;
    
    setEditingInstructor(fullInstructor);
    setFormData({ name: fullInstructor.name, email: fullInstructor.email });
    const modalities = instructorModalitiesMap[fullInstructor.id] || [];
    setSelectedModalities(modalities.map(m => m.id));
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja remover este instrutor?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingInstructor) {
      const currentModalities = instructorModalitiesMap[editingInstructor.id] || [];
      const currentModalityIds = currentModalities.map(m => m.id);
      updateMutation.mutate({ 
        id: editingInstructor.id, 
        data: formData,
        modalityIds: selectedModalities,
        currentModalityIds,
      });
    } else {
      createMutation.mutate({ data: formData, modalityIds: selectedModalities });
    }
  };

  const toggleModality = (modalityId: string) => {
    setSelectedModalities(prev =>
      prev.includes(modalityId)
        ? prev.filter(id => id !== modalityId)
        : [...prev, modalityId]
    );
  };

  const instructorsWithModalities: InstructorWithModalities[] = instructors.map(instructor => ({
    ...instructor,
    modalities: (instructorModalitiesMap[instructor.id] || []).map(m => m.name),
  }));

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold">Instrutores</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gerencie os instrutores do seu estúdio
          </p>
        </div>
        <Button onClick={handleAdd} data-testid="button-add-instructor">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Instrutor
        </Button>
      </div>

      {isLoadingInstructors ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      ) : instructorsWithModalities.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Nenhum instrutor cadastrado</p>
            <Button onClick={handleAdd} className="mt-4" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar primeiro instrutor
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {instructorsWithModalities.map((instructor) => (
            <InstructorCard
              key={instructor.id}
              instructor={instructor}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent data-testid="dialog-instructor">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>{editingInstructor ? "Editar Instrutor" : "Novo Instrutor"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nome completo..."
                  required
                  data-testid="input-instructor-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@exemplo.com"
                  required
                  data-testid="input-instructor-email"
                />
              </div>
              <div className="space-y-2">
                <Label>Modalidades</Label>
                <div className="space-y-2 max-h-48 overflow-y-auto border rounded-md p-3">
                  {allModalities.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Nenhuma modalidade cadastrada</p>
                  ) : (
                    allModalities.map((modality) => (
                      <div key={modality.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`modality-${modality.id}`}
                          checked={selectedModalities.includes(modality.id)}
                          onCheckedChange={() => toggleModality(modality.id)}
                          data-testid={`checkbox-modality-${modality.id}`}
                        />
                        <Label
                          htmlFor={`modality-${modality.id}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {modality.name}
                        </Label>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsDialogOpen(false);
                  setEditingInstructor(null);
                  setFormData({ name: "", email: "" });
                  setSelectedModalities([]);
                }}
                disabled={isPending}
                data-testid="button-cancel"
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isPending} data-testid="button-save">
                {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {editingInstructor ? "Salvar" : "Criar"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
