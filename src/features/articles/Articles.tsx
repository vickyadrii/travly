import { api } from "@/configs";
import ArticleList from "./components/ArticleList";
import { useCallback, useEffect, useState } from "react";
import type { Article } from "./types";
import type { Meta } from "@/types";
import { Spin } from "@/components/ui/spin";
import { useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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
        <div className="space-y-6">
          <div className="flex justify-end">
            <Button size='lg' variant='outline-primary'>
              Tambah Artikel <span className="bg-primary text-white rounded-full"><Plus /></span>
            </Button>
          </div>
          <ArticleList list={list} refetch={getArticles} />
        </div>
      )}
    </div>
  );
};

export default Articles;
