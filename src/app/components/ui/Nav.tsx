import { Separator } from "@radix-ui/react-separator";
import {
  Home,
  LogOut,
  MessageCircleQuestion,
  PersonStandingIcon,
  Table2Icon,
} from "lucide-react";
import { supabase } from "@/app/services/supabase";

export default function Nav() {
  const logOut = async () => {
    await supabase.auth.signOut();
  };
  return (
    <div>
      <div className="h-screen w-14 px-4 py-4 border-r">
        <div>
          <Home />
        </div>
        <Separator className="my-4" />
        <div className="w-full flex flex-wrap justify-center">
          <PersonStandingIcon className="cursor-pointer" />
          <Table2Icon className="mt-4 cursor-pointer" />
          <MessageCircleQuestion className="mt-4 cursor-pointer" />
          <LogOut
            color="red"
            className="mt-4 cursor-pointer"
            onClick={logOut}
          />
        </div>
      </div>
    </div>
  );
}
