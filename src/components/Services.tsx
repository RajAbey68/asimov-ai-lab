import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Rocket, FileCheck, Users, Layers, Sparkles } from "lucide-react";
import servicesBg from "@/assets/services-bg.jpg";
import riskAssessmentImg from "@/assets/risk-assessment-team.jpg";
import projectDeliveryImg from "@/assets/project-delivery.jpg";
import rapidAssessmentImg from "@/assets/rapid-assessment.jpg";
import expertConsultationImg from "@/assets/expert-consultation.jpg";
import integrationSupportImg from "@/assets/integration-support.jpg";
import continuousMonitoringImg from "@/assets/continuous-monitoring.jpg";

const Services = () => {
  const services = [
    {
      icon: Shield,
      title: "AI Risk Assessment",
      description: "Comprehensive evaluation of AI systems to identify vulnerabilities, compliance gaps, and operational risks before deployment.",
      features: ["Regulatory Compliance", "Security Analysis", "Bias Detection", "Impact Assessment"],
      image: riskAssessmentImg
    },
    {
      icon: Rocket,
      title: "AI Project Delivery",
      description: "End-to-end execution of AI initiatives from strategy to deployment, ensuring quality, speed, and alignment with business goals.",
      features: ["Strategy Development", "Model Development", "Integration Services", "Performance Optimisation"],
      image: projectDeliveryImg
    },
    {
      icon: FileCheck,
      title: "Rapid Assessment",
      description: "Quick turnaround risk evaluation for time-sensitive projects, delivering actionable insights in days, not weeks.",
      features: ["Fast Analysis", "Priority Scoring", "Immediate Recommendations", "Compliance Checking"],
      image: rapidAssessmentImg
    },
    {
      icon: Users,
      title: "Expert Consultation",
      description: "Access to seasoned AI professionals who provide strategic guidance and technical expertise throughout your AI journey.",
      features: ["Technical Advisory", "Best Practices", "Architecture Review", "Team Training"],
      image: expertConsultationImg
    },
    {
      icon: Layers,
      title: "Integration Support",
      description: "Seamless integration of AI solutions into your existing infrastructure with minimal disruption and maximum efficiency.",
      features: ["API Integration", "Legacy System Support", "Cloud Migration", "Workflow Automation"],
      image: integrationSupportImg
    },
    {
      icon: Sparkles,
      title: "Continuous Monitoring",
      description: "Ongoing surveillance of deployed AI systems to ensure sustained performance, security, and compliance over time.",
      features: ["Real-time Monitoring", "Drift Detection", "Performance Metrics", "Alert Management"],
      image: continuousMonitoringImg
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Strategic AI Advisory Services</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive governance solutions designed for senior leadership teams navigating the complex AI landscape
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="bg-card rounded-xl shadow-lg hover:shadow-xl transition-shadow p-8 border-l-4 border-primary">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-6">
                <service.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                <CardDescription className="text-base text-muted-foreground">{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <a 
                  href="#book-consultation" 
                  className="text-primary font-semibold hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('book-consultation')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Learn More →
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
