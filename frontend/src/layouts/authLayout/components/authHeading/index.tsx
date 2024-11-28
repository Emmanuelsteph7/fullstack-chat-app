import { MessageSquare } from "lucide-react";

interface Props {
  header: string;
  subHeader: string;
}

const AuthHeading = ({ header, subHeader }: Props) => {
  return (
    <>
      <div className="w-[50px] h-[50px] rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
        <MessageSquare className="text-primary" />
      </div>
      <h2 className="text-[26px] font-semibold text-center">{header}</h2>
      <p className="text-[18px] text-center mb-5">{subHeader}</p>
    </>
  );
};

export default AuthHeading;
