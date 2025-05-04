import { useRef, useState } from "react";
import { IForgotPasswordForm } from "../components/forgotPasswordForm";
import BottomSheet from "@gorhom/bottom-sheet";
import { useToastStore } from "@/store/useToastStore";
import {
  forgotPasswordService,
  resetPasswordOtpService,
  verifyForgotPasswordOtpService,
} from "@/services/auth-service";
import { forgotPasswordSchema } from "../utils/forgotPasswordSchema";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { IResetPasswordForm } from "../components/resetPasswordForm";
import { useRouter } from "expo-router";

export interface IUseForgotPasswordResponse {
  isLoading: boolean;
  handleSubmit: (values: IForgotPasswordForm) => Promise<void>;
  validationSchema: any;
  isVerifyLoading: boolean;
  handleVerifyAccount: () => Promise<void>;
  handleOtpChange: (text: string) => void;
  otp: string;
  bottomSheetRef: React.RefObject<BottomSheetMethods | null>;
  resetPasswordSheetRef: React.RefObject<BottomSheetMethods | null>;
  handleModalOpen: () => void;
  handleModalClose: () => void;
  handleResetPassword: (values: IResetPasswordForm) => Promise<void>;
  isResetPasswordLoading: boolean;
  handleResetPasswordModalClose: () => void;
}

const useForgotPassword = (): IUseForgotPasswordResponse => {
  const [backupForm, setBackupForm] = useState<IForgotPasswordForm>();
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifyLoading, setIsVerifyLoading] = useState(false);
  const [isResetPasswordLoading, setIsResetPasswordLoading] = useState(false);
  const [otp, setOtp] = useState("");

  const bottomSheetRef = useRef<BottomSheet>(null);
  const resetPasswordSheetRef = useRef<BottomSheet>(null);

  const { handleSuccessToast } = useToastStore();
  const router = useRouter();

  const handleModalOpen = () => {
    bottomSheetRef.current?.expand();
  };

  const handleModalClose = () => {
    bottomSheetRef.current?.close();
    setOtp("");
  };

  const handleResetPasswordModalOpen = () => {
    resetPasswordSheetRef.current?.expand();
  };

  const handleResetPasswordModalClose = () => {
    resetPasswordSheetRef.current?.close();
  };

  const handleSubmit = async (values: IForgotPasswordForm) => {
    try {
      setIsLoading(true);
      setBackupForm(values);

      const res = await forgotPasswordService({ ...values, type: "mobile" });

      handleSuccessToast({ description: res.message });
      handleModalOpen();

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (text: string) => {
    setOtp(text);
  };

  const handleVerifyAccount = async () => {
    try {
      setIsVerifyLoading(true);
      const res = await verifyForgotPasswordOtpService({
        email: backupForm?.email || "",
        otp,
      });

      handleSuccessToast({ description: res.message });
      handleModalClose();
      handleResetPasswordModalOpen();
      //   eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
    } finally {
      setIsVerifyLoading(false);
    }
  };

  const handleResetPassword = async (values: IResetPasswordForm) => {
    try {
      setIsResetPasswordLoading(true);
      const res = await resetPasswordOtpService({
        email: backupForm?.email || "",
        password: values.password,
      });

      handleSuccessToast({ description: res.message });
      handleResetPasswordModalClose();
      router.navigate("/(public)/login");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
    } finally {
      setIsResetPasswordLoading(false);
    }
  };

  const validationSchema = forgotPasswordSchema();

  return {
    isLoading,
    handleSubmit,
    validationSchema,
    handleOtpChange,
    handleVerifyAccount,
    isVerifyLoading,
    otp,
    bottomSheetRef,
    handleModalClose,
    handleModalOpen,
    resetPasswordSheetRef,
    handleResetPassword,
    isResetPasswordLoading,
    handleResetPasswordModalClose,
  };
};

export default useForgotPassword;
