import { useEffect, useContext, useState } from "react";
import { loadGalleryImages } from "./api/accessImage";
import { GalleryContext } from "./Context";
import Lightbox from "./Lightbox";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
const GallaryPage = () => {
  const { galleryItems, setGalleryItems } = useContext(GalleryContext) as {
    galleryItems: { file_name: string; presigned_url: string }[];
    setGalleryItems: React.Dispatch<
      React.SetStateAction<{ file_name: string; presigned_url: string }[]>
    >;
  };
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const handleDelete = async (file_name: string) => {
    try {
      setOpenDeleteModal(false);
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };
  useEffect(() => {
    const fetch = setTimeout(() => {
      const fetchGalleryImages = async () => {
        try {
          const images = await loadGalleryImages();
          console.log("Fetched gallery images:", images);
          setGalleryItems(images);
        } catch (error) {
          console.error("Error fetching gallery images:", error);
        }
      };
      fetchGalleryImages();
    });
    return () => clearTimeout(fetch);
  }, []);
  return (
    <>
      {galleryItems && galleryItems.length > 0 && (
        <div className="gallary-grid">
          {galleryItems.map((image, index) => (
            <div className="image-container">
              <img
                key={index}
                src={image.presigned_url}
                alt={`Gallery item ${index}`}
                className="gallery-image"
                onClick={() => {
                  setPreviewImage(image.presigned_url);
                  setShowPreview(true);
                }}
              />
              <button
                className="delete-button"
                onClick={() => setOpenDeleteModal(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-trash"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
      {showPreview && previewImage && (
        <Lightbox ImageURL={previewImage} setShowPreview={setShowPreview} />
      )}
      {openDeleteModal && (
        <DeleteConfirmationModal
          onClose={() => setOpenDeleteModal(false)}
          onDelete={() => {}}
        />
      )}
    </>
  );
};

export default GallaryPage;
