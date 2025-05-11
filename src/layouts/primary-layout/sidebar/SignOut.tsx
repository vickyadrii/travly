import { useNavigate } from "react-router";

import { LogOut } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { removeAccessToken } from "@/lib/utils";
import { toast } from "sonner";

const SignOut = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast("Berhasil keluar!");
    removeAccessToken();
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className="absolute left-0 bottom-0 p-5">
            <Button variant="destructive">
              <LogOut />
              Keluar
            </Button>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Notification</AlertDialogTitle>
            <AlertDialogDescription>Apakah kamu yakin ingin keluar?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>Ok</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SignOut;
