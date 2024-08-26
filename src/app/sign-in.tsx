import AuthForm from "@/components/AuthForm";
import useAuthStore from "@/store/authStore";

export default function SignIn() {
  const signIn = useAuthStore((state) => state.signIn);

  return (
    <AuthForm
      title="Sign In"
      buttonText="Login"
      linkText={["Don't have an account?", "Register"]}
      linkHref="sign-up"
      onSubmit={signIn}
    />
  );
}
