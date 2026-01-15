import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface RiskDiagramProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const RiskDiagram = ({ title, description, children }: RiskDiagramProps) => {
  return (
    <Card className="border-border bg-gradient-subtle">
      <CardHeader>
        <CardTitle className="text-2xl text-center">{title}</CardTitle>
        {description && (
          <CardDescription className="text-center">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          {children}
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskDiagram;
