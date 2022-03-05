import React, { useEffect } from "react";
import useAuth from "~/context/AuthContext";
import { navigate } from "gatsby";

export default function LogOut() {
  const { user, signOut } = useAuth();
  useEffect(() => {
    if (user) {
      signOut();
      navigate("/");
    }
    navigate("/");
  }, [user]);

  return <div>log-out page</div>;
}
