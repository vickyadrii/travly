import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import AddArticleForm from "./AddArticleForm";

type Props = {
  refetch: () => void;
};

const AddArticle = ({ refetch }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="flex justify-end">
          <Button size="lg" variant="outline-primary">
            Tambah Artikel
            <span className="bg-primary text-white rounded-full">
              <Plus />
            </span>
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="mb-2">
          <DialogTitle>Tambah Artikel</DialogTitle>
        </DialogHeader>
        <AddArticleForm refetch={refetch} onClose={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default AddArticle;
