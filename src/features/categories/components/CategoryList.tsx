import dayjs from "dayjs";

import type { List } from "../Categories";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";


type Props = {
  list: List;
  onPageChange: (page: number) => void;
};

const CategoryList = ({ list, onPageChange }: Props) => {
  const { data, meta } = list;
  const page = meta?.pagination?.page ?? 1;
  const pageCount = meta?.pagination?.pageCount ?? 1;

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama Category</TableHead>
            <TableHead>Tanggal Dibuat</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((category) => (
            <TableRow key={category.documentId}>
              <TableCell className="font-bold">{category?.name}</TableCell>
              <TableCell>{dayjs(category?.publishedAt).format("DD MMMM YYYY")}</TableCell>
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

export default CategoryList;
