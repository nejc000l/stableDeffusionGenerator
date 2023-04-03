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
                src="https://www.nj.com/resizer/dY2Wf8hZKncZsdiiOA7NdJhKI9E=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/FM3QYFTNP5AUFAEVCPLVB73MSY.jpg"
                alt="A beautiful sunset"
                onClick={handleImageClick}
              />
            </div>
            <div className="image-box">
              <img
                className="image"
                src="https://news.artnet.com/app/news-upload/2022/12/prisma-labs-lensa-ai.jpg"
                alt="A beautiful sunset"
                onClick={handleImageClick}
              />
            </div>
            <div className="image-box">
              <img
                className="image"
                src="https://lh3.googleusercontent.com/hwau7OVWx96XaME5KpRuJ0I_MscrerK6SbRH1UwYHYaxIDQQtn7RZK02LDSfBzCreidFgDsJeXyqDct6EZiH6vsV=w640-h400-e365-rj-sc0x00ffffff"
                alt="A beautiful sunset"
                onClick={handleImageClick}
              />
            </div>
            <div className="image-box">
              <img
                className="image"
                src="https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
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
