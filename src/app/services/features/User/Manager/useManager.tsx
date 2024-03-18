import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { supabase } from "../../../../services/supabase";
import { queryClient } from "../../../../services/api/queryClient";

async function createNewTask(params: any) {
  await supabase
    .from("manager")
    .insert([{ task: params.name, responsable: params.responsable, subject: params.subject, status: params.status  }])
    .select();
}

async function deleteResponsable(params: any) {
  await supabase.from("responsable").delete().eq("id", params);
}

const useManagerMutations = () => {
  const { mutateAsync: createNewTaskMutation } = useMutation({
    mutationFn: createNewTask,
    mutationKey: ["createNewTask"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supa", "manage"] });
      toast.success("Pessoa criada com sucesso");
    },
  });

  const { mutateAsync: deleteResponsableMutation } = useMutation({
    mutationFn: deleteResponsable,
    mutationKey: ["deleteResponsable"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supa", "responsable"] });
      toast.success("Pessoa excluída com sucesso");
    },
    onError: () => {
      toast.error("Algo Aconteceu");
    },
  });

  return {
    createTask: createNewTaskMutation,
    deleteResponsable: deleteResponsableMutation,
  };
};

export default useManagerMutations;
