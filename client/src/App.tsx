import './App.css'
import { useEffect, useState } from 'react';
import { ImageUpload } from './ImageUpload';
import {api} from './api/ApiConfig';
import { loadGalleryImages } from './api/accessImage';
const MAX_FILE_SIZE  = 1000 * 1000 * 3;
function App() {
  const [galleryItems,setGallaryItems] = useState<string[]>([]);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [uploadedImageName, setUploadedImageName] = useState<string | null>(null);
  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const images = await loadGalleryImages();
        console.log("Fetched gallery images:", images);
        setGallaryItems(images);
      } catch (error) {
        console.error('Error fetching gallery images:', error);
      }
  }
  fetchGalleryImages();
  return () => clearInterval(fetchGalleryImages);
},[])
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log("file object",file);
      if (file.size > MAX_FILE_SIZE) {
        setErrorMessage("File size exceeds 5MB limit");
        return;
      }
      setUploadedImage(e.target.files[0]);
      setUploadedImageName(file.name);
      console.log("printing file name to test if i send as a file",uploadedImage?.name)
      const reader = new FileReader()
      reader.onload = (event) => {
        const newImage = event.target?.result as string;
        setGallaryItems(prevItems => [...prevItems, newImage]);
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', uploadedImage as Blob);
    try{
      api.post('/upload', formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
  }catch(error){
    console.error("Error uploading image:", error);
  }}

  return (
    <>
     <ImageUpload handleImageChange={handleImageChange} errorMessage={errorMessage} uploadedImage={uploadedImage} handleSave={handleSave} />
     {galleryItems.length > 0 && (
        <div className="gallery">
          {galleryItems.map((image, index) => (
            <img key={index} src={image.presigned_url} alt={`Gallery item ${index}`} className="gallery-image" />
          ))}
        </div>
      )}
    </>
  )
}

export default App
