import { CurrentGiveaway } from "@/components/dashboard/CurrentGiveaway";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, TrendingUp } from "lucide-react";
import { useState } from "react";

const Giveaways = () => {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Current Giveaway - Sticky */}
      <div className="sticky top-0 z-10 pb-4 bg-background/95 backdrop-blur-sm">
        <CurrentGiveaway />
      </div>

      <div className="space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          Giveaways & Entries
        </h1>

        {/* Entry Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="luxury-gradient-card luxury-shadow border-border/50 p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-primary/10">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Entries</p>
                <p className="text-3xl font-bold text-foreground">137</p>
              </div>
            </div>
          </Card>

          <Card className="luxury-gradient-card luxury-shadow border-border/50 p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-primary/10">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Draws</p>
                <p className="text-3xl font-bold text-foreground">1</p>
              </div>
            </div>
          </Card>

          <Card className="luxury-gradient-card luxury-shadow border-border/50 p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-primary/10">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Next Entry</p>
                <p className="text-3xl font-bold text-foreground">11d</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Entry Accumulation Timeline */}
        <Card className="luxury-gradient-card luxury-shadow border-border/50 p-6">
          <h3 className="text-xl font-bold text-foreground mb-4">Entry Accumulation</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
              <div>
                <p className="font-semibold text-foreground">Current Period</p>
                <p className="text-sm text-muted-foreground">Nov 23 - Dec 7, 2025</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">+1</p>
                <p className="text-sm text-muted-foreground">entry</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/10 rounded-lg">
              <div>
                <p className="font-semibold text-foreground">Next Period</p>
                <p className="text-sm text-muted-foreground">Dec 7 - Dec 21, 2025</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-muted-foreground">+1</p>
                <p className="text-sm text-muted-foreground">entry</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Entry History */}
        <Card className="luxury-gradient-card luxury-shadow border-border/50">
          <div className="p-6 border-b border-border/50">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-foreground">Entry History</h3>
              <Button
                variant="ghost"
                onClick={() => setShowHistory(!showHistory)}
              >
                {showHistory ? "Hide" : "Show"} History
              </Button>
            </div>
          </div>
          
          {showHistory && (
            <div className="p-6 space-y-3">
              {[
                { date: "Nov 23, 2025", entries: 1, reason: "Subscription renewal" },
                { date: "Nov 20, 2025", entries: 5, reason: "Bonus entry pack purchase" },
                { date: "Nov 15, 2025", entries: 1, reason: "Weekly accumulation" },
                { date: "Nov 10, 2025", entries: 10, reason: "Referral bonus" },
              ].map((entry, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-muted/10 rounded-lg hover:bg-muted/20 smooth-transition"
                >
                  <div>
                    <p className="font-medium text-foreground">{entry.reason}</p>
                    <p className="text-sm text-muted-foreground">{entry.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">+{entry.entries}</p>
                    <p className="text-xs text-muted-foreground">
                      {entry.entries === 1 ? "entry" : "entries"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Giveaways;
