import dayjs from "dayjs";
import type { List } from "../Articles";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";

type Props = {
  list: List;
};

const ArticleList = ({ list }: Props) => {
  const { data, meta } = list;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || meta?.pagination.pageSize || 5;

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Cover</TableHead>
            <TableHead className="w-[100px]"></TableHead>
            <TableHead>Penulis</TableHead>
            <TableHead>Tanggal Rilis</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((article) => (
            <TableRow key={article.documentId}>
              <TableCell className="w-40">
                <img
                  src={
                    !article.cover_image_url
                      ? "https://www.contentviewspro.com/wp-content/uploads/2017/07/default_image.png"
                      : article.cover_image_url
                  }
                  alt={article.title}
                  className="rounded h-28 w-full object-cover"
                />
              </TableCell>
              <TableCell className="font-bold">{article?.title}</TableCell>
              <TableCell>{article?.user?.username}</TableCell>
              <TableCell>{dayjs(article?.publishedAt).format("DD MMMM YYYY")}</TableCell>
              <TableCell>
                <Button asChild variant="ghost">
                  <Link to={`/articles/${article.documentId}`}>Lihat Detail</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <PaginationWithLinks page={page} pageSize={pageSize} totalCount={meta?.pagination?.total ?? 0} />
    </>
  );
};

export default ArticleList;
