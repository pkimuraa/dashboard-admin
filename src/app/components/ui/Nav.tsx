import { Separator } from "@radix-ui/react-separator";
import {
  Home,
  MessageCircleQuestion,
  PersonStandingIcon,
  Table2Icon,
} from "lucide-react";

export default function Nav() {
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
        </div>
      </div>
    </div>
  );
}
