
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { RewardCard } from "./RewardCard";
import { useToast } from "@/hooks/use-toast";

interface Reward {
  id: string;
  name: string;
  description: string;
  points_required: number;
}

export const RewardsList = () => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [userPoints, setUserPoints] = useState(0);
  const { toast } = useToast();

  const fetchUserPoints = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from('users')
        .select('points')
        .eq('id', user.id)
        .single();
      
      if (data) {
        setUserPoints(data.points);
      }
    }
  };

  const fetchRewards = async () => {
    const { data, error } = await supabase
      .from('rewards')
      .select('*');

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch rewards",
        variant: "destructive",
      });
      return;
    }

    if (data) {
      setRewards(data);
    }
  };

  useEffect(() => {
    fetchRewards();
    fetchUserPoints();
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {rewards.map((reward) => (
        <RewardCard
          key={reward.id}
          id={reward.id}
          name={reward.name}
          description={reward.description || ""}
          pointsRequired={reward.points_required}
          userPoints={userPoints}
          onRedeem={() => {
            fetchUserPoints();
          }}
        />
      ))}
    </div>
  );
};
