import React, { useRef, useEffect, useState } from 'react';
import Awesomplete from 'awesomplete';
import { FaPlusCircle, FaFileImage, FaGift, FaPaperPlane } from "react-icons/fa";
import AudioSend from './AudioSend';
import { getMessageSuggestions, postMessageSuggestions } from '../store/actions/messengerAction';
// import fs from 'fs';


const MessageSend = ({ inputHendle, newMessage, sendMessage, emojiSend, ImageSend, sendAudioMessage, setNewMessage }) => {
     
     const inputRef = useRef(null);
     const awesompleteRef = useRef(null);
     const [suggestions, setSuggestions] = useState(['Hello', 'How are you?', 'What are you up to?', "What's up"]);
     const emojis = [
          '😀', '😃', '😄', '😁',
          '😆', '😅', '😂', '🤣',
          '😊', '😇', '🙂', '🙃',
          '😉', '😌', '😍', '😝',
          '😜', '🧐', '🤓', '😎',
          '😕', '🤑', '🥴', '😱'
     ]

     const handleInputChange = (event) => {
          inputHendle(event.target.value);
     };

     const sendMessageHandler = (event) => {
          if(!suggestions.includes(newMessage)) {
               // setSuggestions([...suggestions,newMessage]); 
               postMessageSuggestions(newMessage).then(()=>setSuggestions([...suggestions,newMessage]));
          }
          sendMessage(event);
     }

     useEffect(()=>{     
          getMessageSuggestions().then(data=>setSuggestions(data));
     },[]);

     useEffect(() => {
          if (inputRef.current && !awesompleteRef.current) {
               const awesomplete = new Awesomplete(inputRef.current, {
                    list: suggestions,
                    minChars: 1,
                    maxItems: 5,
               });
               awesompleteRef.current = awesomplete;
               inputRef.current.addEventListener('awesomplete-select', (event) => {
                    const selectedSuggestion = event.text.value;
                    inputHendle(selectedSuggestion);
               });
          }
     }, [inputRef.current, suggestions]);

     useEffect(() => {
          if (awesompleteRef.current) {
               awesompleteRef.current.list = suggestions;
          }
     }, [suggestions]);

     return (
          <div className='message-send-section'>
               <input type="checkbox" id='emoji' />
               {/* <div className='file hover-attachment'>
                    <div className='add-attachment'>
                         Add Attachment
                    </div>
                    <FaPlusCircle />
               </div> */}

               <div className='file hover-image'>
                    <div className='add-image'>
                         Add Image
                    </div>
                    <input onChange={ImageSend} type="file" id="pic" className='form-control' />
                    <label htmlFor='pic'> <FaFileImage /> </label>
               </div>

               {/* <div className='file hover-gift'>
                    <div className='add-gift'>
                         Add gift
                    </div>
                    <FaGift />
               </div> */}
               {/* <div className='message-type'>
                    <input  ref={inputRef} type="text" onChange={handleInputChange} name='message' id='message' placeholder='Aa' className='form-control' value={newMessage}/>
                    <div className='file hover-gift'>
                         <label htmlFor='emoji'> <FaPaperPlane/> </label>
                    </div>
               </div> */}

               <div>
                    <input
                         ref={inputRef}
                         className='form-control'
                         type="text"
                         placeholder="Type your message here"
                         value={newMessage}
                         onChange={handleInputChange}
                    />
                    <div className='file hover-gift'>
                         <label htmlFor='emoji'> <FaPaperPlane/> </label>
                    </div>
               </div>
               <div onClick={sendMessageHandler} className='file'>
                    ❤
               </div>
               <div className='file'>
                    <AudioSend
                         sendAudioMessage={sendAudioMessage}
                    />
               </div>
               <div className='emoji-section'>
                    <div className='emoji'>
                         {
                              emojis.map(e => <span onClick={() => emojiSend(e)} >{e}</span>)
                         }
                    </div>
               </div>
          </div>
     )
};

export default MessageSend;