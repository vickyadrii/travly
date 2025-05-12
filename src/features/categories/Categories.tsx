import { api } from "@/configs";
import CategoryList from "./components/CategoryList";
import { useCallback, useEffect, useState } from "react";
import type { Category } from "./types";
import type { Meta, ResponseErrorJSON } from "@/types";
import { Spin } from "@/components/ui/spin";
import { toast } from "sonner";

export type List = {
  data?: Category[];
  meta?: Meta;
};

const Categories = () => {
  const [list, setList] = useState<List>({});
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/api/categories", {
        params: {
          "pagination[page]": page,
          "pagination[pageSize]": 10,
        },
      });
      setList(res);
    } catch (err) {
      const error = err as ResponseErrorJSON;
      toast.error(error.response?.data?.error?.message ?? "Oops something wrong!");
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  const handleOnChange = (newPage: number) => {
    setPage(newPage)
  }

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
        <CategoryList list={list} onPageChange={handleOnChange} />
      )}
    </div>
  );
};

export default Categories;
