import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Copy, LogOut, Users, Gift, Trophy } from "lucide-react";
import { RewardsList } from "@/components/rewards/RewardsList";

interface UserStats {
  points: number;
  referral_code: string;
  referrals_made: number;
  rewards_redeemed: number;
}

const DashboardLayout = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [stats, setStats] = useState<UserStats>({
    points: 0,
    referral_code: "",
    referrals_made: 0,
    rewards_redeemed: 0,
  });

  useEffect(() => {
    const fetchUserStats = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch user data",
          variant: "destructive",
        });
        return;
      }

      if (data) {
        setStats({
          points: data.points || 0,
          referral_code: data.referral_code || "",
          referrals_made: data.referrals_made || 0,
          rewards_redeemed: data.rewards_redeemed || 0,
        });
      }
    };

    fetchUserStats();
  }, [user]);

  const copyReferralCode = () => {
    navigator.clipboard.writeText(stats.referral_code);
    toast({
      title: "Copied!",
      description: "Referral code copied to clipboard",
    });
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You have been signed out successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Welcome!</h1>
        <Button variant="outline" onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>

      <Card className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
        <CardHeader>
          <CardTitle>Your Referral Code</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <p className="text-3xl font-bold">{stats.referral_code}</p>
          <Button variant="secondary" onClick={copyReferralCode}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Code
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="mr-2 h-5 w-5" />
              Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.points}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Referrals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.referrals_made}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Gift className="mr-2 h-5 w-5" />
              Rewards Redeemed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.rewards_redeemed}</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Available Rewards</h2>
        <RewardsList />
      </div>
    </div>
  );
};

export default DashboardLayout;
