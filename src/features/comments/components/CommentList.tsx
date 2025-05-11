import dayjs from "dayjs";

import type { List } from "../Comments";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";

type Props = {
  list: List;
};

const CommentList = ({ list }: Props) => {
  const { data, meta } = list;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || meta?.pagination.pageSize || 10;

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Komentar</TableHead>
            <TableHead>Tanggal Dibuat</TableHead>
            <TableHead>Nama Pemberi Komentar</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((comment) => (
            <TableRow key={comment.documentId}>
              <TableCell className="font-bold">{comment?.content}</TableCell>
              <TableCell>{dayjs(comment?.publishedAt).format("DD MMMM YYYY")}</TableCell>
              <TableCell>{comment.user.username}</TableCell>
              <TableCell>
                <Button asChild variant="ghost">
                  <Link to={`/comments/${comment.documentId}`}>Lihat Detail</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <PaginationWithLinks
        page={page}
        pageSize={pageSize}
        totalCount={meta?.pagination?.total ?? 0}
      />
    </>
  );
};

export default CommentList;
