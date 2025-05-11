import { Route, Routes } from "react-router";
import { HomePage, ArticlesPage } from "@/pages";
import { PrimaryLayout } from "@/layouts/primary-layout";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<PrimaryLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/articles" element={<ArticlesPage />} />
      </Route>
    </Routes>
  );
};

export default Routers;
