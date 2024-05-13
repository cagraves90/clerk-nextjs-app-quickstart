import { useSignIn, useSignUp } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/types";

import { ImFacebook } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import { IoLogoApple } from "react-icons/io5";

const OAuthSignIn = () => {
  const { signIn, isLoaded: signInLoaded } = useSignIn();
  const { signUp, isLoaded: signUpLoaded } = useSignUp();

  if (!signInLoaded || !signUpLoaded) {
    return null;
  }

  const signInWithOAuth = (strategy: OAuthStrategy) =>
    signUp.authenticateWithRedirect({
      strategy,
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/",
    });

  return (
    <>
      <div>
        <button
          onClick={() => signInWithOAuth("oauth_google")}
          className="flex center text-3xl space-x-20 btn btn-circle w-10 h-10"
          title="Sign up with Google"
        >
          {" "}
          <FcGoogle />
        </button>
        <button
          onClick={() => signInWithOAuth("oauth_facebook")}
          className="flex center text-3xl space-x-20 btn btn-circle"
          title="Sign up with Facebook"
        >
          {"  "}
          <ImFacebook color="#1877F2" />
        </button>
        <button
          onClick={() => signInWithOAuth("oauth_apple")}
          className="flex center text-3xl space-x-20 btn  btn-circle "
          title="Sign up with Apple"
        >
          {""}
          <IoLogoApple />
        </button>
      </div>
    </>
  );
};

export default OAuthSignIn;
