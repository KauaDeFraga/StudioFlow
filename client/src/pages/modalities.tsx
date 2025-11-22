import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Modality {
  id: string;
  name: string;
  description: string;
  instructorCount: number;
}

export default function Modalities() {
  // TODO: remove mock functionality
  const mockModalities: Modality[] = [
    {
      id: "1",
      name: "Spinning",
      description: "Treino de ciclismo de alta intensidade",
      instructorCount: 2,
    },
    {
      id: "2",
      name: "Yoga",
      description: "Prática corpo-mente para flexibilidade",
      instructorCount: 2,
    },
    {
      id: "3",
      name: "HIIT",
      description: "Treinamento intervalado de alta intensidade",
      instructorCount: 2,
    },
    {
      id: "4",
      name: "Pilates",
      description: "Exercícios de baixo impacto para core",
      instructorCount: 2,
    },
    {
      id: "5",
      name: "Funcional",
      description: "Exercícios para atividades do dia a dia",
      instructorCount: 2,
    },
    {
      id: "6",
      name: "Yoga Flow",
      description: "Sequências dinâmicas de yoga",
      instructorCount: 1,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold">Modalidades</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gerencie os tipos de aula oferecidos no seu estúdio
          </p>
        </div>
        <Button data-testid="button-add-modality">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Modalidade
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockModalities.map((modality, index) => {
          const gradients = [
            "border-l-purple-500 bg-gradient-to-br from-purple-50 to-transparent dark:from-purple-900/20",
            "border-l-cyan-500 bg-gradient-to-br from-cyan-50 to-transparent dark:from-cyan-900/20",
            "border-l-pink-500 bg-gradient-to-br from-pink-50 to-transparent dark:from-pink-900/20",
            "border-l-amber-500 bg-gradient-to-br from-amber-50 to-transparent dark:from-amber-900/20",
            "border-l-emerald-500 bg-gradient-to-br from-emerald-50 to-transparent dark:from-emerald-900/20",
            "border-l-rose-500 bg-gradient-to-br from-rose-50 to-transparent dark:from-rose-900/20",
          ];
          return (
          <Card key={modality.id} data-testid={`modality-card-${modality.id}`} className={`border-l-4 ${gradients[index % gradients.length]}`}>
            <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-3">
              <div>
                <h3 className="font-semibold">{modality.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{modality.description}</p>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => console.log("Edit modality:", modality.id)}
                  data-testid={`button-edit-${modality.id}`}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => console.log("Delete modality:", modality.id)}
                  data-testid={`button-delete-${modality.id}`}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary">
                {modality.instructorCount} {modality.instructorCount === 1 ? 'instrutor' : 'instrutores'}
              </Badge>
            </CardContent>
          </Card>
          );
        })}
      </div>
    </div>
  );
}
