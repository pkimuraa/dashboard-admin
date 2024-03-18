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
import CreateTask from "../Manager/CreateTask";
  
  interface ManagerTableProps {
    title: string;
    page: string;
  }
  
  async function getTaskManagement() {
    let { data: task, error } = await supabase
      .from("manager")
      .select("*")
      .range(0, 9);
  
    return task;
  }
  
  export default function ManagerTable({ title }: ManagerTableProps) {
    const { deleteSubject } = useSubjectsMutations();
    const [rowName, setRowName] = useState<any>();
  
    const { data: tasks } = useQuery<any>({
      queryKey: ["supa", "task"],
      queryFn: getTaskManagement,
    });
  
    const deleteUser = async (payload: any) => {
      await deleteSubject(payload);
    };
  
    useEffect(() => {
      if (tasks?.length > 0) {
        let tableHeads: any = [];
        tableHeads = Array.from(Object?.keys(tasks[0]));
  
        setRowName(tableHeads);
        console.log(rowName);
      }
    }, [tasks]);
    return (
      <div className="px-4 w-full flex-wrap h-fit flex py-4  rounded border ">
        <div className="w-full flex mb-4 items-center">
          <h1 className="w-full"> {title} </h1>
          <CreateTask/>
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
            {tasks?.map((task: any) => {
              return (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.id}</TableCell>
                  <TableCell>
                    {format(new Date(task?.created_at), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>{task.responsable}</TableCell>
                  <TableCell>{task.subject}</TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>{task.due_date}</TableCell>
                  <TableCell>{task.task}</TableCell>

                  <TableCell>
                    <Trash
                      color="red"
                      className="cursor-pointer"
                      onClick={() => deleteUser(task?.id)}
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
  