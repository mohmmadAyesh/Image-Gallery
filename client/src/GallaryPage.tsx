import {useEffect, useContext, useState} from 'react';
import { loadGalleryImages } from './api/accessImage';
import { GalleryContext } from './Context';
import Lightbox from './Lightbox';
const GallaryPage = () => {
    const {galleryItems,setGalleryItems} = useContext(GalleryContext);
    const [showPreview, setShowPreview] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
   useEffect(() => {
      const fetch =  setTimeout(()=>{
        const fetchGalleryImages = async () => {
        try {
          const images = await loadGalleryImages();
          console.log("Fetched gallery images:", images);
          setGalleryItems(images);
        } catch (error) {
          console.error('Error fetching gallery images:', error);
        }
    }
    fetchGalleryImages();
  });
    return () => clearTimeout(fetch);
  },[])
    return (
    <>
     {galleryItems && galleryItems.length > 0 && (
        <div className="gallary-grid">
          {galleryItems.map((image, index) => (
            <div className="image-container">
            <img key={index} src={image.presigned_url} alt={`Gallery item ${index}`} className="gallery-image" onClick={() => {
              setPreviewImage(image.presigned_url);
              setShowPreview(true);
            }} />
            </div>
          ))}
          </div>
      )}
     {showPreview && previewImage && <Lightbox ImageURL={previewImage} setShowPreview={setShowPreview} />}
    </>
  )
}

export default GallaryPage