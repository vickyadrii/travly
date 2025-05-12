import { api } from "@/configs";
import CommentList from "./components/CommentList";
import { useCallback, useEffect, useState } from "react";
import type { Meta, ResponseErrorJSON } from "@/types";
import { Spin } from "@/components/ui/spin";
import { useLocation } from "react-router";
import type { Comment } from "../articles/types";
import { toast } from "sonner";

export type List = {
  data?: Comment[];
  meta?: Meta;
};

const Comments = () => {
  const [list, setList] = useState<List>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;

  const getCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/api/comments", {
        params: {
          populate: "*",
          "pagination[page]": page,
          "pagination[pageSize]": pageSize,
        },
      });
      setList(res);
    } catch (err) {
      const error = err as ResponseErrorJSON;
      toast.error(error.response?.data?.error?.message ?? "Oops something wrong!");
    } finally {
      setIsLoading(false);
    }
  }, [page, pageSize]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center">
          <Spin />
        </div>
      ) : (
        <CommentList list={list} />
      )}
    </div>
  );
};

export default Comments;
