import React, { useState } from "react";
import "../src/styles/globals.css";
import Navbar from "./components/Navbar";
import PromptPicker from "./components/PropmptPicker";

const API_TOKEN = import.meta.env.VITE_API_TOKEN;

function App() {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("https://images.squarespace-cdn.com/content/v1/6213c340453c3f502425776e/0715034d-4044-4c55-9131-e4bfd6dd20ca/2_4x.png");
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const prompts = [
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const input = event.target.elements.input.value;
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
    console.log(response);

    if (!response.ok) {
      throw new Error("Failed to generate image");
    }

    const blob = await response.blob();
    setOutput(URL.createObjectURL(blob));
    setLoading(false);
  };
  console.log(selectedPrompt);

  return (
    <main>
      <div className="container al-c mt-3">
        <Navbar />
        <div className="header">

        <div className="title">
          <h1>
            Unstable <span>Diffusion</span>
          </h1>
          <p>
            This is an Image Generator api using early <span >Stable Defussion 1.5</span>{" "}
          </p>
        </div>
        <section className="container_main">
          
        
        {/* left side */}
        <div>
        {!loading && output && (
              <div className="result-image">
                <img src={output} alt="art" />
              </div>
            )}        </div>
        {/* right side */}
        <div className="generator">
          <div className="description">
       
          <h4 className="description-md">
          An open-source machine learning model that can generate images from text, modify images based on text, or fill in details on low-resolution or low-detail images 1. It has been trained on billions of images and can produce results that are comparable to the ones you’d get from DALL-E 2 and MidJourney.

          </h4>
          <h5 className="description-sm">
          <span className="tag">Unstable Diffusion </span>is also used to generate NSFW AI-generated content.

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
          <div>
            {loading && <div className="loading">Loading...</div>}
          
          </div>
        </div>
        </section>
        </div>

      </div>
    </main>
  );
}

export default App;
