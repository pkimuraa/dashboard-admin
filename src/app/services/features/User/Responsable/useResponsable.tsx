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

const useResponsableMutations = () => {
  const { mutateAsync: createResponsableMutation } = useMutation({
    mutationFn: createResponsable,
    mutationKey: ["createResponsable"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supa", "responsable"] });
      toast.success("Pessoa criada com sucesso");
    },
  });

  return {
    createResponsable: createResponsableMutation,
  };
};

export default useResponsableMutations;
