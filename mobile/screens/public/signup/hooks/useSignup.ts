import { useToastStore } from "@/store/useToastStore";
import { useRef, useState } from "react";
import { ISignupForm } from "../components/signupForm";
import { signUpService, verifyOtpService } from "@/services/auth-service";
import { signupSchema } from "../utils/signupSchema";
import { useAuthStore } from "@/store/useAuthStore";
import BottomSheet from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { resolveAxiosError } from "@/utils/resolveAxiosError";
import { useRouter } from "expo-router";

export interface IUseSignupResponse {
  isLoading: boolean;
  handleSubmit: (values: ISignupForm) => Promise<void>;
  validationSchema: any;
  isVerifyLoading: boolean;
  handleVerifyAccount: () => Promise<void>;
  handleOtpChange: (text: string) => void;
  otp: string;
  bottomSheetRef: React.RefObject<BottomSheetMethods | null>;
  handleModalOpen: () => void;
  handleModalClose: () => void;
}

const useSignup = (): IUseSignupResponse => {
  const [backupForm, setBackupForm] = useState<ISignupForm>();
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifyLoading, setIsVerifyLoading] = useState(false);
  const [otp, setOtp] = useState("");

  const bottomSheetRef = useRef<BottomSheet>(null);

  const router = useRouter();
  const { handleSuccessToast, handleErrorToast } = useToastStore();
  const { handleLoginSuccess } = useAuthStore();

  const handleModalOpen = () => {
    bottomSheetRef.current?.expand();
  };

  const handleModalClose = () => {
    bottomSheetRef.current?.close();
  };

  const handleSubmit = async (values: ISignupForm) => {
    try {
      setIsLoading(true);
      setBackupForm(values);

      const res = await signUpService(values);
      handleSuccessToast({ description: res.message });

      handleModalOpen();
    } catch (error) {
      const userExistsMessage = "User already exists";
      const errMessage = resolveAxiosError(error).message;
      handleErrorToast({ description: errMessage });

      if (errMessage === userExistsMessage) {
        setIsLoading(false);
        setTimeout(() => {
          router.push(`/(public)/login?email=${values.email}`);
        }, 1000);
      }
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
      const res = await verifyOtpService({
        email: backupForm?.email || "",
        otp,
      });

      handleLoginSuccess(res.data);
      handleSuccessToast({ description: res.message });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
    } finally {
      setIsVerifyLoading(false);
    }
  };

  const validationSchema = signupSchema();

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
  };
};

export default useSignup;
