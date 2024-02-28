import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useResponsableMutations from "@/app/services/features/User/Responsable/useResponsable";
import useSubjectsMutations from "@/app/services/features/User/Subject/useSubject";

interface CreateButtonProps {
  type: string;
  name: string;
  title: string;
}

export default function CreatePeople({ type, name, title }: CreateButtonProps) {
  const { createResponsable } = useResponsableMutations();
  const { createSubject } = useSubjectsMutations();
  const formSchema = z.object({
    name: z.string().min(4),
  });
  const onSubmit = async (payload: any) => {
    if (type === "responsable") {
      await createResponsable(payload);
    } else {
      await createSubject(payload);
    }
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Novo {name}</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit"> Criar</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
