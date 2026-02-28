import './App.css'
import { useState } from 'react'
import { ImageUpload } from './ImageUpload'
function App() {
  const [galleryItems,setGallaryItems] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const newImage = event.target?.result as string;
        setGallaryItems(prevItems => [...prevItems, newImage]);
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  return (
    <>
     <ImageUpload handleImageChange={handleImageChange} />
     
    </>
  )
}

export default App
