import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ConsultationIntakeForm } from "@/components/ConsultationIntakeForm";

interface ConsultationIntakeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ConsultationIntakeDialog({
  open,
  onOpenChange,
}: ConsultationIntakeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Request a Consultation</DialogTitle>
        </DialogHeader>
        <ConsultationIntakeForm onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
