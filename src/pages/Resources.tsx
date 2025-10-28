import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileText, Video, ExternalLink, Download } from "lucide-react";

const Resources = () => {
  const papers = [
    {
      title: "AI Risk Assessment Framework - RFC 2024",
      description: "Comprehensive framework for evaluating and mitigating risks in AI systems",
      type: "RFC Document",
      date: "2024",
    },
    {
      title: "Best Practices for AI Model Deployment",
      description: "Industry standards and guidelines for safe AI deployment in production",
      type: "White Paper",
      date: "2024",
    },
    {
      title: "Ethical Considerations in AI Development",
      description: "Analysis of ethical implications and responsible AI development practices",
      type: "Research Paper",
      date: "2023",
    },
  ];

  const videos = [
    {
      title: "Introduction to AI Risk Assessment",
      description: "Overview of key concepts and methodologies in AI risk evaluation",
      duration: "15 min",
    },
    {
      title: "Case Study: Enterprise AI Deployment",
      description: "Real-world example of successful AI project delivery",
      duration: "22 min",
    },
    {
      title: "AI Compliance and Regulatory Landscape",
      description: "Understanding current and upcoming AI regulations",
      duration: "18 min",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Resources</h1>
              <p className="text-xl text-muted-foreground">
                Videos, papers, and RFC documents to guide your AI journey
              </p>
            </div>

            <Tabs defaultValue="videos" className="space-y-8">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                <TabsTrigger value="videos">Videos</TabsTrigger>
                <TabsTrigger value="papers">Papers & RFCs</TabsTrigger>
              </TabsList>

              <TabsContent value="videos" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {videos.map((video, index) => (
                    <Card key={index} className="border-border hover:border-accent/50 transition-all group">
                      <CardHeader>
                        <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Video className="w-6 h-6 text-accent-foreground" />
                        </div>
                        <CardTitle className="text-xl">{video.title}</CardTitle>
                        <CardDescription>{video.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{video.duration}</span>
                          <Button variant="outline" size="sm" className="gap-2">
                            Watch <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="papers" className="space-y-6">
                <div className="grid gap-6">
                  {papers.map((paper, index) => (
                    <Card key={index} className="border-border hover:border-accent/50 transition-all group">
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                            <FileText className="w-6 h-6 text-accent-foreground" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-xl mb-2">{paper.title}</CardTitle>
                            <CardDescription>{paper.description}</CardDescription>
                            <div className="flex items-center gap-4 mt-4">
                              <span className="text-sm font-medium text-accent">{paper.type}</span>
                              <span className="text-sm text-muted-foreground">{paper.date}</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="gap-2">
                            Download <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
