import React from 'react'

export const ImageUpload = ({handleImageChange}: {handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void}) => {
  return (
     <input type="file" accept="image/png, image/jpeg" onChange={handleImageChange}/>
  )
}
