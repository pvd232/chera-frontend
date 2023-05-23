import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export const ProfileInfo = () => {
  const { user, isAuthenticated } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/profile",
      },
    });
  };

    return (
      !isAuthenticated && (
        <article className="column">
                {user?.picture && <img src={user?.picture} alt={user?.name} />}   
                <h2>{user?.name}</h2>
                <u1>
                    {Object.keys(user).map((objKey, i) => <li key={i}>{objKey}: {user[objKey]
                    }</li>)}
                </u1>
        </article>
      )
  );
};