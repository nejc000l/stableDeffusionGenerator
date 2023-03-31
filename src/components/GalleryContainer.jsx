import React from "react";
import "../styles/galleryContainer.css";
function GalleryContainer() {
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
        <div className="right_container">Right</div>
      </div>
    </div>
  );
}

export default GalleryContainer;
