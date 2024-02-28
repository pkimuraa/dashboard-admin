import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { supabase } from "../../../../services/supabase";
import { queryClient } from "../../../../services/api/queryClient";

async function createResponsable(params: any) {
  await supabase
    .from("responsable")
    .insert([{ name: params.name }])
    .select();
}

async function deleteResponsable(params: any) {
  await supabase.from("responsable").delete().eq("id", params);
}

const useResponsableMutations = () => {
  const { mutateAsync: createResponsableMutation } = useMutation({
    mutationFn: createResponsable,
    mutationKey: ["createResponsable"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supa", "responsable"] });
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
    createResponsable: createResponsableMutation,
    deleteResponsable: deleteResponsableMutation,
  };
};

export default useResponsableMutations;
