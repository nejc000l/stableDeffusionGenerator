import React, { useEffect, useState } from "react";
import "../src/styles/globals.css";
import GalleryContainer from "./components/GalleryContainer";
import Navbar from "./components/Navbar";
import PromptPicker from "./components/PropmptPicker";
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

function App() {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState("");
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
 
   
  return (
 <>
 <Navbar />
    <main>

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
            <div className="image_container">
              {!loading && output && (
                <div className="result-image">
                  <img src={output} alt="" />
                </div>
              )}
            </div>
            {/* right side */}
            <div className="generator">
              <div className="description">
                <h4 className="description-md">
                  An open-source machine learning model that can generate images
                  from text, modify images based on text, or fill in details on
                  low-resolution or low-detail images. It has been trained on
                  billions of images and can produce results that are comparable
                  to the ones you’d get from DALL-E 2 and MidJourney.
                </h4>
                <h5 className="description-sm">
                  <span className="tag">Unstable Diffusion</span>is also used to
                  generate NSFW AI-generated content.
                </h5>
              </div>
              <span>
                Give it a simple prompt this are just some of the example:
              </span>
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
              <div>{loading && <div className="loading">Loading...</div>}</div>
            </div>
          </section>
        </div>
      </div>
      <div className="gallery">
        <GalleryContainer />
      </div>
    </main>
    </>
  );
}

export default App;
