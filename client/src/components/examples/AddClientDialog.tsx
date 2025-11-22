import { useState } from "react";
import { AddClientDialog } from "../add-client-dialog";
import { Button } from "@/components/ui/button";

export default function AddClientDialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <AddClientDialog
        open={open}
        onOpenChange={setOpen}
        onSave={(client) => console.log("Client saved:", client)}
      />
    </div>
  );
}
