import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Link, useNavigate } from "react-router";

import { api } from "@/configs";
import { Spin } from "@/components/ui/spin";
import { setAccessToken } from "@/lib/utils";
import { toast } from "sonner";
import type { ResponseErrorJSON } from "@/types";

type responseSuccessAuthJSON = {
  jwt: string;
  user: {
    blocked: boolean;
    confirmed: boolean;
    createdAt: Date;
    documentId: string;
    email: string;
    id: number;
    provider: string;
    publishedAt: Date;
    updatedAt: Date;
    username: string;
  };
};

const formSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: "Email must be at least 2 characters.",
    })
    .email("This is not a valid email"),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(4, { message: "Password must be at least 4 characters" }),
});

const RegisterForm = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const handleOnSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const res: responseSuccessAuthJSON = await api.post("/api/auth/local/register", values);

      setAccessToken(res.jwt);
      localStorage.setItem('user-data', JSON.stringify(res.user));
      toast.success("Berhasil mendaftar!");

      setTimeout(() => {
        navigate("/articles");
      }, 750);
    } catch (error) {
      const err = error as ResponseErrorJSON;

      toast.error(err?.response?.data?.error?.message ?? "Oops Something Wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-extrabold">Selamat datang di Trivy App</h2>
        <Link to="/login" className="text-sm font-bold text-sky-600 hover:underline">
          Sudah punya akun? Login
        </Link>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-8">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Username..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end">
            <Button disabled={isLoading} size="lg" type="submit">
              {isLoading ? <Spin /> : "Daftar"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
