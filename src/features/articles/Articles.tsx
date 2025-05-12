import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router";

import { api } from "@/configs";
import ArticleList from "./components/ArticleList";
import type { Article } from "./types";
import type { Meta, ResponseErrorJSON } from "@/types";
import { Spin } from "@/components/ui/spin";

import { toast } from "sonner";
import AddArticle from "./components/AddArticle";

export type List = {
  data?: Article[];
  meta?: Meta;
};

const Articles = () => {
  const [list, setList] = useState<List>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 5;

  const getArticles = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/api/articles", {
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
    getArticles();
  }, [getArticles]);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center">
          <Spin />
        </div>
      ) : (
        <div className="space-y-6">
          <AddArticle refetch={getArticles} />
          <ArticleList list={list} refetch={getArticles} />
        </div>
      )}
    </div>
  );
};

export default Articles;
