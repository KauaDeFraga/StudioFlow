import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Modality, InsertModality } from "@shared/schema";

export default function Modalities() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingModality, setEditingModality] = useState<Modality | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "" });

  const { data: modalities = [], isLoading } = useQuery<Modality[]>({
    queryKey: ["/api/modalities"],
  });

  const createMutation = useMutation({
    mutationFn: (data: InsertModality) => apiRequest("POST", "/api/modalities", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/modalities"] });
      setIsDialogOpen(false);
      setFormData({ name: "", description: "" });
      toast({
        title: "Modalidade criada",
        description: "A modalidade foi criada com sucesso!",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível criar a modalidade.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<InsertModality> }) =>
      apiRequest("PUT", `/api/modalities/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/modalities"] });
      setIsDialogOpen(false);
      setEditingModality(null);
      setFormData({ name: "", description: "" });
      toast({
        title: "Modalidade atualizada",
        description: "A modalidade foi atualizada com sucesso!",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a modalidade.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/modalities/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/modalities"] });
      toast({
        title: "Modalidade removida",
        description: "A modalidade foi removida com sucesso!",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível remover a modalidade.",
        variant: "destructive",
      });
    },
  });

  const handleAdd = () => {
    setEditingModality(null);
    setFormData({ name: "", description: "" });
    setIsDialogOpen(true);
  };

  const handleEdit = (modality: Modality) => {
    setEditingModality(modality);
    setFormData({ name: modality.name, description: modality.description });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja remover esta modalidade?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingModality) {
      updateMutation.mutate({ id: editingModality.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold">Modalidades</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gerencie os tipos de aula oferecidos no seu estúdio
          </p>
        </div>
        <Button onClick={handleAdd} data-testid="button-add-modality">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Modalidade
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      ) : modalities.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Nenhuma modalidade cadastrada</p>
            <Button onClick={handleAdd} className="mt-4" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar primeira modalidade
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modalities.map((modality) => {
            return (
              <Card key={modality.id} data-testid={`modality-card-${modality.id}`} className="border-l-4 border-l-primary">
                <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-3">
                  <div>
                    <h3 className="font-semibold">{modality.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{modality.description}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(modality)}
                      data-testid={`button-edit-${modality.id}`}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(modality.id)}
                      data-testid={`button-delete-${modality.id}`}
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent data-testid="dialog-modality">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>{editingModality ? "Editar Modalidade" : "Nova Modalidade"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Spinning, Yoga..."
                  required
                  data-testid="input-modality-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descreva a modalidade..."
                  required
                  data-testid="input-modality-description"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                disabled={isPending}
                data-testid="button-cancel"
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isPending} data-testid="button-save">
                {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {editingModality ? "Salvar" : "Criar"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
