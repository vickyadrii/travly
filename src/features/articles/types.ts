export type User = {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
};

export type Article = {
  cover_image_url: string;
  createdAt: Date;
  description: string;
  documentId: string;
  id: number;
  locale: unknown | null;
  user: User;
  publishedAt: Date;
  title: string;
  updatedAt: Date;
};
