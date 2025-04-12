import { useRef } from "react";

const useDialog = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleDialogOpen = () => {
    dialogRef.current?.showModal();
  };

  const handleDialogClose = () => {
    dialogRef.current?.close();
  };

  return { dialogRef, handleDialogClose, handleDialogOpen };
};

export default useDialog;
