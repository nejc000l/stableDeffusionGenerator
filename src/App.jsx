import React, { useEffect, useState } from "react";
import "../src/styles/globals.css";
import GalleryContainer from "./components/GalleryContainer";
import Navbar from "./components/Navbar";
import PromptPicker from "./components/PropmptPicker";
import { CiSaveDown2 } from "react-icons/ci";
import Footer from "./components/Footer";
import Logo from "../public/1x/Artboard-19.png";

const API_TOKEN = import.meta.env.VITE_API_TOKEN;

function App() {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [savedImages, setSavedImages] = useState([]);
  const prompts = [
    "Fluffy cat in sun",
    "Dog chasing ball",
    "Cat napping on couch",
    "Curious dog explores outside",
    "Cat purring while petted",
    "A cat with red fur",
    "A dog",
    "A tree whit a cat",
    "Red tree red dawn cat",
    "A bird with a scarf",
    "A lion",
  ];
  const handlePromptClick = (prompt) => {
    setSelectedPrompt(prompt);
  };

  const handleSubmit = async (event, input) => {
    if (event) {
      event.preventDefault();
      input = event.target.elements.input.value;
    }

    setLoading(true);

    const response = await fetch(
      "https://api-inference.huggingface.co/models/prompthero/openjourney",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({ inputs: input }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate image");
    }

    const blob = await response.blob();
    setOutput(URL.createObjectURL(blob));
    setLoading(false);
  };
  useEffect(() => {
    handleSubmit(null, "");
  }, []);
  useEffect(() => {
    // Save the savedImages to local storage whenever it changes
    localStorage.setItem("savedImages", JSON.stringify(savedImages));
  }, [savedImages]);
  useEffect(() => {
    // Load the savedImages from local storage when the component mounts
    const savedImagesJSON = localStorage.getItem("savedImages");
    if (savedImagesJSON) {
      setSavedImages(JSON.parse(savedImagesJSON));
    }
  }, []);
  const handleSaveImage = (imageToCopySrc) => {
    setSavedImages((prevSavedImages) => {
      // Check if the imageToCopySrc already exists in the savedImages array
      if (prevSavedImages.includes(imageToCopySrc)) {
        // If it already exists, return the previous state without adding the image again
        return prevSavedImages;
      } else {
        // If it doesn't exist, add the image to the savedImages array
        return [...prevSavedImages, imageToCopySrc];
      }
    });
  };

  return (
    <>
      <Navbar />
      <main
  
      >
        <div className="container">
          <div className="header">
            <div className="title">
              <h1>
                Unstable <span>Diffusion</span>
              </h1>
              <p>
                This is an Image Generator api using early{" "}
                <span>Stable Defussion 1.5</span>{" "}
              </p>
            </div>

            <section className="container_main">
              {/* left side */}

              {/* right side */}
              <div className="description">
                <h4 className="description-md">
                  An open-source machine learning model that can generate images
                  from text, modify images based on text, or fill in details on
                  low-resolution or low-detail images. It has been trained on
                  billions of images and can produce results that are comparable
                  to the ones you’d get from DALL-E 2 and MidJourney.
                </h4>
                {/*  <h5 className="description-sm">
                  <span className="tag">Unstable Diffusion</span>is also used to
                  generate NSFW AI-generated content.
                </h5> */}
              </div>
              <div className="image_container">
                {!loading && output && (
                  <div className="result-image">
                    <div
                      className="image-wrapper"
                      style={{ position: "relative" }}
                    >
                      <img src={output} alt="" />
                      <div
                        className="save-icon"
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          boxShadow:
                            "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                        }}
                      >
                        <CiSaveDown2
                          style={{padding:'5px'}}
                          onClick={() => handleSaveImage(output)}
                          className="save-icon"
                          size={4}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="generator">
                <span>
                  Give it a simple prompt this are just some of the example: <br />
                </span>
                <span className="small-span">You can also save the image to gallery below. <br /> Just hover over it and click the save icon.</span>

                <PromptPicker
                  handlePromptClick={handlePromptClick}
                  prompts={prompts}
                />
                <form className="gen-form" onSubmit={handleSubmit}>
                  <input
                    value={selectedPrompt.toLocaleLowerCase()}
                    onChange={(e) => setSelectedPrompt(e.target.value)}
                    className=" prompt"
                    type="text"
                    name="input"
                    placeholder="type your prompt here..."
                  />
                  <button className="button" type="submit">
                    Generate
                  </button>
                </form>
                <div>
                  {loading && <div className="loading">Loading...</div>}
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className="gallery">
          <GalleryContainer savedImages={savedImages} />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
