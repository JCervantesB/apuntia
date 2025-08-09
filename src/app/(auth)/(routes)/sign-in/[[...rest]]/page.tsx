import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        <SignIn />
      </div>
    </div>
  );
}