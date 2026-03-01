import './App.css'
import { useState } from 'react';
import { ImageUpload } from './ImageUpload';
import {api} from './api/ApiConfig';
import { Link } from 'react-router';
const MAX_FILE_SIZE  = 1000 * 1000 * 3;
function App() {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
 
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log("file object",file);
      if (file.size > MAX_FILE_SIZE) {
        setErrorMessage("File size exceeds 5MB limit");
        return;
      }
      setUploadedImage(e.target.files[0]);
    }
  }
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', uploadedImage as Blob);
    try{
      await api.post('/upload', formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    setSuccessMessage("Image uploaded successfully!");
  }catch(error){
    console.error("Error uploading image:", error);
  }}

  return (
      <>
      <ImageUpload handleImageChange={handleImageChange} 
     errorMessage={errorMessage} 
     successMessage={successMessage}
     uploadedImage={uploadedImage} handleSave={handleSave} />
     <Link className="link" to="/gallary">Go to Gallary</Link>
     </>
  )
}

export default App