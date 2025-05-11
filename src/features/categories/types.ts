import type { Article } from "../articles/types";

export type Category = {
  articles?: Article[];
  createdAt: Date;
  description?: string;
  documentId: string;
  id: number;
  locale: unknown | null;
  localizations: unknown;
  name: string;
  publishedAt: Date;
  updatedAt: Date;
};
