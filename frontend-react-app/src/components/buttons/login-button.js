import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/profile",
      },
    });
  };

    return (
      !isAuthenticated && (
        <button className="button__login" onClick={handleLogin}>
            Log In
        </button>
      )
  );
};