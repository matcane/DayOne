import AuthForm from "@/components/AuthForm";
import useAuthStore from "@/store/authStore";

export default function SignUp() {
  const signUp = useAuthStore((state) => state.signUp);

  return (
    <AuthForm
      title="Sign Up"
      buttonText="Register"
      linkText={["Already have an account?", "Log In"]}
      linkHref="sign-in"
      onSubmit={signUp}
    />
  );
}
