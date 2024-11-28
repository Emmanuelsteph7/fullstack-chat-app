import { ReactNode } from "react";
import AuthHeading from "../authHeading";
import AuthSquareBoxes from "../authSquareSection";
import Navbar from "../../../../components/navbar";

interface Props {
  header: string;
  subHeader: string;
  title: string;
  paragraph: string;
  children?: ReactNode;
}

const AuthLayoutContent = ({
  header,
  paragraph,
  subHeader,
  title,
  children,
}: Props) => {
  return (
    <>
      <Navbar />
      <div className="h-screen flex">
        <div className="flex-1 h-full flex items-center">
          <div className="w-full mx-auto max-w-[400px]">
            <AuthHeading header={header} subHeader={subHeader} />
            {children}
          </div>
        </div>
        <AuthSquareBoxes title={title} paragraph={paragraph} />
      </div>
    </>
  );
};

export default AuthLayoutContent;
