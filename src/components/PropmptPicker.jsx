import React, { useState, useRef } from 'react';
import '../styles/promptPicker.css'
const PromptPicker = ({ prompts,handlePromptClick}) => {
  const promptRefs = useRef(prompts.map(() => React.createRef()))
    const [selectedPrompt,setSelectedPrompt]= useState(null)
  const handleClick = index => {
    handlePromptClick(prompts[index]);
    setSelectedPrompt(prompts[index]);
    promptRefs.current.forEach(ref => (ref.current.style.backgroundColor = ''));
    promptRefs.current[index].current.style.backgroundColor = 'lightblue'
  };


  return (
    <div className='btn-prompts'>

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

<div className='selecte-txt'>
      {selectedPrompt && <p>You selected: {selectedPrompt}</p>}

</div>
      </div>

    </div>
  )
}

export default PromptPicker;