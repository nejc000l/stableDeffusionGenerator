import React, { useState, useRef } from "react";
import "../styles/galleryContainer.css";
function GalleryContainer() {
  const [imageContents, setImageContents] = useState("");
  const imageDisplayRef = useRef(null);

  function handleImageClick(event) {
    setImageContents(event.target.outerHTML);
    if (imageDisplayRef.current) {
      imageDisplayRef.current.innerHTML = event.target.outerHTML;
    }
  }

  return (
    <div className="galleryContainer_main">
      <div className="box_container">
        <div className="left_container">
          <div className="description_main_left">
            <div className="col">
              <div className="text">
                <h3>Generate images from text descriptions</h3>
                <div className="checkmark"></div>
              </div>

              <div className="text">
                <h3>Modify images based on text input</h3>
                <div className="checkmark"></div>
              </div>

              <div className="text">
                <h3>Enhance low-resolution or low-detail images</h3>
                <div className="checkmark"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="right_container">
          <div className="image-main-box">
            <div className="image-box">
              <img
                className="image"
                src="blob:http://127.0.0.1:5173/cd83cefd-3372-4392-879b-17503bcb25da"
                alt="A beautiful sunset"
                onClick={handleImageClick}
              />
            </div>
            <div className="image-box">
              <img
                className="image"
                src="blob:http://127.0.0.1:5173/36173009-db66-4693-8b30-e8fc3fcd2181"
                alt="A beautiful sunset"
                onClick={handleImageClick}
              />
            </div>
            <div className="image-box">
              <img
                className="image"
                src="blob:http://127.0.0.1:5173/4a9b80ee-9a79-4c72-8893-a679d8302fa1"
                alt="A beautiful sunset"
                onClick={handleImageClick}
              />
            </div>
            <div className="image-box">
              <img
                className="image"
                src="blob:http://127.0.0.1:5173/2ced0cc1-ed8e-4374-a2a9-5ef4edadb6fb"
                alt="A beautiful sunset"
                onClick={handleImageClick}
              />
            </div>
          </div>
          <div className="displayed-image">
            <div className="image-display" ref={imageDisplayRef}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GalleryContainer;
