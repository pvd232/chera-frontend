import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

    return (
    isAuthenticated && (
        <button className="button__logout" onClick={handleLogout}>
            Sign Out
        </button>
    )
  );
};