
import AuthForm from "@/components/auth/AuthForm";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        {user ? <DashboardLayout /> : <AuthForm />}
      </div>
    </div>
  );
};

export default Index;
