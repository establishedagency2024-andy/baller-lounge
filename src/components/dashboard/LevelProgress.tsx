import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface LevelProgressProps {
  currentLevel: number;
  nextLevel: number;
  daysUntilUnlock: number;
  memberDays: number;
  progress: number;
}

export function LevelProgress({
  currentLevel,
  nextLevel,
  daysUntilUnlock,
  memberDays,
  progress,
}: LevelProgressProps) {
  return (
    <Card className="luxury-gradient-card luxury-shadow border-border/50 p-6 animate-fade-up">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Star className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Level {currentLevel}</h3>
          <p className="text-sm text-muted-foreground">Member for {memberDays} days</p>
        </div>
      </div>

      <div className="space-y-2">
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-muted-foreground">
          Level {nextLevel} unlocks in {daysUntilUnlock} days
        </p>
      </div>
    </Card>
  );
}
