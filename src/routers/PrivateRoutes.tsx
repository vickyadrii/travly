import { Route, Routes } from "react-router";

import ProtectedRoute from "./ProtectedRoute";
import {
  ArticleDetailPage,
  ArticlesPage,
  CategoriesPage,
  CategoryDetailPage,
  CommentDetailPage,
  CommentsPage,
  NotFoundPage,
} from "@/pages";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:id" element={<ArticleDetailPage />} />
        <Route path="/comments" element={<CommentsPage />} />
        <Route path="/comments/:id" element={<CommentDetailPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/categories/:id" element={<CategoryDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default PrivateRoutes;
