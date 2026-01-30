import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Linkedin, MessageCircle, Youtube } from "lucide-react";
import nickLockettImg from "@/assets/nick-lockett.png";
import sushilaNairImg from "@/assets/sushila-nair.png";
import rajivAbeysingheImg from "@/assets/rajiv-abeysinghe.png";
import teamBg from "@/assets/team-consultation-bg.jpg";
import ConsultationIntakeDialog from "@/components/ConsultationIntakeDialog";

const teamMembers = [
  {
    name: "Sushila Nair",
    title: "Cybersecurity Consultant",
    bio: "Former Vice President of Cybersecurity Services at Capgemini and NTT DATA. Award-winning security leader with deep expertise in enterprise security architecture, regulatory compliance (NIST, ISO 27001, PCI-DSS), and global security program development.",
    specialties: "Cybersecurity, AI Security, and Regulatory Audit",
    linkedin: "https://www.linkedin.com/in/sushilanair/",
    youtube: "https://www.youtube.com/@cyberneticllc",
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
    bio: "Strategic AI consultant with 27 years' experience transforming legacy applications into AI-ready platforms. Co-creator of the ASIMOV-AI Risk Method achieving 2× faster compliance, 35% audit improvement, and 40% technical debt reduction. Former Program Strategist at VMware Tanzu Labs and Technical Lead at Computacenter, delivering measurable outcomes across finance, healthcare, and public sector.",
    specialties: "AI Governance & Compliance • Application Modernisation • Data Migration • AI CI/CD • AI Delivery LLM integration • AI Agents",
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
    name: "Dr Nick Lockett",
    title: "Barrister & Solicitor | Partner Associate, Asimov-AI",
    bio: "Recognized Barrister & Solicitor and Partner Associate in Asimov-AI. Founder of CAAIRO London Centre for the Assessment of AI Risk & Opportunity. His advocate and legal work continues through ADL Legal, his law practice, specializing in AI governance, intellectual property, commercial technology law, and regulatory compliance for technology businesses.",
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
  const navigate = useNavigate();

  const handleContactClick = () => {
    setDialogOpen(true);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={teamBg} alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/95 to-background/90" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
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

                <div className="flex flex-col items-center gap-2 mb-3">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn Profile
                  </a>
                  {/* @ts-ignore */}
                  {member.youtube && (
                    <a
                      /* @ts-ignore */
                      href={member.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors"
                    >
                      <Youtube className="w-4 h-4" />
                      YouTube Channel
                    </a>
                  )}
                </div>

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

                {member.name === "Sushila Nair" && (
                  <Button
                    variant="outline"
                    className="w-full border-accent text-accent hover:bg-accent hover:text-white"
                    onClick={() => navigate('/sushi')}
                  >
                    <Youtube className="w-4 h-4 mr-2" />
                    View AI Risk Session
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
