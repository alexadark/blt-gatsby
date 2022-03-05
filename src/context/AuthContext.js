import { navigate } from "gatsby";
import React, { createContext, useContext, useState, useEffect } from "react";
import useLocalStorage from "~/lib/hooks/use-local-storage";
import { supabase } from "~/lib/supabaseClient";
import useAuthModal from "./AuthModalContext";

export const AuthContext = createContext();
export function AuthContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const { closeModal } = useAuthModal();

  async function signOut() {
    return supabase.auth.signOut();
  }
  async function logInWithEmailPassword({ email, password }) {
    return await supabase.auth.signIn({
      email,
      password,
    });
  }

  async function signUpWithEmailPassword(args) {
    return await supabase.auth.signUp(args);
  }
  async function checkUser() {
    const session = await supabase.auth.session();
    if (session) {
      const user = session.user;
      setUser(user);
      setIsLoading(false);
      closeModal();
    } else {
      setUser(null);
      setIsLoading(false);
    }
  }
  useEffect(() => {
    checkUser();
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "PASSWORD_RECOVERY") {
          navigate("/set-password");
        }

        checkUser();
      }
    );
    return () => {
      authListener.unsubscribe();
    };
  }, []);

  const [bucket, setBucket] = useLocalStorage("bucketList", []);
  useEffect(() => {
    console.log("sync-with-bucket");
  }, [bucket]);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        user,
        logInWithEmailPassword,
        signUpWithEmailPassword,
        signOut,
        loggedIn: user ? true : false,
        loading: isLoading,
        error: null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default function useAuth() {
  return useContext(AuthContext);
}
