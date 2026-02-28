import './App.css'
import { useState } from 'react';
import { ImageUpload } from './ImageUpload';
import api from './api/axiosConfig';
const MAX_FILE_SIZE  = 1000 * 1000 * 3;
function App() {
  const [galleryItems,setGallaryItems] = useState<string[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [uploadedImageName, setUploadedImageName] = useState<string | null>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log("file object",file);
      if (file.size > MAX_FILE_SIZE) {
        setErrorMessage("File size exceeds 5MB limit");
        return;
      }
      setUploadedImageName(file.name);
      const reader = new FileReader()
      reader.onload = (event) => {
        const newImage = event.target?.result as string;
        setUploadedImage(newImage);
        setGallaryItems(prevItems => [...prevItems, newImage]);
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }
  const handleSave = async () => {
    const date = new Date();
    try{
      api.post('/upload',
      {
        filename: uploadedImageName,
        file: uploadedImage,
        upload_date: date.toISOString()
      }
    );
  }catch(error){
    console.error("Error uploading image:", error);
  }}

  return (
    <>
     <ImageUpload handleImageChange={handleImageChange} errorMessage={errorMessage} uploadedImage={uploadedImage} handleSave={handleSave} />
     
    </>
  )
}

export default App
