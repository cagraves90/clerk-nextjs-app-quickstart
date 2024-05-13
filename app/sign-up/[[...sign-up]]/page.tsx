"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import OAuthSignIn from "../../oauth/oauthSignIn/route";

import Link from "next/link";

export default function Page() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState("");
  const router = useRouter();

  // This function will handle the user submitting their email and password
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    // Start the sign-up process using the email and password provided
    try {
      await signUp.create({
        firstName: firstName,
        lastName: lastName,
        emailAddress,
        password,
        phoneNumber: phoneNumber,
      });

      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      // Set 'verifying' true to display second form and capture the OTP code
      setVerifying(true);
    } catch (err: any) {
      // This can return an array of errors.
      // See https://clerk.com/docs/custom-flows/error-handling to learn about error handling
      console.error("Error:", JSON.stringify(err, null, 2));
    }
  };

  // This function will handle the user submitting a code for verification
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      // Submit the code that the user provides to attempt verification
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status !== "complete") {
        // The status can also be `abandoned` or `missing_requirements`
        // Please see https://clerk.com/docs/references/react/use-sign-up#result-status for  more information
        console.log(JSON.stringify(completeSignUp, null, 2));
      }

      // Check the status to see if it is complete
      // If complete, the user has been created -- set the session active
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        // Redirect the user to a post sign-up route
        router.push("/");
      }
    } catch (err: any) {
      // This can return an array of errors.
      // See https://clerk.com/docs/custom-flows/error-handling to learn about error handling
      console.error("Error:", JSON.stringify(err, null, 2));
    }
  };

  // Once the sign-up form was submitted, verifying was set to true and as a result, this verification form is presented to the user to input their verification code.
  if (verifying) {
    return (
      <form onSubmit={handleVerify}>
        <label id="code">Code</label>
        <input
          value={code}
          id="code"
          name="code"
          onChange={(e) => setCode(e.target.value)}
        />
        <button type="submit">Complete Sign Up</button>
      </form>
    );
  }

  // Display the initial sign-up form to capture the email and password
  return (
    <div className="bg-white w-full">
      <div className="flex flex-col items-center">
        <div className="text-sm bg-red-200 p-4 rounded-sm">
          By signing up you accept our{" "}
          <Link href="/terms" className="underline">
            Terms & Conditions
          </Link>
        </div>
        {/* <SignUp /> */}
        {/* ---------------------------------------------------- Custom Flow with Clerk ------------------------------------------------------ */}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              className="border-2 border-gray-200"
              id="firstName"
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              className="border-2 border-gray-200"
              id="lastName"
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label htmlFor="email">Email address</label>
            <input
              className="border-2 border-gray-200"
              id="email"
              type="email"
              name="email"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm mt-8" htmlFor="password">
              Password
            </label>
            <input
              className="border-2 border-gray-200"
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="phone">Enter phone number</label>
            <input
              className="border-2 border-gray-200"
              value={phoneNumber}
              id="phone"
              name="phone"
              type="tel"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div>
            <button type="submit" className="border-2 border-gray-200">
              Verify Email
            </button>
          </div>
        </form>

        <div>
          <OAuthSignIn />
        </div>
      </div>
    </div>
  );
}
