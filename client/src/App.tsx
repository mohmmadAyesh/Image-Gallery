import "./App.css";
import { useState } from "react";
import { ImageUpload } from "./ImageUpload";
import { api } from "./api/ApiConfig";
import { Link } from "react-router";
import axios from "axios";
const MAX_FILE_SIZE = 1000 * 1000 * 5;
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
      if (file.size > MAX_FILE_SIZE) {
        setErrorMessage("File size exceeds 5MB limit");
        return;
      }
      setUploadedImage(e.target.files[0]);
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
