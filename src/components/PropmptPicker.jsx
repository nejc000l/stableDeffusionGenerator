import React, { useState, useRef } from 'react';
import '../styles/promptPicker.css'
import {AiOutlineReload} from 'react-icons/ai'
const PromptPicker = ({ prompts,handlePromptClick}) => {
  const promptRefs = useRef(prompts.map(() => React.createRef()))
    const [selectedPrompt,setSelectedPrompt]= useState(null)
    // Make a copy of the prompts array

// Make a copy of the prompts array
let promptsCopy = [...prompts];

const handleClick = index => {
    handlePromptClick(promptsCopy[index]);
    setSelectedPrompt(promptsCopy[index]);

    promptRefs.current.forEach(ref => (ref.current.style.backgroundColor = ''));

    const selectedPromptRef = promptRefs.current[index].current;
    selectedPromptRef.style.backgroundColor = '#0e0f7c';
    selectedPromptRef.style.color = 'gray';
    selectedPromptRef.addEventListener('click', () => {
        selectedPromptRef.style.backgroundColor = '';
        selectedPromptRef.disabled = true;
    });
    promptsCopy.splice(index, 1);


    if (promptsCopy.length === 0) {
        console.log('No more elements in prompts array, reloading page');
    }
};        
const reloadButton = () => {
    location.reload();
};

  return (
    <div className='btn-prompts'>

<div className='btn'>  

      {prompts.map((prompt, index) => (
        <button
          key={prompt}
          onClick={() => handleClick(index)}
          ref={promptRefs.current[index]}
        >
          {prompt}
        </button>
        
      ))}
<AiOutlineReload    size={20}         className="reload-icon"
onClick={reloadButton}/> 
<div className='selecte-txt'>
      {selectedPrompt && <p>You selected: {selectedPrompt}</p>}

</div>
      </div>

    </div>
  )
}

export default PromptPicker;