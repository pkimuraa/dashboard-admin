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
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/app/services/supabase";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import useManagerMutations from "@/app/services/features/User/Manager/useManager";

async function getSubjects() {
    let { data: subjects, error } = await supabase
        .from("subjects")
        .select("*")
        .range(0, 9);

    return subjects;
}

async function getResponsables() {
    let { data: responsable, error } = await supabase
        .from("responsable")
        .select("*")
        .range(0, 9);

    return responsable;
}

export default function CreateTask() {
    const { createTask } = useManagerMutations()

    const { data: subjects } = useQuery<any>({
        queryKey: ["supa", "subjects"],
        queryFn: getSubjects,
    });

    const { data: responsable } = useQuery<any>({
        queryKey: ["supa", "responsable"],
        queryFn: getResponsables,
    });

    const formSchema = z.object({
        name: z.string().min(4),
        responsable: z.string(),
        subject: z.string(),
        status: z.string()
    });
    const onSubmit = async (payload: any) => {
        await createTask(payload)
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
                <Button>Nova Tarefa</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicione uma nova Tarefa</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome da tarefa</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="responsable"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Responsável</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Responsável" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {responsable && responsable[0] &&
                                                    responsable.map((resp: any) => {
                                                        return (
                                                            <SelectItem value={resp.name} key={resp.id}>{resp.name}</SelectItem>
                                                        )
                                                    })


                                                }
                                            </SelectContent>

                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Assunto</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Assunto" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {subjects && subjects[0] &&
                                                    subjects.map((subj: any) => {
                                                        return (
                                                            <SelectItem value={subj.name} key={subj.id}>{subj.name}</SelectItem>
                                                        )
                                                    })


                                                }
                                            </SelectContent>

                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                            <SelectItem value="done">Concluído</SelectItem>
                                            <SelectItem value="pending">Pendente</SelectItem>
                                            <SelectItem value="todo">A Iniciar</SelectItem>
                                                <SelectItem value="progress">Em Andamento</SelectItem>
                                            </SelectContent>

                                        </Select>
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
