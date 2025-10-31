import { Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ContactInfo = () => {
  return (
    <Card className="border-border">
      <CardContent className="pt-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Email Us</h3>
              <a href="mailto:info@asimov-ai.org" className="text-muted-foreground hover:text-accent transition-colors">
                info@asimov-ai.org
              </a>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Phone / WhatsApp</h3>
              <a href="tel:+441234567890" className="text-muted-foreground hover:text-accent transition-colors">
                +44 (0) 123 456 7890
              </a>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Location</h3>
              <p className="text-muted-foreground">
                London, United Kingdom
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactInfo;
