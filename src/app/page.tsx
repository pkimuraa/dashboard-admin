"use client";

import { useEffect } from "react";
import { AccountTabs } from "./components/userRegistration/AccountTabs";
import { supabase } from "./services/supabase";
import { useUserStore } from "./services/features/User/useUserStore";

export default function Home() {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
      if (event === "SIGNED_OUT") {
        setUser(null);
      }
      if (session && session.user) {
        console.log(session.user);
        setUser(session.user);
      }
    });
  }, []);
  return (
    <div className="w-full flex justify-center items-center h-screen">
      <AccountTabs></AccountTabs>
    </div>
  );
}
