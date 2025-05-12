import { useCallback, useState } from "react";
import { Trash } from "lucide-react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { api } from "@/configs";
import type { ResponseErrorJSON } from "@/types";
import { Spin } from "@/components/ui/spin";

type Props = {
  documentID: string;
  refetch: () => void;
};

const DeleteButton = ({ documentID, refetch }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOnSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await api.delete(`/api/articles/${documentID}`);

      toast.success("Artikel berhasil dihapus");
      refetch();

      setTimeout(() => {
        setIsOpen(false);
      }, 1000);
    } catch (err) {
      const error = err as ResponseErrorJSON;
      toast.error(error.response?.data?.error?.message ?? "Oops something wrong!");
    } finally {
      setIsLoading(false);
    }
  }, [documentID, refetch]);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline-destructive">
          <Trash /> Hapus
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Notification</AlertDialogTitle>
          <AlertDialogDescription>Apakah kamu yakin ingin menghapus artikel ini?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Batal</AlertDialogCancel>

          <Button disabled={isLoading} onClick={handleOnSubmit}>
            {isLoading ? <Spin /> : "Ya"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteButton;
