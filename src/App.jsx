import { useState, useEffect } from 'react'
import './App.css'
import SavedMessage from './components/SavedMessage'

export default function App() {
  
  const [inputText, setInputText] = useState({
    website: '*website*',
    contact: '*contact*',
    company: '*company*',
    title: 'Message Title',
    message: "Hey *contact*! I was looking on *website* for exciting companies when I came across *company* and your profile. I am a developer super interested in what the company is doing in the tech industry. I'd love 5 minutes of your time to learn about your experiences there.  I will move mountains to make it work!"
  })

  const [savedMessages, setSavedMessages] = useState([])
  
  // Initialize Localstorage if present
  useEffect(() => {
    if(localStorage.getItem('messages')) {
      setSavedMessages(JSON.parse(localStorage.getItem('messages')))
    }else {
      localStorage.setItem('messages', JSON.stringify([]))
    }
  }, []);

  function handleChange(event) {
    let {name, value} = event.target
      setInputText(prevText => ({
        ...prevText,
        [name]: value
      }))
  }

  function updateMessages(updatedMessages) {
    setSavedMessages(updatedMessages)
  }

  function clipBoardCopy(p) {
    const source = document.getElementById(p).textContent
    navigator.clipboard.writeText(source)
    // alert('Copied to Clipboard')
  }
      
  //  Capitalize first letter and lowercase the rest
  function capitalizeString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  }
  
  // create array of elements from local storage
  const localStorageElements = savedMessages.map(item => {

      // replace the corresponding variables with value from state
      let messageOutput = item.text
      .replaceAll('*website*', inputText.website)
      .replaceAll('*contact*', capitalizeString(inputText.contact))
      .replaceAll('*company*', inputText.company)

    return (
      <SavedMessage
      clipBoardCopy={clipBoardCopy}
      updateMessages={updateMessages}
      title={item.title}
      messageOutput={messageOutput}
      key={item.id}
      id={item.id}
      {...item} 
      />
      )
    })
    
  function saveToLocalStorage() {
    let storage =  JSON.parse( localStorage.getItem('messages') )
    let randId = Math.floor( Math.random() * 10000 )
    storage.push( {id: `${randId}`, title: inputText.title, text: inputText.message} )
    localStorage.setItem('messages', JSON.stringify(storage))
    updateMessages(JSON.parse(localStorage.getItem('messages')))
  }

  return (
    <div className="App container">

      <h1>Easy Copy Message Builder</h1>

      <div className='boxes bOne'>

          <h2>Message Keywords</h2>

          <label htmlFor='jobSearchWebsite'>*website*</label>
          <input 
            type='text' 
            name='website' 
            onChange={handleChange} 
          />

          <label htmlFor='contactName'>*contact*</label>
          <input 
            type='text' 
            name='contact'
            onChange={handleChange} 
          />
          
          <label htmlFor='companyName'>*company*</label>
          <input 
            type='text' 
            name='company'
            onChange={handleChange}
            
          />
      </div>
    
      <div className='boxes'>
        <h2>Message Builder</h2>

        <input 
          className='messageTitle'
          type='text' 
          name='title'
          defaultValue='Message Title'
          onChange={handleChange} 
        />
        
        <textarea 
          type='text' 
          name='message'
          defaultValue="Hey *contact*! I was looking on *website* for exciting companies when I came across *company* and your profile. I am a developer super interested in what the company is doing in the tech industry. I'd love 5 minutes of your time to learn about your experiences there.  I will move mountains to make it work!"
          onChange={handleChange}
        />
        <button type='button' onClick={saveToLocalStorage}>Generate Message</button>
      </div>

      {localStorageElements}
      
    </div>
  )
}