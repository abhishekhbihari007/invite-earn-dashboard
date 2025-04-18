
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const DashboardLayout = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [userData, setUserData] = useState<{
    points: number;
    referral_code: string;
    rewards_redeemed: number;
    referrals_made: number;
  }>({
    points: 0,
    referral_code: "",
    rewards_redeemed: 0,
    referrals_made: 0,
  });

  useEffect(() => {
    const fetchUserData = async () => {
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
        setUserData({
          points: data.points || 0,
          referral_code: data.referral_code || "",
          rewards_redeemed: data.rewards_redeemed || 0,
          referrals_made: data.referrals_made || 0,
        });
      }
    };

    fetchUserData();
  }, [user]);

  const copyReferralCode = () => {
    navigator.clipboard.writeText(userData.referral_code);
    toast({
      title: "Copied!",
      description: "Referral code copied to clipboard",
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
        <Button variant="outline" onClick={() => signOut()}>
          Sign Out
        </Button>
      </div>

      <Card className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
        <CardHeader>
          <CardTitle>Your Referral Code</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <p className="text-3xl font-bold">{userData.referral_code}</p>
          <Button variant="secondary" onClick={copyReferralCode}>
            Copy Code
          </Button>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Points</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{userData.points}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Referrals Made</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{userData.referrals_made}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rewards Redeemed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{userData.rewards_redeemed}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardLayout;
