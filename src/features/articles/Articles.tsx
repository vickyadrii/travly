import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router";

import { api } from "@/configs";
import ArticleList from "./components/ArticleList";
import type { Article, Params } from "./types";
import type { Meta, ResponseErrorJSON } from "@/types";
import { Spin } from "@/components/ui/spin";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { toast } from "sonner";
import AddArticle from "./components/AddArticle";
import { categories } from "./constants";
import { X } from "lucide-react";

export type List = {
  data?: Article[];
  meta?: Meta;
};

const Articles = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 5;

  const [list, setList] = useState<List>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [params, setParams] = useState<Params>({
    populate: "*",
    "pagination[page]": page,
    "pagination[pageSize]": pageSize,
    "filters[category][id]": null,
  });

  const categoryID = Number(params["filters[category][id]"]);

  const getArticles = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/api/articles", {
        params,
      });
      setList(res);
    } catch (err) {
      const error = err as ResponseErrorJSON;
      toast.error(error.response?.data?.error?.message ?? "Oops something wrong!");
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  useEffect(() => {
    getArticles();
  }, [getArticles]);

  return (
    <div>
      <div className="space-y-6">
        {/* header section */}
        <div className="flex items-center gap-4 justify-between">
          <div className="relative w-full max-w-xs">
            <Select
              key={categoryID ?? "unfiltered"}
              onValueChange={(val) => setParams({ ...params, "filters[category][id]": Number(val) })}
            >
              <SelectTrigger className="w-full">
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
            {categoryID ? (
              <button
                onClick={() => setParams({ ...params, "filters[category][id]": null })}
                className="absolute right-8 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>
          <AddArticle refetch={getArticles} />
        </div>

        {isLoading ? (
          <div className="flex justify-center">
            <Spin />
          </div>
        ) : (
          // content section
          <ArticleList list={list} refetch={getArticles} />
        )}
      </div>
    </div>
  );
};

export default Articles;
