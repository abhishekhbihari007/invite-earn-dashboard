
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface RewardCardProps {
  id: string;
  name: string;
  description: string;
  pointsRequired: number;
  userPoints: number;
  onRedeem: () => void;
}

export const RewardCard = ({ id, name, description, pointsRequired, userPoints, onRedeem }: RewardCardProps) => {
  const { toast } = useToast();
  const canRedeem = userPoints >= pointsRequired;

  const handleRedeem = async () => {
    try {
      const { data, error } = await supabase.rpc('redeem_reward', { reward_id: id });
      
      if (error) throw error;
      
      if (data) {
        toast({
          title: "Success!",
          description: `You've redeemed ${name}`,
        });
        onRedeem();
      } else {
        toast({
          title: "Error",
          description: "Not enough points to redeem this reward",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to redeem reward",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gift className="h-5 w-5" />
          {name}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">
            {pointsRequired} points required
          </p>
          <Button 
            onClick={handleRedeem}
            disabled={!canRedeem}
          >
            Redeem
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
