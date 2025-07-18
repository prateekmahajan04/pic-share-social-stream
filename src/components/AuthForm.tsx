import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface AuthFormProps {
  isLogin: boolean;
  onToggleMode: () => void;
  onAuth: (email: string, password: string, username?: string) => void;
}

export const AuthForm = ({ isLogin, onToggleMode, onAuth }: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || (!isLogin && !username)) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate auth delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      onAuth(email, password, username);
    } catch (error) {
      toast({
        title: "Authentication failed",
        description: "Please check your credentials and try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4">
      <Card className="w-full max-w-md bg-card shadow-large">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-instagram bg-clip-text text-transparent mb-2">
              Instaclone
            </h1>
            <p className="text-muted-foreground">
              {isLogin ? "Welcome back!" : "Join the community"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1"
                />
              </div>
            )}

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-instagram text-white h-11 font-medium"
            >
              {isLoading
                ? "Loading..."
                : isLogin
                ? "Sign In"
                : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <Button
                variant="link"
                onClick={onToggleMode}
                className="ml-1 p-0 h-auto font-medium"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </Button>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};