"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/modals/alert-modal";
import ImageUpload from "@/components/ui/image-upload";
import { ChevronLeft, Trash } from "lucide-react";
import { Billboard } from "@/core/models";
import { createBillboard, deleteBillboard, updateBillboard } from "@/actions/owner/billboard";
import { routePath } from "@/core/route-path";
import { routeTags } from "@/core/route-tag";

const formSchema = z.object({
    label: z.string().min(1),
    imageUrl: z.string().min(1)
});

type BillboardFormValues = z.infer<typeof formSchema>

interface BillboardFormProps {
    initialData: Billboard | null | undefined;
}

export const BillboardForm: React.FC<BillboardFormProps> = ({
    initialData
}) => {
    const params: { storeId: string, billboardId: string } = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit billboard" : "Create billboard"
    const description = initialData ? "Edit billboard" : "Add a new billboard"
    const toastMessage = initialData ? "Billboard updated." : "Billboard created."
    const action = initialData ? "Save changes" : "Create"

    const form = useForm<BillboardFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            label: '',
            imageUrl: ''
        }
    });

    const onSubmit = async (values: BillboardFormValues) => {
        try {
            setLoading(true);
            let res
            if (initialData) {
                res = await updateBillboard({ data: { ...values, id: initialData.id } })
            } else {
                res = await createBillboard({ data: { ...values, storeId: params.storeId }, redirectPath: routePath.billboards(params.storeId) })
            }
            toast.success(toastMessage);
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Something went wrong.");
            }
        } finally {
            setLoading(false);
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true);
            await deleteBillboard({ data: { id: params.billboardId }, redirectPath: routePath.billboards(params.storeId), revalidateTags: [routeTags.getBillboards()] })
            toast.success("Billboard deleted.")
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Make sure you removed all categories using this billboard first.");
            }
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className="flex items-center justify-between">
                <Heading
                    title={title}
                    description={description}
                />
                {initialData
                    ? (
                        <Button
                            disabled={loading}
                            variant="destructive"
                            size="icon"
                            onClick={() => setOpen(true)}
                        >
                            <Trash className="h-4 w-4" />
                        </Button>
                    )
                    : (
                        <Button
                            disabled={loading}
                            variant="outline"
                            size="icon"
                            onClick={() => router.push(routePath.billboards(params.storeId))}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                    )
                }
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Background image</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        width="w-[200px]"
                                        value={field.value ? [field.value] : []}
                                        disabled={loading}
                                        onChange={(url) => field.onChange(url)}
                                        onRemove={() => field.onChange("")}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="label"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Label</FormLabel>
                                    <FormControl>
                                        <Input className="md:w-full w-60" disabled={loading} placeholder="Billboard label" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    )
}
