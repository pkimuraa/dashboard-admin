import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CreatePeople from "../People/CreatePeople";
import { useEffect, useState } from "react";
import { supabase } from "@/app/services/supabase";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Trash } from "lucide-react";
import useResponsableMutations from "@/app/services/features/User/Responsable/useResponsable";
import { Button } from "@/components/ui/button";

interface ResponsableTalbeProps {
  title: string;
  page: string;
}

async function getResponsables() {
  let { data: responsable, error } = await supabase
    .from("responsable")
    .select("*")
    .range(0, 9);

  return responsable;
}

export default function ResponsableTalbe({ title }: ResponsableTalbeProps) {
  const { deleteResponsable } = useResponsableMutations();
  const [rowName, setRowName] = useState<any>();

  const { data: responsable } = useQuery<any>({
    queryKey: ["supa", "responsable"],
    queryFn: getResponsables,
  });

  const deleteUser = async (payload: any) => {
    await deleteResponsable(payload);
  };

  useEffect(() => {
    if (responsable) {
      let tableHeads: any = [];
      tableHeads = Array.from(Object.keys(responsable[0]));

      setRowName(tableHeads);
    }
  }, [responsable]);
  return (
    <div className="px-4 w-full flex-wrap h-fit flex py-4  rounded border ">
      <div className="w-full flex mb-4 items-center">
        <h1 className="w-full"> {title} </h1>
        <CreatePeople />
      </div>
      <Table className="w-full h-auto px-4 py-4 shadow-lg border">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            {rowName?.map((head: any) => {
              return <TableHead key={head}>{head}</TableHead>;
            })}
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {responsable?.map((people: any) => {
            return (
              <TableRow key={people.id}>
                <TableCell className="font-medium">{people.id}</TableCell>
                <TableCell>
                  {format(new Date(people?.created_at), "dd/MM/yyyy")}
                </TableCell>
                <TableCell>{people.name}</TableCell>
                <TableCell>
                  <Trash
                    color="red"
                    className="cursor-pointer"
                    onClick={() => deleteUser(people?.id)}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
