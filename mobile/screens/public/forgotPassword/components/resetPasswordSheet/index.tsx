import BottomSheet from "@/components/bottomSheet";
import Typography from "@/components/typography";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React, { forwardRef } from "react";
import ResetPasswordForm, { IResetPasswordForm } from "../resetPasswordForm";

interface Props {
  isLoading: boolean;
  handleClose: () => void;
  handleResetPassword: (values: IResetPasswordForm) => Promise<void>;
}

// eslint-disable-next-line react/display-name
const ResetPasswordSheet = forwardRef<BottomSheetMethods, Props>(
  ({ isLoading, handleClose, handleResetPassword }, ref) => {
    return (
      <BottomSheet
        ref={ref}
        enablePanDownToClose={!isLoading}
        backdropPressBehaviour={isLoading ? "none" : "close"}
        header="Reset Password"
      >
        <Typography className="text-center max-w-[300px] mb-5 mx-auto">
          Enter your new password
        </Typography>
        <ResetPasswordForm
          isLoading={isLoading}
          handleResetPassword={handleResetPassword}
          handleClose={handleClose}
        />
      </BottomSheet>
    );
  }
);

export default ResetPasswordSheet;
