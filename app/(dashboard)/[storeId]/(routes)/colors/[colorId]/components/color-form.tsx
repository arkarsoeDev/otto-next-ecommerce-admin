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
import { Color } from "@/core/models";
import { createColor, deleteColor, updateColor } from "@/actions/owner/color";
import { routePath } from "@/core/route-path";
import { routeTags } from "@/core/route-tag";

const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(1)
});

type ColorFormValues = z.infer<typeof formSchema>

interface ColorFormProps {
    initialData: Color | null | undefined;
}

export const ColorForm: React.FC<ColorFormProps> = ({
    initialData
}) => {
    const params: { storeId: string, colorId: string } = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit color" : "Create color"
    const description = initialData ? "Edit color" : "Add a new color"
    const toastMessage = initialData ? "Color updated." : "Color created."
    const action = initialData ? "Save changes" : "Create"

    const form = useForm<ColorFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            value: ''
        }
    });

    const onSubmit = async (values: ColorFormValues) => {
        try {
            setLoading(true);
            let res
            if (initialData) {
                res = await updateColor({ data: { ...values, id: initialData.id } })
            } else {
                res = await createColor({ data: { ...values, storeId: params.storeId }, redirectPath: routePath.colors(params.storeId) })
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
            await deleteColor({ data: { id: params.colorId }, redirectPath: routePath.colors(params.storeId), revalidateTags: [routeTags.getColors()] })
            toast.success("Color deleted.")
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Make sure you removed all categories using this color first.");
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
                            color="icon"
                            onClick={() => setOpen(true)}
                        >
                            <Trash className="h-4 w-4" />
                        </Button>
                    )
                    : (
                        <Button
                            disabled={loading}
                            variant="outline"
                            color="icon"
                            onClick={() => router.push(routePath.colors(params.storeId))}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                    )
                }
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input className="md:w-full w-60" disabled={loading} placeholder="Color name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Value</FormLabel>
                                    <FormControl>
                                        <Input className="md:w-full w-60" disabled={loading} placeholder="Color value (ex: S, M, L...)" {...field} />
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
