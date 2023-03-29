import React, { useState } from 'react';
import '../src/styles/globals.css'
import PromptPicker from './components/PropmptPicker';

const API_TOKEN = "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"

function App() {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const prompts = ['a cat with red fur', 'a dog with a hat', 'a bird with a scarf'];
 const handlePromptClick = prompt => {
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

    if (!response.ok) {
      throw new Error("Failed to generate image");
    }

    const blob = await response.blob();
    setOutput(URL.createObjectURL(blob));
    setLoading(false);
  };
  console.log(output)

  return (<div className="container al-c mt-3">
    <h1>Stable <span>Diffusion</span></h1>
    <p>This is an Image Generator api using Stable Defussion </p>
    <span>Give it a simple prompt like for example:</span>
    <PromptPicker  onPromptClick={handlePromptClick} prompts={prompts} />;

    <form className="gen-form" onSubmit={handleSubmit}>
      <input value={selectedPrompt} onChange={e => selectedPrompt(e.target.value)} className=' prompt' type="text" name="input" placeholder="type your prompt here..." />
      <button className='button' type="submit">Generate</button>
    </form>
    <div>
    {loading && <div className="loading">Loading...</div>}
    {!loading && output && (
      <div className="result-image">
        <img src={output} alt="art"  />
      </div>
    )}
    </div>

    </div>);
}

export default App;
