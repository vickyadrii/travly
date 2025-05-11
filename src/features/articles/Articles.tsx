import { api } from "@/configs";
import ArticleList from "./components/ArticleList";
import { useCallback, useEffect, useState } from "react";
import type { Article } from "./types";
import type { Meta } from "@/types";
import { Spin } from "@/components/ui/spin";
import { useLocation } from "react-router";

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
    } catch (error) {
      console.log(error);
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
        <ArticleList list={list} />
      )}
    </div>
  );
};

export default Articles;
