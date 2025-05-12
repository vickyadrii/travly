import { useState } from "react";
import axios from "axios";

import { z } from "zod";
import { toast } from "sonner";
import { api } from "@/configs";
import { categories } from "./constants";
import { useForm } from "react-hook-form";
import { getAccessToken } from "@/lib/utils";
import type { ResponseErrorJSON } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";

import { Spin } from "@/components/ui/spin";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(5, { message: "Description must be at least 5 characters" }),
  category: z.coerce.number().min(1, { message: "Category is required" }),
});

type Props = {
  refetch: () => void;
  onClose: () => void;
};

const AddArticleForm = ({ refetch, onClose }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: undefined,
    },
  });

  const handleOnSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      let imageUrl = "";

      if (!file) {
        toast.error("Silakan upload gambar terlebih dahulu");
        return;
      }

      const formData = new FormData();
      formData.append("files", file);

      const token = getAccessToken();

      const uploadRes = await axios.post(`${import.meta.env.VITE_API_URL}/api/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const uploadData = uploadRes.data;
      if (!uploadRes.data) throw new Error(uploadData?.error || "Upload gagal");

      imageUrl = uploadRes.data?.[0]?.url;
      console.log(imageUrl);

      if (!imageUrl) {
        toast.error("Upload gagal. URL gambar tidak ditemukan.");
        return;
      }

      await api.post("/api/articles", {
        data: {
          ...values,
          cover_image_url: imageUrl,
        },
      });

      toast.success("Artikel berhasil ditambahkan!");
      refetch();
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      const error = err as ResponseErrorJSON;
      toast.error(error.response?.data?.error?.message ?? "Oops something wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-8">
          <div className="space-y-4">

            {/* title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Judul</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Judul..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Deskripsi..." className="resize-none h-28" {...field} rows={10} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* cover_image_url */}
            <FormItem>
              <FormLabel>Banner Foto</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setFile(e.target.files[0]);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            {/* category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Kategori</FormLabel>
                  <FormControl>
                    <Select onValueChange={(val) => field.onChange(Number(val))} value={String(field.value) || ""}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={String(category.value)}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end">
            <Button disabled={isLoading} size="lg" type="submit">
              {isLoading ? <Spin /> : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddArticleForm;
