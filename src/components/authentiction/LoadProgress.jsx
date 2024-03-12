import React, { useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import UploadImage from "../../hook/UploadImage";

function LoadProgress({ item, setitem }) {
  const { progress, isCompleted } = UploadImage(item);

  useEffect(() => {
    if (isCompleted) {
      setitem(null);
    }
  }, [isCompleted, setitem]);

  return (
    <>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </>
  );
}
export default LoadProgress;
