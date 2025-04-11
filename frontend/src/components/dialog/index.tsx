import { forwardRef, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const Dialog = forwardRef<HTMLDialogElement, Props>(({ children }, ref) => {
  return (
    <dialog ref={ref} className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute text-base-content right-2 top-2">
            ✕
          </button>
        </form>
        {children}
      </div>
    </dialog>
  );
});

export default Dialog;
