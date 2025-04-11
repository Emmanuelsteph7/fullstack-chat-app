import { useRef } from "react";
import Dialog from "../../../../../../components/dialog";
import Button from "../../../../../../components/button";

interface Props {
  handleDeleteMessage: () => void;
  isDeleting: boolean;
}

const DeleteMessage = ({ handleDeleteMessage, isDeleting }: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleDialogOpen = () => {
    dialogRef.current?.showModal();
  };

  return (
    <>
      <button onClick={handleDialogOpen} type="button">
        Delete
      </button>
      <Dialog ref={dialogRef}>
        <h3 className="text-[24px] mb-10 font-semibold">Delete Message</h3>
        <div className="flex justify-center items-center gap-5">
          <Button variant="secondary" disabled={isDeleting} label="Cancel" />
          <Button
            label="Delete"
            loading={isDeleting}
            onClick={handleDeleteMessage}
          />
        </div>
      </Dialog>
    </>
  );
};

export default DeleteMessage;
