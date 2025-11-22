import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface Instructor {
  id: string;
  name: string;
  email: string;
  modalities: string[];
}

interface InstructorCardProps {
  instructor: Instructor;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function InstructorCard({ instructor, onEdit, onDelete }: InstructorCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card data-testid={`instructor-card-${instructor.id}`} className="border-l-4 border-l-purple-500">
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-3">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-500">
            <AvatarFallback className="bg-transparent text-white font-bold">{getInitials(instructor.name)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{instructor.name}</h3>
            <p className="text-sm text-muted-foreground">{instructor.email}</p>
          </div>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit?.(instructor.id)}
            data-testid={`button-edit-${instructor.id}`}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete?.(instructor.id)}
            data-testid={`button-delete-${instructor.id}`}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm font-medium">Modalidades</p>
          <div className="flex flex-wrap gap-2">
            {instructor.modalities.map((modality, index) => (
              <Badge key={index} variant="secondary">
                {modality}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
