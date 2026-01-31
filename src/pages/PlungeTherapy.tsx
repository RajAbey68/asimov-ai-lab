
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

// Mock data for the chart "Thermal analysis"
const chartData = [
    { time: 0, temp: 37.0, dopamine: 100 },
    { time: 1, temp: 36.8, dopamine: 150 },
    { time: 2, temp: 36.5, dopamine: 220 },
    { time: 3, temp: 36.1, dopamine: 280 },
    { time: 4, temp: 35.8, dopamine: 250 },
    { time: 5, temp: 35.5, dopamine: 210 },
];

const PlungeTherapy = () => {
    const [waterTemp, setWaterTemp] = useState(10);
    const [duration, setDuration] = useState(3);
    const [result, setResult] = useState<{ dopamine: number; recovery: number; safety: string } | null>(null);

    const calculateMetrics = () => {
        // Basic "AI" data simulation
        const dopamineRelease = Math.round(100 + (15 - waterTemp) * 15 + duration * 10);
        const recoveryTime = Math.round(duration * (15 - waterTemp) * 0.1);

        let safetyProtocol = "Safe for adapted individuals.";
        if (waterTemp < 5 && duration > 5) safetyProtocol = "HIGH RISK: Hypothermia warning. Medical supervision suggested.";
        else if (waterTemp < 10 && duration > 10) safetyProtocol = "Moderate Risk: Monitor for after-drop.";

        setResult({
            dopamine: dopamineRelease,
            recovery: recoveryTime,
            safety: safetyProtocol
        });
    };

    // JSON-LD Schema for MedicalWebPage
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        "name": "The Asimov Protocol: Cold Water Immersion Safety & Data",
        "description": "Technical analysis of cold water immersion (CWI) effects on human metabolic rate and dopamine production.",
        "mainEntity": {
            "@type": "TherapeuticProcedure",
            "name": "Cold Water Immersion Therapy",
            "bodyLocation": "Whole Body",
            "outcome": "Brown Adipose Tissue Activation, Dopamine Release",
            "adverseOutcome": "Hypothermia, Cold Shock Response"
        },
        "author": {
            "@type": "Organization",
            "name": "Asimov AI Lab"
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-4xl space-y-8 animate-fade-in">
            <Helmet>
                <title>Plunge Therapy Protocols | Asimov AI</title>
                <meta name="description" content="AI-driven analysis of cold water immersion, dopamine response prediction, and thermal safety protocols." />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
            </Helmet>

            <section className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                    The Asimov Protocol: Data-Driven CWI
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                    Advanced biometrics and safety protocols for cold water immersion and open water swimming.
                </p>
            </section>

            {/* Calculator Section */}
            <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Info className="w-5 h-5 text-blue-600" />
                        Cold Water Recovery Predictor
                    </CardTitle>
                    <CardDescription>
                        Calculate expected dopamine response and metabolic impact based on water thermodynamics.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Water Temperature: {waterTemp}°C</label>
                        <Slider
                            value={[waterTemp]}
                            onValueChange={(v) => setWaterTemp(v[0])}
                            min={0}
                            max={25}
                            step={1}
                            className="py-4"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Duration: {duration} Minutes</label>
                        <Slider
                            value={[duration]}
                            onValueChange={(v) => setDuration(v[0])}
                            min={1}
                            max={20}
                            step={0.5}
                            className="py-4"
                        />
                    </div>

                    <Button onClick={calculateMetrics} className="w-full bg-blue-600 hover:bg-blue-700">
                        Run Analysis
                    </Button>

                    {result && (
                        <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg space-y-2 border border-blue-100 dark:border-blue-900">
                            <div className="flex justify-between">
                                <span className="text-slate-500">Predicted Dopamine Increase:</span>
                                <span className="font-bold text-green-600 text-lg">+{result.dopamine}%</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Allostatic Load (Recovery):</span>
                                <span className="font-bold text-blue-600">~{result.recovery} min</span>
                            </div>
                            <div className="mt-2 text-sm text-amber-600 border-t pt-2 border-slate-200 dark:border-slate-800">
                                <strong>Protocol Safety:</strong> {result.safety}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Chart Section - Visual AI Optimization */}
            <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
                <CardHeader>
                    <CardTitle>Thermal Analysis: Body Temp vs Dopamine</CardTitle>
                    <CardDescription>
                        Theoretical model of core body temperature retention vs neurotransmitter release at 4°C.
                    </CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                            <XAxis dataKey="time" label={{ value: 'Time (min)', position: 'insideBottom', offset: -5 }} />
                            <YAxis yAxisId="left" stroke="#8884d8" />
                            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            />
                            <Legend />
                            <Line yAxisId="left" type="monotone" dataKey="temp" name="Core Body Temp (°C)" stroke="#ef4444" strokeWidth={2} dot={false} />
                            <Line yAxisId="right" type="monotone" dataKey="dopamine" name="Dopamine Level (%)" stroke="#3b82f6" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                    {/* Alt text for AI Crawlers */}
                    <div className="sr-only">
                        Chart showing thermal analysis of human body in 4°C water for plunge therapy protocol.
                        Shows inverse correlation between core temperature drop and dopamine spike over a 5 minute immersion.
                    </div>
                </CardContent>
            </Card>

            <section className="prose dark:prose-invert max-w-none">
                <h2>The Science of Cold Exposure</h2>
                <p>
                    Cold water immersion (CWI) stimulates the release of norepinephrine and dopamine, driven by the sympathetic nervous system's response to thermal shock.
                    Our "Asimov Protocol" recommends a weekly threshold of 11 minutes total immersion to maximize brown adipose tissue (BAT) activation without inducing significant hypothermic risk.
                </p>
                <h3>Safety in Open Water</h3>
                <p>
                    When practicing CWI in open water, the variable of "Thermal Conductivity" becomes critical. Water conducts heat away from the body 25 times faster than air.
                    Always account for wind chill and currents (convection), which accelerate heat loss.
                </p>
            </section>
        </div>
    );
};

export default PlungeTherapy;
