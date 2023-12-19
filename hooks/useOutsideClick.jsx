import { useEffect } from "react";

function useOutSideClick(ref1, ref2, callback) {
  useEffect(() => {
    const handleClick = (event) => {
      // ref1 => 눌렀을때 뜨는 모달창
      // ref2 => 누르는 부분
      // event.target => 누른 부분. nav가 될수도, 배너이미지가 될수도.
      // console.log(ref1.current.contains(event.target));
      // console.log(ref2.current.contains(event.target));

      // console.log(ref1.current);
      // console.log(ref2.current);
      // console.log(event.target);
      if (
        ref1.current &&
        ref2.current &&
        !ref1.current.contains(event.target) &&
        !ref2.current.contains(event.target)
      )
        callback?.();
    };

    window.addEventListener("mousedown", handleClick);

    return () => window.removeEventListener("mousedown", handleClick);
  }, [ref1, ref2, callback]);
}

export default useOutSideClick;
