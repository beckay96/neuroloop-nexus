import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

interface AccessCodeGateProps {
  onAccessGranted: () => void;
}

export function AccessCodeGate({ onAccessGranted }: AccessCodeGateProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === "2803") {
      onAccessGranted();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 border-2 border-primary/20">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="p-4 bg-primary/10 rounded-full">
              <Lock className="h-8 w-8 text-primary" />
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-2">Developer Access Only</h2>
            <p className="text-muted-foreground text-sm">
              NeuroLoop is currently in testing phase. Enter the developer access code to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter access code"
                className={`text-center text-lg tracking-widest ${error ? 'border-red-500' : ''}`}
                autoFocus
              />
              {error && (
                <p className="text-red-500 text-sm mt-2">Invalid access code</p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Access NeuroLoop
            </Button>
          </form>

          <p className="text-xs text-muted-foreground">
            For access, contact the development team
          </p>
        </div>
      </Card>
    </div>
  );
}
