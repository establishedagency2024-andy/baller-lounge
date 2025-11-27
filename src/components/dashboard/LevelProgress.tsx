import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

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
  const [animatedDays, setAnimatedDays] = useState(0);
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    // Animate member days
    const steps = 60;
    const increment = memberDays / steps;
    let currentStep = 0;

    const daysTimer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setAnimatedDays(memberDays);
        clearInterval(daysTimer);
      } else {
        setAnimatedDays(Math.floor(increment * currentStep));
      }
    }, 2000 / steps);

    // Animate progress bar
    const progressIncrement = progress / steps;
    let progressStep = 0;

    const progressTimer = setInterval(() => {
      progressStep++;
      if (progressStep >= steps) {
        setAnimatedProgress(progress);
        clearInterval(progressTimer);
      } else {
        setAnimatedProgress(Math.floor(progressIncrement * progressStep));
      }
    }, 2000 / steps);

    return () => {
      clearInterval(daysTimer);
      clearInterval(progressTimer);
    };
  }, [memberDays, progress]);

  return (
    <Card className="luxury-gradient-card luxury-shadow border-border/50 p-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Star className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Level {currentLevel}</h3>
            <p className="text-sm text-muted-foreground">Member for {animatedDays} days</p>
          </div>
        </div>
        
        {/* Progress Bar in Middle */}
        <div className="flex-1 max-w-md mx-8">
          <Progress value={animatedProgress} className="h-2" />
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Level {nextLevel} unlocks in {daysUntilUnlock} days
          </p>
        </div>
      </div>
    </Card>
  );
}
