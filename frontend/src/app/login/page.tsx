import { LoginForm } from "@/components/organisms/LoginForm";
import { AuthLayout } from "@/components/templates/AuthLayout";

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}