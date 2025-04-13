import { JSX, Suspense } from "react";
import Loader from "../loader";

interface Props {
  children?: JSX.Element;
  path: string;
}

const SuspenseFallback = ({ children, path }: Props) => {
  return (
    /**
     * Key makes the fallback loader show up on new page load
     */
    <Suspense fallback={<Loader />} key={path}>
      {children}
    </Suspense>
  );
};

export default SuspenseFallback;
