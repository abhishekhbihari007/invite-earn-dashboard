
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardLayout = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Points Card */}
        <Card>
          <CardHeader>
            <CardTitle>Total Points</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
          </CardContent>
        </Card>

        {/* Referrals Card */}
        <Card>
          <CardHeader>
            <CardTitle>Referrals Made</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
          </CardContent>
        </Card>

        {/* Rewards Card */}
        <Card>
          <CardHeader>
            <CardTitle>Rewards Redeemed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardLayout;
