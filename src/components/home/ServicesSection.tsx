import { ClipboardCheck, Users, GraduationCap, BarChart3, FileText, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: ClipboardCheck,
    title: "AI Risk Assessment",
    description: "Comprehensive evaluation of your AI systems to identify risks, gaps, and compliance requirements.",
    link: "/assessment",
  },
  {
    icon: Users,
    title: "Expert Consultation",
    description: "One-on-one sessions with AI governance experts to address your specific challenges.",
    link: "/consultation",
  },
  {
    icon: GraduationCap,
    title: "Training Programs",
    description: "Upskill your team on AI ethics, governance, and regulatory compliance best practices.",
    link: "/training",
  },
  {
    icon: BarChart3,
    title: "Maturity Assessment",
    description: "Benchmark your AI governance maturity against industry standards and best practices.",
    link: "/assessment",
  },
  {
    icon: FileText,
    title: "Documentation Support",
    description: "Help preparing technical documentation required for EU AI Act compliance.",
    link: "/consultation",
  },
  {
    icon: Lock,
    title: "Security Review",
    description: "Evaluate AI system security, data protection, and privacy compliance measures.",
    link: "/consultation",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive AI governance solutions tailored to your organization's needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Link
              key={index}
              to={service.link}
              className="group bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300"
            >
              <div className="rounded-lg bg-primary/10 p-3 w-fit mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <service.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {service.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
