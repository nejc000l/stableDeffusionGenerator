import React, { useState, useRef } from "react";
import "../styles/galleryContainer.css";
function GalleryContainer({ savedImages }) {
  const [imageContents, setImageContents] = useState("");
  const imageDisplayRef = useRef(null);

  function handleImageClick(event) {
    setImageContents(event.target.outerHTML);
    if (imageDisplayRef.current) {
      imageDisplayRef.current.innerHTML = event.target.outerHTML;
    }
  }
  var element = document.querySelector(".image-main-box");
  element.addEventListener("wheel", function (event) {
    event.preventDefault();
    element.scrollLeft = element.scrollLeft + event.deltaY;

  });
  
  return (
    <div className="galleryContainer_main">
      <div className="box_container">
        <div
          className={`left_container ${
            savedImages.length === 0 ? "full-width" : ""
          }`}
        >
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
        {savedImages.length > 0 && (
          <div className="right_container">
            <div className="image-main-box">
              <div className="image-box">
                {savedImages.map((savedImage) => (
                  <img
                    key={savedImage}
                    src={savedImage}
                    onClick={handleImageClick}
                  />
                ))}
              </div>
            </div>
            <div className="displayed-image">
              <div className="image-display" ref={imageDisplayRef}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GalleryContainer;
