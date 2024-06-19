import React from "react";

function useKeyDown(key, callback) {
  React.useEffect(() => {
    function handleKeydown(event) {
      if (event.code === key) {
        callback(event);
      }
    }
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [callback]);
}

export default useKeyDown;
