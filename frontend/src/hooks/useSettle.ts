import { useLayoutEffect, useState } from 'react';

const useSettle = () => {
  const [isSettled, setIsSettled] = useState(false);

  useLayoutEffect(() => {
    setIsSettled(true);
  }, []);

  return { isSettled };
};

export default useSettle;
