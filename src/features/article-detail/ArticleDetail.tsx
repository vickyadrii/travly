import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ArticleDetailContent from "./components/ArticleDetailContent";
import { useNavigate, useParams } from "react-router";
import type { ResponseErrorJSON } from "@/types";
import { api } from "@/configs";
import type { Article } from "../articles/types";
import { toast } from "sonner";

const ArticleDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const documentID = params.id;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<Article>({});
  const isNotEmpty = Object.entries(data).length > 0;

  const handleGoBack = () => {
    navigate(-1);
  };

  const getArticleByID = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await api.get(`/api/articles/${documentID}`, {
        params: {
          populate: "*",
        },
      });
      setData(res.data);
    } catch (err) {
      const error = err as ResponseErrorJSON;
      toast.error(error.response?.data?.error?.message ?? "Oops something wrong!");
    } finally {
      setIsLoading(false);
    }
  }, [documentID]);

  useEffect(() => {
    getArticleByID();
  }, [getArticleByID]);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-1">
        <Button size="icon" variant="ghost" onClick={handleGoBack}>
          <ArrowLeft className="text-sky-600" />
        </Button>
        <h3 className="text-lg font-extrabold">Detail Artikel</h3>
      </div>

      {!isNotEmpty && !isLoading ? (
        <p className="text-sm">Artikel tidak ditemukan</p>
      ) : (
        <ArticleDetailContent isLoading={isLoading} article={data} refetch={getArticleByID} />
      )}
    </div>
  );
};

export default ArticleDetail;
