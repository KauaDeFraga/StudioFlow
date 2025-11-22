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
      description: "High-intensity cycling workout",
      instructorCount: 2,
    },
    {
      id: "2",
      name: "Yoga",
      description: "Mind-body practice for flexibility and balance",
      instructorCount: 2,
    },
    {
      id: "3",
      name: "HIIT",
      description: "High-Intensity Interval Training",
      instructorCount: 2,
    },
    {
      id: "4",
      name: "Pilates",
      description: "Low-impact exercises for core strength",
      instructorCount: 2,
    },
    {
      id: "5",
      name: "Functional Training",
      description: "Exercises that train muscles for daily activities",
      instructorCount: 2,
    },
    {
      id: "6",
      name: "Yoga Flow",
      description: "Dynamic yoga sequences",
      instructorCount: 1,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold">Modalities</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage class types offered at your studio
          </p>
        </div>
        <Button data-testid="button-add-modality">
          <Plus className="w-4 h-4 mr-2" />
          Add Modality
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockModalities.map((modality) => (
          <Card key={modality.id} data-testid={`modality-card-${modality.id}`}>
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
                {modality.instructorCount} {modality.instructorCount === 1 ? 'instructor' : 'instructors'}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
