import {useEffect, useContext} from 'react';
import { loadGalleryImages } from './api/accessImage';
import { GalleryContext } from './Context';
const GallaryPage = () => {
    const {galleryItems,setGalleryItems} = useContext(GalleryContext);
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
        <div className="gallery">
          {galleryItems.map((image, index) => (
            <img key={index} src={image.presigned_url} alt={`Gallery item ${index}`} className="gallery-image" />
          ))}
        </div>
      )}
    </>
  )
}

export default GallaryPage