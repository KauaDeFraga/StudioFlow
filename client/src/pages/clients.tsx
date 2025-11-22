import { useState } from "react";
import { ClientList } from "@/components/client-list";
import { AddClientDialog } from "@/components/add-client-dialog";

export default function Clients() {
  const [dialogOpen, setDialogOpen] = useState(false);

  // TODO: remove mock functionality
  const mockClients = [
    {
      id: "1",
      name: "Maria Silva",
      email: "maria.silva@email.com",
      phone: "+55 11 98765-4321",
      status: "ativo" as const,
      startDate: "2024-01-15",
    },
    {
      id: "2",
      name: "João Santos",
      email: "joao.santos@email.com",
      phone: "+55 11 91234-5678",
      status: "ativo" as const,
      startDate: "2024-02-20",
    },
    {
      id: "3",
      name: "Ana Costa",
      email: "ana.costa@email.com",
      phone: "+55 11 99876-5432",
      status: "devedor" as const,
      startDate: "2023-11-10",
    },
    {
      id: "4",
      name: "Pedro Oliveira",
      email: "pedro.oliveira@email.com",
      phone: "+55 11 97654-3210",
      status: "inativo" as const,
      startDate: "2023-08-05",
    },
    {
      id: "5",
      name: "Laura Mendes",
      email: "laura.mendes@email.com",
      phone: "+55 11 99123-4567",
      status: "ativo" as const,
      startDate: "2024-03-12",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Clientes</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Gerencie os membros do seu estúdio
        </p>
      </div>

      <ClientList
        clients={mockClients}
        onAddClient={() => setDialogOpen(true)}
        onEditClient={(id) => console.log("Edit client:", id)}
      />

      <AddClientDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={(client) => console.log("Client saved:", client)}
      />
    </div>
  );
}
