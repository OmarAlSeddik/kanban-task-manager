"use client";

import { useClerk } from "@clerk/nextjs";
import React from "react";

const VerificationPage = () => {
  const [verificationStatus, setVerificationStatus] = React.useState("loading");

  const { handleEmailLinkVerification } = useClerk();

  React.useEffect(() => {
    async function verify() {
      try {
        await handleEmailLinkVerification({
          redirectUrl: "http://localhost:3000/verification",
          redirectUrlComplete: "http://localhost:3000",
        });
        // If we're not redirected at this point, it means
        // that the flow has completed on another device.
        setVerificationStatus("verified");
      } catch (err) {
        // Verification has failed.
        setVerificationStatus("failed");
        console.log(err);
      }
    }
    verify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (verificationStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (verificationStatus === "failed") {
    return <div>Email link verification failed</div>;
  }

  if (verificationStatus === "expired") {
    return <div>Email link expired</div>;
  }

  console.log(verificationStatus);

  return (
    <div>Successfully signed up. Return to the original tab to continue.</div>
  );
};

export default VerificationPage;
