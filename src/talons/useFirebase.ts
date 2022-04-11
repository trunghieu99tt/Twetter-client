import { useState } from "react";
import firebase from "../firebase";
import { v4 as uuidv4 } from "uuid";

const useFirebase = () => {
  const [fileUrl, setFileUrl] = useState<any>(null);

  // eslint-disable-next-line @typescript-eslint/ban-types
  const getFileBlob = function (url: string, cb: Function) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.addEventListener("load", function () {
      cb(xhr.response);
    });
    xhr.send();
  };

  const uploadToStorage = (imageURL: any) => {
    getFileBlob(imageURL, (blob: Blob) => {
      firebase
        .storage()
        .ref(`audio/${uuidv4()}`)
        .put(blob)
        .then(async (snapshot) => {
          const url = await snapshot.ref.getDownloadURL();
          setFileUrl(url);
        })
        .catch((error) => {
          console.log("error: ", error);
        });
    });
  };

  return {
    fileUrl,
    setFileUrl,
    uploadToStorage,
  };
};

export { useFirebase };
