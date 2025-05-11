import { Route, Routes } from "react-router";

import ProtectedRoute from "./ProtectedRoute";
import { ArticleDetailPage, ArticlesPage, HomePage, NotFoundPage } from "@/pages";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:id" element={<ArticleDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default PrivateRoutes;
