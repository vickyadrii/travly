import dayjs from "dayjs";

import Card from "@/components/ui/card";

import { Calendar } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import CommentForm from "./CommentForm";
import ArticleCommentList from "./ArticleCommentList";
import { copyToClipboard } from "@/lib/utils";
import { toast } from "sonner";
import { socialMediaLink } from "../constants";

import type { Article } from "@/features/articles/types";

type Props = {
  isLoading: boolean;
  article: Article;
  refetch: () => void;
};

const ArticleDetailContent = ({ article, isLoading, refetch }: Props) => {
  const handleShare = (url: string, action: string) => {
    if (!!action && action === "copy") {
      copyToClipboard(url);
      toast.success("Copied to clipboard!");
    } else {
      window.open(url);
    }
  };

  return (
    <Card>
      <div className="space-y-6">
        {/* title, author and published at */}
        {isLoading ? (
          <div>
            <div className="flex flex-col gap-4">
              <Skeleton className="w-full h-6" />
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-3xl font-extrabold">{article.title}</h2>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <img src="/assets/images/profile-default.webp" alt="profile-default" className="w-5 h-5" />
                <p className="font-semibold text-gray-700 text-sm">
                  Author: <span className="capitalize">{article.user?.username}</span>
                </p>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-5 h-5" />
                <p className="text-sm">{dayjs(article.publishedAt).format("DD MMMM YYYY")}</p>
              </div>
            </div>
          </div>
        )}

        {/* image */}
        {isLoading ? (
          <Skeleton className="h-96 w-full rounded-md" />
        ) : (
          <div>
            <img src={article.cover_image_url} alt={article.title} className="h-96 w-full object-cover rounded-md" />
          </div>
        )}

        {/* description */}
        <div>
          <p>{article.description}</p>
        </div>

        {/* share */}
        <div className="border-y border-y-gray-300">
          <div className="flex justify-end items-center gap-4 lg:px-6 px-2 md:py-8 py-6">
            <span className="lg:text-base text-xs lg:text-left text-center lg:font-medium">bagikan</span>
            <div className="flex items-center lg:gap-4 gap-1 shrink-0">
              {socialMediaLink.map(({ icon, link, action }) => (
                <Button size="icon" variant="outline" onClick={() => handleShare(link, action ?? "")} key={link}>
                  <img src={icon} alt={link} />
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* comment form */}
        <div className="border-b border-b-gray-300 md:pb-8 pb-6">
          <CommentForm refetch={refetch} id={article.id ?? 0} />
        </div>

        {/* comment list */}
        <ArticleCommentList comments={article.comments || []} />
      </div>
    </Card>
  );
};

export default ArticleDetailContent;
