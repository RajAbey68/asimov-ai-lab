import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Linkedin, MessageCircle } from "lucide-react";
import nickLockettImg from "@/assets/nick-lockett.png";
import sushilaNairImg from "@/assets/sushila-nair.png";
import rajivAbeysingheImg from "@/assets/rajiv-abeysinghe.png";
import ConsultationIntakeDialog from "@/components/ConsultationIntakeDialog";

const teamMembers = [
  {
    name: "Sushila Nair",
    title: "Independent Cybersecurity Consultant",
    bio: "Former Vice President of Cybersecurity Services at Capgemini and NTT DATA. Award-winning security leader with deep expertise in enterprise security architecture, regulatory compliance (NIST, ISO 27001, PCI-DSS), and global security program development.",
    specialties: "Cybersecurity, AI Security, and Regulatory Audit",
    linkedin: "https://www.linkedin.com/in/sushilanair/",
    image: sushilaNairImg,
    whatsapp: "+447733393956",
    telegram: "@SushilaNair",
    rates: {
      initial: "$450",
      followUp: "$300"
    }
  },
  {
    name: "Rajiv AB",
    title: "Co-founder, Asimov-AI RISK",
    bio: "AI governance expert and creator of the ASIMOV-AI Risk Method. Specializes in EU AI Act compliance, responsible AI frameworks, and strategic transformation programs with 25+ years of experience across global enterprises.",
    specialties: "AI Application Delivery, Platform Migration, Data Migration, and CI/CD Implementation for AI Platforms",
    linkedin: "https://www.linkedin.com/in/rajivab/",
    image: rajivAbeysingheImg,
    whatsapp: "+447733393956",
    telegram: "@RajivAB",
    email: "Rajiv@ASIMOV-AI.ORG",
    rates: {
      initial: "$400",
      followUp: "$360"
    }
  },
  {
    name: "Nick Lockett",
    title: "Founder, CAAIRO & Managing Partner, ADL Solicitors",
    bio: "Technology lawyer and founder of CAAIRO London Centre for the Assessment of AI Risk & Opportunity. CEO Managing Partner at ADL Solicitors specializing in AI governance, intellectual property, commercial technology law, and regulatory compliance for technology businesses.",
    specialties: "AI Legal Frameworks, Regulatory Compliance, and Intellectual Property",
    linkedin: "https://www.linkedin.com/in/nicklockett/",
    image: nickLockettImg,
    whatsapp: "+447733393956",
    telegram: "@NickLockett",
    rates: {
      initial: "$550",
      followUp: "$500"
    }
  }
];

const Team = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleContactClick = () => {
    setDialogOpen(true);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">Expert Practitioners</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Meet Your Consulting Team</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Senior practitioners with real-world experience in AI governance, cybersecurity, legal compliance, and enterprise technology delivery.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <Card 
              key={index} 
              className="p-6 hover:shadow-xl transition-all duration-300 bg-card border-border/50"
            >
              <div className="text-center">
                <div className="mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-accent/20"
                  />
                </div>
                
                <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                
                <a 
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors mb-3"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn Profile
                </a>
                
                <p className="text-lg font-semibold text-muted-foreground mb-3">
                  {member.title}
                </p>
                
                <p className="text-sm text-muted-foreground mb-4">
                  {member.bio}
                </p>
                
                <div className="mb-6 p-3 bg-accent/10 rounded-lg border border-accent/20">
                  <h4 className="text-xs font-semibold mb-2 text-accent uppercase tracking-wide">Specialties</h4>
                  <p className="text-sm text-foreground">{member.specialties}</p>
                </div>
                
                <div className="mb-6 p-4 bg-muted/50 rounded-lg border border-border/50">
                  <h4 className="text-sm font-semibold mb-3 text-foreground">Online Consultation Rates</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Each consultation includes pre-meeting questionnaire review, clarification discussions, and comprehensive preparation for your 50-minute session
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Initial Session:</span>
                      <span className="text-sm font-semibold text-accent">{member.rates.initial}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Follow-up:</span>
                      <span className="text-sm font-semibold text-accent">{member.rates.followUp}</span>
                    </div>
                  </div>
                </div>
                
                {member.name === "Rajiv AB" && (
                  <Button 
                    onClick={handleContactClick}
                    className="w-full"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Request Consultation
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      <ConsultationIntakeDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </section>
  );
};

export default Team;
