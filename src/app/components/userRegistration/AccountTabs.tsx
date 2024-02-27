"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterForm } from "./RegisterForm";
import { supabase } from "@/app/services/supabase";
import { LoginForm } from "./LoginForm";

interface AccountTabs {}

const AccountTabs = ({}: AccountTabs) => {
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const onSubmit = async (payload: any) => {
    let { data, error } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
    });
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      /*  username: "", */
      password: "",
      email: "",
    },
  });

  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Login</TabsTrigger>
        <TabsTrigger value="password">Registro</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <LoginForm />
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <RegisterForm />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export { AccountTabs };
