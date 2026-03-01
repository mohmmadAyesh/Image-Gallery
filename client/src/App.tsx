import "./App.css";
import { useState } from "react";
import { ImageUpload } from "./ImageUpload";
import { api } from "./api/ApiConfig";
import { Link } from "react-router";
import toast from "react-hot-toast";
const MAX_FILE_SIZE = 1000 * 1000 * 5; // 5MB in bytes
function App() {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log("file object", file);
      console.log(file.size);
      if (file.size > MAX_FILE_SIZE) {
        setErrorMessage("File size exceeds 5MB limit");
        return;
      }
      console.log("file tyoe is ", file.type);
      const fileReader = new FileReader();
      let type = "unknown";
      fileReader.onloadend = function (e) {
        const arrayBuffer = new Uint8Array(e.target?.result as ArrayBuffer);
        let header = "";
        for (let i = 0; i < arrayBuffer.length; i++) {
          header += arrayBuffer[i].toString(16);
        }
        console.log("file header is ", header);
        console.log("signature is ", header.slice(0, 8));
        switch (header.slice(0, 8)) {
          case "89504e47":
            console.log("i triggered the png case");
            type = "image/png";
            break;
          case "47494638":
            type = "image/gif";
            break;
          case "ffd8ffe0":
          case "ffd8ffe1":
          case "ffd8ffe2":
            console.log("what the hell am i triggered");
            type = "image/jpeg";
            break;
          default:
            type = "unknown";
        }
        console.log("type from switch statement is ", type);
        if (type === "unknown") {
          console.log("wtf why my toast don't appear ");
          toast.error("Please upload a valid image file (PNG, JPEG, or GIF).");
        } else {
          setUploadedImage(file);
        }
      };
      fileReader.readAsArrayBuffer(e.target.files[0]);
    }
  };
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", uploadedImage as Blob);
    try {
      await api.post("/upload", formData, {
        timeout: 30000,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccessMessage("Image uploaded successfully!");
      setErrorMessage(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("uploading encounter an error", error);
      if (error.response && error.response.status !== 500) {
        setErrorMessage(error.response.data.error);
      } else if (error.message && error.message === "Network Error") {
        setErrorMessage(
          "Unable to reach the server. Please check your connection and try again.",
        );
      } else if (error.message && error.message.includes("timeout")) {
        setErrorMessage(
          "The request timed out. Please try again later. or check your network connection.",
        );
      } else {
        setErrorMessage(
          "Something went wrong while uploading the image. Please try again.",
        );
      }
      console.error("Error uploading image:", error);
    }
  };

  return (
    <>
      <ImageUpload
        handleImageChange={handleImageChange}
        errorMessage={errorMessage}
        successMessage={successMessage}
        uploadedImage={uploadedImage}
        handleSave={handleSave}
      />
      <Link className="link" to="/gallary">
        Go to Gallary
      </Link>
    </>
  );
}

export default App;
