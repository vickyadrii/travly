import type { Category } from "../categories/types";

export type User = {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
};

export type Comment = {
  id?: number;
  documentId?: string;
  content?: string;
  createdAt?: Date;
  updatedAt?: Date;
  publishedAt?: Date;
  locale?: null;
  user?: User;
};

export type Article = {
  category?: Category;
  comments?: Comment[] | [];
  cover_image_url?: string;
  createdAt?: Date;
  description?: string;
  documentId?: string;
  id?: number;
  locale?: unknown | null;
  user?: User;
  publishedAt?: Date;
  title?: string;
  updatedAt?: Date;
};
