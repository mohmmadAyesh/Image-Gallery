const Lightbox = ({ImageURL, setShowPreview}: {ImageURL: string | null, setShowPreview: (show: boolean) => void}) => {
  return (
     <div className="lightbox"  onClick={()=>setShowPreview(false)}>
        
        <div className="lightbox-content">
            <img src={ImageURL} alt="Preview" className="lightbox-image" />
            </div>
        </div>
  )
}

export default Lightbox