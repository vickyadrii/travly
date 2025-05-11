import dayjs from "dayjs";
import type { List } from "../Articles";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

type Props = {
  list: List;
  onPageChange: (page: number) => void;
};

const ArticleList = ({ list, onPageChange }: Props) => {
  const { data, meta } = list;
  const page = meta?.pagination?.page ?? 1;
  const pageCount = meta?.pagination?.pageCount ?? 1;

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
                <Button asChild variant='ghost'>
                  <Link to={`/articles/${article.documentId}`}>Lihat Detail</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" onClick={() => onPageChange(Math.max(1, page - 1))} />
          </PaginationItem>

          {[...Array(pageCount)].map((_, index) => {
            const currentPage = index + 1;
            return (
              <PaginationItem key={currentPage}>
                <PaginationLink href="#" isActive={currentPage === page} onClick={() => onPageChange(currentPage)}>
                  {currentPage}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext href="#" onClick={() => onPageChange(Math.min(page + 1, pageCount))} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default ArticleList;
