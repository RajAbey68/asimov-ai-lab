import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Shield, Brain, Lock, Key } from "lucide-react";
import Navigation from "@/components/Navigation";

const DEV_EMAIL = "rajabey@me.com";
const DEV_PASSWORD = "P@55w0rd12345";

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const loadDevCredentials = () => {
    // Auto-fill forms
    const emailInputs = document.querySelectorAll<HTMLInputElement>('input[type="email"]');
    const passwordInputs = document.querySelectorAll<HTMLInputElement>('input[type="password"]');
    
    emailInputs.forEach(input => input.value = DEV_EMAIL);
    passwordInputs.forEach(input => input.value = DEV_PASSWORD);
    
    toast({
      title: "Dev credentials loaded",
      description: `Email: ${DEV_EMAIL}`,
    });
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
      });
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      toast({
        variant: "destructive",
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
      });
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/assessment`,
      },
    });

    setLoading(false);

    if (error) {
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: error.message,
      });
    } else {
      toast({
        title: "Account created!",
        description: "You can now sign in and start your AI governance assessment.",
      });
    }
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      toast({
        variant: "destructive",
        title: "Sign in failed",
        description: error.message,
      });
    } else {
      navigate("/assessment");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />
      
      <div className="container max-w-5xl mx-auto px-4 py-24">
        {/* Development Helper */}
        <div className="max-w-md mx-auto mb-6">
          <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-yellow-600 dark:text-yellow-400">
                <Key className="h-4 w-4" />
                <span className="font-medium">Development Mode</span>
              </div>
              <Button
                onClick={loadDevCredentials}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                Load Test Credentials
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Email: {DEV_EMAIL} - Click "Sign Up" tab first to create account
            </p>
          </div>
        </div>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-12 h-12 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold">ASIMOV Assessment Portal</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Access the AI Governance Audit Tool - 127 EU AI Act Controls
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="border-primary/20">
            <CardHeader>
              <Brain className="w-10 h-10 text-primary mb-2" />
              <CardTitle>AI-Powered Insights</CardTitle>
              <CardDescription>
                Get Life-Wise regulatory guidance with real-time compliance recommendations
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-primary/20">
            <CardHeader>
              <Lock className="w-10 h-10 text-primary mb-2" />
              <CardTitle>Secure & Compliant</CardTitle>
              <CardDescription>
                Export results in JSON/CSV for security tool analysis in your environment
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Access Assessment Tool</CardTitle>
            <CardDescription>Sign in to continue or create an account</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input
                      id="signin-password"
                      name="password"
                      type="password"
                      required
                      disabled={loading}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      name="password"
                      type="password"
                      required
                      disabled={loading}
                      minLength={6}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                    <Input
                      id="signup-confirm-password"
                      name="confirmPassword"
                      type="password"
                      required
                      disabled={loading}
                      minLength={6}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
