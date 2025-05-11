import type { Article, User } from "../articles/types";

export type Comment = {
  id: 3;
  documentId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: null;
  user: User;
  articles: Article[];
};
