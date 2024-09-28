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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, Trash } from "lucide-react";
import { Billboard, Category } from "@/core/models";
import { createCategory, deleteCategory, updateCategory } from "@/actions/owner/category";
import { routePath } from "@/core/route-path";
import { routeTags } from "@/core/route-tag";

const formSchema = z.object({
    name: z.string().min(1),
    billboardId: z.string()
});

type CategoryFormValues = z.infer<typeof formSchema>

interface CategoryFormProps {
    billboards: Billboard[];
    initialData: Category | null | undefined;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
    billboards,
    initialData
}) => {
    const params: { storeId: string, categoryId: string } = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit category" : "Create category"
    const description = initialData ? "Edit category" : "Add a new category"
    const toastMessage = initialData ? "Category updated." : "Category created."
    const action = initialData ? "Save changes" : "Create"

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            billboardId: ''
        }
    });

    const onSubmit = async (values: CategoryFormValues) => {
        try {
            setLoading(true);
            let res
            if (initialData) {
                res = await updateCategory({ data: { ...values, id: initialData.id } })
            } else {
                res = await createCategory({ data: { ...values, storeId: params.storeId }, redirectPath: routePath.categories(params.storeId) })
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
            await deleteCategory({ data: { id: params.categoryId }, redirectPath: routePath.categories(params.storeId), revalidateTags: [routeTags.getCategories()] })
            toast.success("Category deleted.")
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Make sure you removed all categories using this category first.");
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
                            onClick={() => router.push(routePath.categories(params.storeId))}
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
                                        <Input className="md:w-full w-60" disabled={loading} placeholder="Category name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="billboardId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Billboard</FormLabel>
                                    <Select
                                        disabled={loading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="md:w-full w-60">
                                                <SelectValue defaultValue={field.value} placeholder="Select a billboard" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {billboards.map((billboard) => (
                                                <SelectItem
                                                    key={billboard.id}
                                                    value={billboard.id}
                                                >
                                                    {billboard.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
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
