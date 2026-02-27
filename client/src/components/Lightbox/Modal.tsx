import React from 'react'

const Modal = () => {
  return (
    <div id="myModal" className="modal">
  <span className="close cursor" onClick={() => closeModal()}>&times;</span>
  <div className="modal-content">

    <div className="mySlides">
      <div className="numbertext">1 / 4</div>
      <img src="img1_wide.jpg" style={{width: "100%"}}>
    </div>

    <div className="mySlides">
      <div className="numbertext">2 / 4</div>
      <img src="img2_wide.jpg" style={{width: "100%"}}>
    </div>

    <div className="mySlides">
      <div className="numbertext">3 / 4</div>
      <img src="img3_wide.jpg" style={{width: "100%"}}>
    </div>

    <div className="mySlides">
      <div className="numbertext">4 / 4</div>
      <img src="img4_wide.jpg" style={{width: "100%"}}>
    </div>
    <a className="prev" onClick={() => plusSlides(-1)}>&#10094;</a>
    <a className="next" onClick={() => plusSlides(1)}>&#10095;</a>
    <div className="caption-container">
      <p id="caption"></p>
    </div>
    <div className="column">
      <img className="demo" src="img1.jpg" onClick={() => currentSlide(1)} alt="Nature">
    </div>

    <div className="column">
      <img className="demo" src="img2.jpg" onClick={() => currentSlide(2)} alt="Snow">
    </div>

    <div className="column">
      <img className="demo" src="img3.jpg" onClick={() => currentSlide(3)} alt="Mountains">
    </div>

    <div className="column">
      <img className="demo" src="img4.jpg" onClick={() => currentSlide(4)} alt="Lights">
    </div>
  </div>
</div>
  )
}

export default Modal