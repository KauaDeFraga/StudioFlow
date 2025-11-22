import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Client } from "@shared/schema";

interface AddClientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (client: any) => void;
  editingClient?: Client | null;
  isPending?: boolean;
}

export function AddClientDialog({ open, onOpenChange, onSave, editingClient, isPending = false }: AddClientDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "ativo",
    startDate: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (editingClient) {
      setFormData({
        name: editingClient.name,
        email: editingClient.email,
        phone: editingClient.phone,
        status: editingClient.status,
        startDate: editingClient.startDate instanceof Date
          ? editingClient.startDate.toISOString().split('T')[0]
          : new Date(editingClient.startDate).toISOString().split('T')[0],
      });
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        status: "ativo",
        startDate: new Date().toISOString().split('T')[0],
      });
    }
  }, [editingClient, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave?.(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {editingClient ? "Editar Cliente" : "Adicionar Novo Cliente"}
          </DialogTitle>
          <DialogDescription>Digite as informações do cliente abaixo.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                data-testid="input-client-name"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  data-testid="input-client-email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  data-testid="input-client-phone"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger id="status" data-testid="select-client-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="inativo">Inativo</SelectItem>
                    <SelectItem value="devedor">Devedor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Data de Início</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  data-testid="input-client-start-date"
                />
              </div>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
              data-testid="button-cancel"
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending} data-testid="button-save-client">
              {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {editingClient ? "Atualizar" : "Salvar"} Cliente
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
