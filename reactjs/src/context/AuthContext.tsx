import { User } from "@supabase/supabase-js";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { supabase } from '../supabase'

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
  }

  const signOut = () => {
    supabase.auth.signOut()
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