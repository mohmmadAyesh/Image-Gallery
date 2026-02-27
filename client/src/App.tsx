import './App.css'
import { useState } from 'react'
import { Lightbox } from './Lightbox'
import { ImageUpload } from './ImageUpload'
function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string)
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  return (
    <>
     <ImageUpload handleImageChange={handleImageChange} />
      {selectedImage && <Lightbox selectedImage={selectedImage} />}
    </>
  )
}

export default App
