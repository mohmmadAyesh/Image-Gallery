// context for gallary items state
import { createContext, useState } from "react";
// eslint-disable-next-line
export const GalleryContext = createContext({});
export const GallaryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [galleryItems, setGalleryItems] = useState<
    { file_name: string; presigned_url: string }[]
  >([]);
  return (
    <GalleryContext.Provider value={{ galleryItems, setGalleryItems }}>
      {children}
    </GalleryContext.Provider>
  );
};
