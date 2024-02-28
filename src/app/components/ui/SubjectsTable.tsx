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
import Create from "../People/Create";
import useSubjectsMutations from "@/app/services/features/User/Subject/useSubject";

interface SubjectsTableProps {
  title: string;
  page: string;
}

async function getSubjects() {
  let { data: subjects, error } = await supabase
    .from("subjects")
    .select("*")
    .range(0, 9);

  return subjects;
}

export default function SubjectsTable({ title }: SubjectsTableProps) {
  const { deleteSubject } = useSubjectsMutations();
  const [rowName, setRowName] = useState<any>();

  const { data: subjects } = useQuery<any>({
    queryKey: ["supa", "subjects"],
    queryFn: getSubjects,
  });

  const deleteUser = async (payload: any) => {
    await deleteSubject(payload);
  };

  useEffect(() => {
    if (subjects) {
      let tableHeads: any = [];
      tableHeads = Array.from(Object.keys(subjects[0]));

      setRowName(tableHeads);
      console.log(rowName);
    }
  }, [subjects]);
  return (
    <div className="px-4 w-full flex-wrap h-fit flex py-4  rounded border ">
      <div className="w-full flex mb-4 items-center">
        <h1 className="w-full"> {title} </h1>
        <Create
          name="Assunto"
          title="Adicione um novo assunto"
          type="subject"
        />
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
          {subjects?.map((people: any) => {
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
