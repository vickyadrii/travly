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
  identifier: z.string().min(2, {
    message: "Username/Email must be at least 2 characters.",
  }),
  password: z.string().min(4, { message: "Password must be at least 4 characters" }),
});

const SignInForm = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const handleOnSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const res: responseSuccessAuthJSON = await api.post("/api/auth/local", values);

      setAccessToken(res.jwt);
      toast.success("Login successfully!");

      setTimeout(() => {
        navigate("/dashboard");
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
        <h2 className="text-xl font-extrabold">Masuk ke Trivy App</h2>
        <Link to="/register" className="text-sm font-bold text-sky-600 hover:underline">
          Daftar
        </Link>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-8">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username/Email</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Username/Email..." {...field} />
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
            <Button size="lg" type="submit">
              {isLoading ? <Spin /> : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignInForm;
