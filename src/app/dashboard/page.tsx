"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { supabase } from "../services/supabase";
import { useUserStore } from "../services/features/User/useUserStore";
import Nav from "../components/ui/Nav";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../services/api/queryClient";
import "react-toastify/dist/ReactToastify.min.css";
import { Flip, ToastContainer } from "react-toastify";
import SubjectsTable from "../components/ui/SubjectsTable";
import ManagerTable from "../components/ui/ManagerTable";
export default function Dashboard() {
  const setUser = useUserStore((state) => state.setUser);

  const router = useRouter();
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setUser(null);
      }
      if (!session || !session.user) {
        setUser("");
        router.push("/");
      }
    });
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer
        toastClassName="border"
        containerId="B"
        position="top-center"
        transition={Flip}
        closeButton={false}
      />
      <ToastContainer
        position="bottom-left"
        toastClassName="border"
        draggablePercent={30}
        stacked
        hideProgressBar={false}
      />
      <div className="flex">
        <Nav />
        {/* <ResponsableTalbe title="Teste" page="responsable" /> */}
        {/*  <SubjectsTable title="Teste" page="responsable" />  */}
         <ManagerTable title="Gestão de Tarefas" page="managing" />
      </div>
    </QueryClientProvider>
  );
}
