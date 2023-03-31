import React, { useState, useRef } from "react";
import "../styles/promptPicker.css";
import { AiOutlineReload } from "react-icons/ai";
const PromptPicker = ({ prompts, handlePromptClick }) => {
  const promptRefs = useRef(prompts.map(() => React.createRef()));
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [promptsToDisplay, setPromptsToDisplay] = useState(prompts);

  // Make a copy of the prompts array
  let promptsCopy = [...prompts];

  const handleClick = (index) => {
    let prompt = promptsToDisplay[index];
    handlePromptClick(prompt);
    setSelectedPrompt(prompt);


    promptRefs.current.forEach(
      (ref) => (ref.current.style.backgroundColor = "")
    );

    const selectedPromptRef = promptRefs.current[index].current;
    selectedPromptRef.style.backgroundColor = "#0e0f7c";
    selectedPromptRef.style.color = "gray";
    selectedPromptRef.addEventListener("click", () => {
      selectedPromptRef.style.backgroundColor = "";
      selectedPromptRef.disabled = true;
    });
    promptsCopy.splice(index, 1);

    if (promptsCopy.length === 0) {
      console.log("No more elements in prompts array, reloading page");
    }
  };
  const reloadButton = () => {
    location.reload();
  };
  const links = document.querySelectorAll(".nav-link a");

  links.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default link behavior
      links.forEach((link) => {
        link.classList.remove("active"); // Remove active class from all links
      });
      this.classList.add("active"); // Add active class to clicked link
    });
  });

  // define a function to filter prompts by keyword
  const filterPrompts = (keyword) => {
    return prompts.filter((prompt) =>
      prompt.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  // define a function to handle clicks on the cat and dog tag links
  const handleTagClick = (keyword) => {
    let filteredPrompts = filterPrompts(keyword);
    setPromptsToDisplay(filteredPrompts);
    setSelectedPrompt(null);
  };

  return (
    <div className="btn-prompts">
      <div className="btn-navbar">
        <div className="nav-link">
          <a onClick={() => handleTagClick("cat")} href="#">
            Cats
          </a>
          <a onClick={() => handleTagClick("dog")} href="#">
            Dogs
          </a>
        </div>
        <div className="btn">
          {promptsToDisplay.map((prompt, index) => (
            <button
              ref={promptRefs.current[index]}
              key={prompt}
              onClick={() => handleClick(index)}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      <div className="selecte-txt">
        {selectedPrompt && <p>You selected: {selectedPrompt}</p>}
      </div>

      <div className="reload">
        <AiOutlineReload
          size={20}
          className="reload-icon"
          onClick={reloadButton}
        />
      </div>
    </div>
  );
};

export default PromptPicker;
