import { api } from "@/configs";
import ArticleList from "./components/ArticleList";
import { useCallback, useEffect, useState } from "react";
import type { Article } from "./types";
import type { Meta } from "@/types";
import { Spin } from "@/components/ui/spin";

export type List = {
  data?: Article[];
  meta?: Meta;
};

const Articles = () => {
  const [list, setList] = useState<List>({});
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getArticles = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/api/articles", {
        params: {
          populate: "*",
          "pagination[page]": page,
          "pagination[pageSize]": 5,
        },
      });
      setList(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  const handleOnChange = (newPage: number) => {
    setPage(newPage)
  }

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
        <ArticleList list={list} onPageChange={handleOnChange} />
      )}
    </div>
  );
};

export default Articles;
