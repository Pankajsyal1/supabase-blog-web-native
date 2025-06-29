import { User } from "@supabase/supabase-js";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { supabase } from '../supabase'
import toast from "react-hot-toast";

interface AuthContextType {
  user: User | null,
  signInWithGitHub: () => void,
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);


  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      // 🖥️ Debugging Session Data 🧐🔍  
      // console.log(session,"session----");
      setUser(session?.user ?? null)
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      // 🛑 Preventing Memory Leaks 🧠💧
      listener.subscription.unsubscribe();
    }

  }, [])

  const signInWithGitHub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github'
    })
   await toast.success("You have been signed in successfully! 🎉");
  }

  const signOut = async () => {
    await supabase.auth.signOut();
    await toast.success("You have been signed out successfully! 👋");
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGitHub, signOut }}>{children}</AuthContext.Provider>
  )

}


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within the AuthProvider.");
  }

  return context;
}