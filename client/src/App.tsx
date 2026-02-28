import './App.css'
import { useState } from 'react';
import { ImageUpload } from './ImageUpload';
const MAX_FILE_SIZE  = 1000 * 1000 * 3;
function App() {
  const [galleryItems,setGallaryItems] = useState<string[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > MAX_FILE_SIZE) {
        setErrorMessage("File size exceeds 5MB limit");
        return;
      }
      const reader = new FileReader()
      reader.onload = (event) => {
        const newImage = event.target?.result as string;
        setUploadedImage(newImage);
        setGallaryItems(prevItems => [...prevItems, newImage]);
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  return (
    <>
     <ImageUpload handleImageChange={handleImageChange} errorMessage={errorMessage} uploadedImage={uploadedImage} />
     
    </>
  )
}

export default App
