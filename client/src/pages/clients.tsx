import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ClientList } from "@/components/client-list";
import { AddClientDialog } from "@/components/add-client-dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Client, InsertClient } from "@shared/schema";

interface ClientFormData {
  name: string;
  email: string;
  phone: string;
  status: string;
  startDate: string;
}

export default function Clients() {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const { data: clients = [], isLoading } = useQuery<Client[]>({
    queryKey: ["/api/clients"],
  });

  const createMutation = useMutation({
    mutationFn: (data: InsertClient) => apiRequest("POST", "/api/clients", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/clients"] });
      setDialogOpen(false);
      setEditingClient(null);
      toast({
        title: "Cliente criado",
        description: "O cliente foi criado com sucesso!",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível criar o cliente.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<InsertClient> }) =>
      apiRequest("PUT", `/api/clients/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/clients"] });
      setDialogOpen(false);
      setEditingClient(null);
      toast({
        title: "Cliente atualizado",
        description: "O cliente foi atualizado com sucesso!",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o cliente.",
        variant: "destructive",
      });
    },
  });

  const handleAddClient = () => {
    setEditingClient(null);
    setDialogOpen(true);
  };

  const handleEditClient = (id: string) => {
    const client = clients.find(c => c.id === id);
    if (client) {
      setEditingClient(client);
      setDialogOpen(true);
    }
  };

  const handleSave = (formData: ClientFormData) => {
    const clientData: InsertClient = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      status: formData.status,
      startDate: new Date(formData.startDate + 'T00:00:00.000Z'),
    };

    if (editingClient) {
      updateMutation.mutate({ id: editingClient.id, data: clientData });
    } else {
      createMutation.mutate(clientData);
    }
  };

  const clientsWithFormattedDates = clients.map(client => {
    const date = client.startDate instanceof Date 
      ? client.startDate
      : new Date(client.startDate);
    
    return {
      ...client,
      startDate: date.toISOString().split('T')[0],
    } as Client & { startDate: string };
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Clientes</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Gerencie os membros do seu estúdio
        </p>
      </div>

      <ClientList
        clients={clientsWithFormattedDates as any}
        onAddClient={handleAddClient}
        onEditClient={handleEditClient}
        isLoading={isLoading}
      />

      <AddClientDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSave}
        editingClient={editingClient}
        isPending={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
}
