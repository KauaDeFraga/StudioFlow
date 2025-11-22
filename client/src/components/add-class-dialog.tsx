import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import type { Class, Modality, Instructor } from "@shared/schema";

interface AddClassDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (classData: any) => void;
  modalities: Modality[];
  instructors: Instructor[];
  isPending?: boolean;
}

const daysOfWeek = [
  { value: "0", label: "Segunda" },
  { value: "1", label: "Terça" },
  { value: "2", label: "Quarta" },
  { value: "3", label: "Quinta" },
  { value: "4", label: "Sexta" },
  { value: "5", label: "Sábado" },
  { value: "6", label: "Domingo" },
];

export function AddClassDialog({ open, onOpenChange, onSave, modalities, instructors, isPending = false }: AddClassDialogProps) {
  const [formData, setFormData] = useState({
    modalityId: "",
    instructorId: "",
    dayOfWeek: "",
    time: "",
    capacity: "",
  });

  useEffect(() => {
    if (!open) {
      setFormData({
        modalityId: "",
        instructorId: "",
        dayOfWeek: "",
        time: "",
        capacity: "",
      });
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave?.({
      modalityId: formData.modalityId,
      instructorId: formData.instructorId,
      dayOfWeek: parseInt(formData.dayOfWeek),
      time: formData.time,
      capacity: parseInt(formData.capacity),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-testid="dialog-class">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Adicionar Nova Aula</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="modality">Modalidade</Label>
              <Select
                value={formData.modalityId}
                onValueChange={(value) => setFormData({ ...formData, modalityId: value })}
              >
                <SelectTrigger id="modality" data-testid="select-modality">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {modalities.map((modality) => (
                    <SelectItem key={modality.id} value={modality.id}>
                      {modality.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="instructor">Instrutor</Label>
              <Select
                value={formData.instructorId}
                onValueChange={(value) => setFormData({ ...formData, instructorId: value })}
              >
                <SelectTrigger id="instructor" data-testid="select-instructor">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {instructors.map((instructor) => (
                    <SelectItem key={instructor.id} value={instructor.id}>
                      {instructor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="day">Dia da Semana</Label>
                <Select
                  value={formData.dayOfWeek}
                  onValueChange={(value) => setFormData({ ...formData, dayOfWeek: value })}
                >
                  <SelectTrigger id="day" data-testid="select-day">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    {daysOfWeek.map((day) => (
                      <SelectItem key={day.value} value={day.value}>
                        {day.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Horário</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  required
                  data-testid="input-time"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="capacity">Capacidade</Label>
              <Input
                id="capacity"
                type="number"
                min="1"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                placeholder="Ex: 30"
                required
                data-testid="input-capacity"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
              data-testid="button-cancel"
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending} data-testid="button-save">
              {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Criar Aula
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
