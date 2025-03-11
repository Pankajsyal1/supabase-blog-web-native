import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase";

// 🔹 Create Authentication Context
export const AuthContext = createContext();

// 🔹 Authentication Provider (Wrap around the app)
export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null); // 👤 Store user session
  const [loading, setLoading] = useState(true); // ⏳ Loading state

  useEffect(() => {
    // 🔄 Fetch existing user session on app start
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false); // ✅ Stop loading after fetching session
    });

    // 🔔 Listen for authentication state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
    });

    return () => {
      // 🛑 Cleanup listener to prevent memory leaks
      authListener.subscription.unsubscribe();
    };
  }, []);


  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) throw new Error(error.message);

    alert('Sign out successfully!!!');
  }

  return (
    <AuthContext.Provider value={{ session, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const signOut = async () => {
  await supabase.auth.signOut()
}

// 🔹 Custom Hook: useAuth (for easy access to authentication state)
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider.");
  return context;
};
