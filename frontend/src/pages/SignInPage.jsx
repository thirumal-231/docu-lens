import Logo from "@/components/Logo";
import { SignIn } from "@clerk/react";

const SignInPage = () => {
  return (
    <>
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <Logo />
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              <SignIn />
            </div>
          </div>
        </div>
        <div className="relative hidden bg-muted lg:block">
          <img
            src="https://res.cloudinary.com/dmvbudba3/image/upload/v1790504165/doculens-side-img_a2ovne.png"
            alt="Image"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </>
  );
};

export default SignInPage;
