import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { supabase } from "../../../../services/supabase";
import { queryClient } from "../../../../services/api/queryClient";

async function createSubject(params: any) {
  await supabase
    .from("subjects")
    .insert([{ name: params.name }])
    .select();
}

async function deleteSubject(params: any) {
  await supabase.from("subjects").delete().eq("id", params);
}

const useSubjectsMutations = () => {
  const { mutateAsync: createSubjectsMutation } = useMutation({
    mutationFn: createSubject,
    mutationKey: ["createSubject"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supa", "subjects"] });
      toast.success("Assunto criado com sucesso");
    },
    onError: () => {
      toast.error("Algo Aconteceu");
    },
  });

  const { mutateAsync: deleteSubjectMutation } = useMutation({
    mutationFn: deleteSubject,
    mutationKey: ["deleteSubject"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supa", "subjects"] });
      toast.success("Assunto excluído com sucesso");
    },
    onError: () => {
      toast.error("Algo Aconteceu");
    },
  });

  return {
    createSubject: createSubjectsMutation,
    deleteSubject: deleteSubjectMutation,
  };
};

export default useSubjectsMutations;
