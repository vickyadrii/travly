"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useCallback, useState } from "react";
import { api } from "@/configs";
import type { ResponseErrorJSON } from "@/types";
import { Spin } from "@/components/ui/spin";

type Props = {
  id: number;
  refetch: () => void;
};

const FormSchema = z.object({
  content: z
    .string()
    .min(5, {
      message: "Comment must be at least 5 characters.",
    })
    .max(160, {
      message: "Comment must not be longer than 160 characters.",
    }),
});

const CommentForm = ({ id, refetch }: Props) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      content: "",
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOnSubmit = useCallback(
    async (data: z.infer<typeof FormSchema>) => {
      try {
        setIsLoading(true);
        await api.post("/api/comments", {
          data: {
            content: data.content,
            article: id
          },
        });
        refetch();
        form.reset();
        toast.success("Komentar berhasil ditambahkan.");
      } catch (err) {
        const error = err as ResponseErrorJSON;
        toast.error(error.response?.data?.error?.message ?? "Oops something wrong!");
      } finally {
        setIsLoading(false);
      }
    },
    [refetch, id, form]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleOnSubmit)} className=" space-y-6">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-extrabold text-lg">Komentar</FormLabel>
              <FormControl>
                <Textarea placeholder="Apa pendapatmu?" className="resize-none h-28" {...field} rows={10} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button disabled={isLoading} type="submit">
            {isLoading ? <Spin /> : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CommentForm;
