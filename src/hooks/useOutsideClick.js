import { useEffect, useRef } from "react";

const useOutsideClick = (handler, listenCapturing = true) => {
  const ref = useRef();
  useEffect(
    function () {
      const handleClick = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      };
      document.addEventListener("click", handleClick, true);
      return () => document.removeEventListener("click", handleClick, true);
    },
    [handler, listenCapturing]
  );
  return ref;
};

export default useOutsideClick;
