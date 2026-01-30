import Navigation from "@/components/Navigation";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const Sushi = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <main className="container mx-auto px-4 pt-24 pb-12">
                <Link to="/resources">
                    <Button variant="ghost" className="group mb-6 pl-0 hover:pl-2 hover:bg-transparent transition-all duration-300">
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-muted-foreground group-hover:text-foreground transition-colors">Back to Resources</span>
                    </Button>
                </Link>

                <article className="max-w-5xl mx-auto space-y-10 animate-fade-in">
                    <div className="space-y-4 text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent tracking-tight">
                            AI Risk for Leadership
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl">
                            A deep dive into AI security risks, governance, and practical approaches with Sushila Nair.
                        </p>
                    </div>

                    <div className="group relative aspect-video w-full rounded-2xl overflow-hidden border border-border/50 bg-card shadow-xl transition-all duration-500 hover:shadow-2xl">
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/GEMKwXxqvec"
                            title="AI Risk for Leadership - Sushila Nair"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 prose prose-invert max-w-none text-muted-foreground">
                            <h2 className="text-2xl font-semibold mb-4 text-foreground">About the Session</h2>
                            <p className="leading-relaxed">
                                In this session, Sushila Nair, CEO of Cybernetic and experienced CISO, covers AI fundamentals with a special focus on cyber security, IT audit, and governance. This comprehensive overview addresses the disconnect between rapid AI adoption and necessary security protocols.
                            </p>
                            <p className="mt-4 leading-relaxed">
                                She explores the practical implications of "Shadow AI," the necessity of inventorying AI assets, and the evolving landscape of regulatory compliance in 2026.
                            </p>
                        </div>

                        <Card className="bg-secondary/30 border-none shadow-none">
                            <CardContent className="pt-6">
                                <h3 className="font-semibold text-foreground mb-2">Session Details</h3>
                                <div className="space-y-2 text-sm text-muted-foreground">
                                    <div className="flex justify-between">
                                        <span>Speaker</span>
                                        <span className="font-medium text-foreground">Sushila Nair</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Focus</span>
                                        <span className="font-medium text-foreground">Governance & Risk</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Duration</span>
                                        <span className="font-medium text-foreground">45 Min</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-2xl font-semibold text-foreground">Key Takeaways</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                {
                                    title: "AI Governance",
                                    content: "Governing the entire AI pipeline (data, features, training, model, deployment, monitoring), not just the model itself."
                                },
                                {
                                    title: "Security Risks",
                                    content: "Detailed analysis of threats like prompt injection, data poisoning, model theft, and adversarial inputs."
                                },
                                {
                                    title: "Data Quality",
                                    content: "The critical importance of clean, unbiased data ('Garbage In, Garbage Out') and managing balanced datasets."
                                },
                                {
                                    title: "Human Oversight",
                                    content: "The necessity of 'Human in the Loop' protocols for high-stakes decisions and maintaining accountability."
                                }
                            ].map((item, index) => (
                                <Card key={index} className="bg-card hover:bg-secondary/50 transition-colors duration-300 border-border/50">
                                    <CardHeader>
                                        <CardTitle className="text-lg text-primary">{item.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{item.content}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </article>
            </main>
        </div>
    );
};

export default Sushi;
