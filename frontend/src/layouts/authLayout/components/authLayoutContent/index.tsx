import { ReactNode } from "react";
import AuthHeading from "../authHeading";

interface Props {
  header: string;
  subHeader: string;
  children?: ReactNode;
}

const AuthLayoutContent = ({ header, subHeader, children }: Props) => {
  return (
    <>
      <AuthHeading header={header} subHeader={subHeader} />
      {children}
    </>
  );
};

export default AuthLayoutContent;
