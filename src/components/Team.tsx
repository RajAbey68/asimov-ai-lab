import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Linkedin, MessageCircle } from "lucide-react";
import nickLockettImg from "@/assets/nick-lockett.png";
import sushilaNairImg from "@/assets/sushila-nair.png";

const teamMembers = [
  {
    name: "Sushila Nair",
    title: "Independent Cybersecurity Consultant",
    bio: "Former VP of Cybersecurity Services at Capgemini and NTT DATA. Award-winning security leader with deep expertise in enterprise security architecture, regulatory compliance (NIST, ISO 27001, PCI-DSS), and global security program development.",
    linkedin: "https://www.linkedin.com/in/sushilanair/",
    image: sushilaNairImg,
    whatsapp: "+1234567890" // Replace with actual number
  },
  {
    name: "Rajiv AB",
    title: "Co-founder, Asimov-AI RISK",
    bio: "AI governance expert and creator of the ASIMOV-AI Risk Method. Specializes in EU AI Act compliance, responsible AI frameworks, and strategic transformation programs with 25+ years of experience across global enterprises.",
    linkedin: "https://www.linkedin.com/in/rajivab/",
    image: "/placeholder.svg", // Replace with actual image
    whatsapp: "+1234567890" // Replace with actual number
  },
  {
    name: "Nick Lockett",
    title: "Founder, CAAIRO & Managing Partner, ADL Solicitors",
    bio: "Technology lawyer and founder of CAAIRO London Centre for the Assessment of AI Risk & Opportunity. CEO Managing Partner at ADL Solicitors specializing in AI governance, intellectual property, commercial technology law, and regulatory compliance for technology businesses.",
    linkedin: "https://www.linkedin.com/in/nicklockett/",
    image: nickLockettImg,
    whatsapp: "+1234567890" // Replace with actual number
  }
];

const Team = () => {
  const handleWhatsApp = (phone: string) => {
    window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}`, '_blank');
  };

  return (
    <section className="py-24 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Expert professionals dedicated to helping you navigate AI governance with confidence
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
                
                <p className="text-sm text-muted-foreground mb-6">
                  {member.bio}
                </p>
                
                <Button 
                  onClick={() => handleWhatsApp(member.whatsapp)}
                  className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact on WhatsApp
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
