import React from 'react'
import { useState } from 'react';
interface ImageUploadProps {
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errorMessage: string | null;
    uploadedImage?: string | null;
    handleSave: () => void;
}
export const ImageUpload = ({handleImageChange, errorMessage,uploadedImage, handleSave}: ImageUploadProps) => {
    const [showPreview, setShowPreview] = useState(false);
    return (
    <form onSubmit={handleSave}>
    <div className="image-uploader">
        <div className="image-description">
            <div className='image-container'>
            { uploadedImage ? (
                <img src={uploadedImage} alt="Uploaded" className="uploaded-image" />
            )
            :(
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
            <rect width="100" height="100" rx="5" fill="#E2E6EC"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M28.6667 37C28.6667 34.6068 30.6068 32.6667 33.0001 32.6667H67.0001C69.3933 32.6667 71.3334 34.6068 71.3334 37V63.6667C71.3334 66.0599 69.3933 68 67.0001 68H33.0001C30.6068 68 28.6667 66.0599 28.6667 63.6667V37ZM33.0001 34.6667C31.7114 34.6667 30.6667 35.7113 30.6667 37V63.6667C30.6667 64.9553 31.7114 66 33.0001 66H67.0001C68.2887 66 69.3334 64.9553 69.3334 63.6667V37C69.3334 35.7113 68.2887 34.6667 67.0001 34.6667H33.0001Z" fill="#B2B9C4"/>
            <ellipse cx="38.6668" cy="42" rx="4.33333" ry="4.33333" fill="#B2B9C4"/>
            <path d="M34.3335 60.3333V58.357C34.3335 57.915 34.5091 57.4911 34.8217 57.1785L40.2098 51.7904C40.8389 51.1613 41.8511 51.1372 42.5094 51.7357L43.8407 52.946C44.4923 53.5383 45.4923 53.5216 46.1236 52.9077L55.8219 43.4789C56.4753 42.8436 57.5178 42.851 58.1622 43.4954L65.8453 51.1785C66.1579 51.4911 66.3335 51.915 66.3335 52.357V60.3333C66.3335 61.2538 65.5873 62 64.6668 62H36.0002C35.0797 62 34.3335 61.2538 34.3335 60.3333Z" fill="#B2B9C4"/>
            </svg>
            )
            }
            { uploadedImage && <button className="preview-button" onClick={()=>setShowPreview(true)}>Preview</button>}
            </div>
            

            <div className="info">
                <h3>Please upload square image, size less than 100KB</h3>
            <input type="file" name="image" accept="image/png, image/jpeg" onChange={handleImageChange}/>
            </div>
        </div>
        <div className="button-container">
            <button type="submit">Save</button>
        </div>
        <p className="error-message">{errorMessage}</p>
        {showPreview && uploadedImage && ( 
            <div className="lightbox"  onClick={()=>setShowPreview(false)}>
        
            <div className="lightbox-content">
                <img src={uploadedImage} alt="Preview" className="lightbox-image" />
            </div>
        </div>
        )}
    </div>
    </form>
     
  )
}
