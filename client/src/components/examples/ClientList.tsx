import { ClientList } from "../client-list";

export default function ClientListExample() {
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
  ];

  return (
    <ClientList
      clients={mockClients}
      onAddClient={() => console.log("Add client clicked")}
      onEditClient={(id) => console.log("Edit client:", id)}
    />
  );
}
