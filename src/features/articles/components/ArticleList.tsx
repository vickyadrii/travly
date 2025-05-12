import dayjs from "dayjs";
import type { List } from "../Articles";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import { Eye } from "lucide-react";
import DeleteButton from "./DeleteButton";


type Props = {
  list: List;
  refetch: () => void;
};

const ArticleList = ({ list, refetch }: Props) => {
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
            <TableHead className="w-[400px]"></TableHead>
            <TableHead>Penulis</TableHead>
            <TableHead>Tanggal Rilis</TableHead>
            <TableHead className="text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody isEmpty={data?.length === 0} emptyMessage="Tidak ada artikel yang tersedia">
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
                  className="rounded md:h-28 md:w-full w-[200px] object-cover"
                />
              </TableCell>
              <TableCell className="font-bold">{article?.title}</TableCell>
              <TableCell className="capitalize">{article?.user?.username}</TableCell>
              <TableCell>{dayjs(article?.publishedAt).format("DD MMMM YYYY")}</TableCell>
              <TableCell className="text-center space-x-2">
                {/* go to detail button */}
                <Button asChild variant="outline">
                  <Link to={`/articles/${article.documentId}`}>
                    <Eye />
                    Lihat
                  </Link>
                </Button>
                {/* delete button */}
                <DeleteButton documentID={article.documentId ?? ""} refetch={refetch} />
                {/* edit button */}
                {/* <Button variant="outline-primary">
                  <PencilLine /> Ubah
                </Button> */}
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
