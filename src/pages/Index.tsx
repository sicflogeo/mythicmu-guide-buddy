import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-dark">
      <div className="text-center space-y-6 px-6">
        <h1 className="text-6xl font-bold bg-gradient-mythic bg-clip-text text-transparent">
          MythicMU
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Embark on an epic adventure in a legendary realm
        </p>
        <Link to="/guide">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow">
            <BookOpen className="mr-2 h-5 w-5" />
            View Guide
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
