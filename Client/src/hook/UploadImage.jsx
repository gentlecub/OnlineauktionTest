import { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../config/firebase";
import apiRequest from "../components/apiRequest";

function UploadImage(data) {
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [file, setFile] = useState(null);
  const [progres, setProgres] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState(null);
  const [carCount, setCarCount] = useState([]);
  const [urlImg, setUrlImg] = useState("");

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch("http://localhost:3000/cars");
        if (!response.ok) throw Error("Did not receive expected data");
        const listCarItem = await response.json();
        setCarCount(listCarItem);
      } catch (err) {
        setFetchError(err.message);
      }
    };

    fetchCar();
  }, []);

  useEffect(() => {
    const uploadData = async () => {
      const db = app;
      console.log("data", data);
      const storage = getStorage();
      const metadata = {
        contentType: "",
      };
      const fileType = data.itemImage.name.split(".").pop();
      let contentType;
      if (fileType === "jpg" || fileType === "jpeg" || fileType === "png") {
        metadata.contentType = "image/jpeg";
      } else {
        // Si el tipo de archivo no está soportado, puedes manejarlo de acuerdo a tus necesidades
        throw new Error("Tipo de archivo no soportado");
      }
      const storageRef = ref(storage, "images/" + data.itemImage.name);
      const uploadTask = uploadBytesResumable(
        storageRef,
        data.itemImage,
        metadata
      );

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUrlImg(downloadURL);
            setIsCompleted(true);
            console.log("File available at", downloadURL);
          });
        }
      );
    };
    uploadData();
  }, [data]);

  useEffect(() => {
    if (urlImg) {
      const uploadItem = async () => {
        const id = carCount.length
          ? parseInt(carCount[carCount.length - 1].id) + 1
          : 1;
        const idString = id.toString();
        const newItem = {
          id: idString,
          email: data.email,
          title: data.title,
          UrlImag: urlImg,
        };
        const itemOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newItem),
        };

        const result = await apiRequest("/api/cars", itemOptions);
        return result;
      };

      uploadItem();
    }
  }, [urlImg]);

  return { progress, isCompleted };
}

export default UploadImage;
