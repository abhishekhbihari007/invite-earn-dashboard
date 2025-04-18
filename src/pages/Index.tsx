
import AuthForm from "@/components/auth/AuthForm";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const Index = () => {
  const isAuthenticated = false; // This will be replaced with actual auth state

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        {isAuthenticated ? <DashboardLayout /> : <AuthForm />}
      </div>
    </div>
  );
};

export default Index;
