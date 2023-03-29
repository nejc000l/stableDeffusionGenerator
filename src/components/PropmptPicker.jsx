import React, { useState, useRef } from 'react';

const PromptPicker = ({ prompts }) => {
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const promptRefs = useRef(prompts.map(() => React.createRef()));

  const handleClick = index => {
    setSelectedPrompt(prompts[index]);
    promptRefs.current.forEach(ref => (ref.current.style.backgroundColor = ''));
    promptRefs.current[index].current.style.backgroundColor = 'lightblue';
  };

  return (
    <div>
      {prompts.map((prompt, index) => (
        <button
          key={prompt}
          onClick={() => handleClick(index)}
          ref={promptRefs.current[index]}
        >
          {prompt}
        </button>
      ))}
      {selectedPrompt && <p>You selected: {selectedPrompt}</p>}
    </div>
  );
};

export default PromptPicker;