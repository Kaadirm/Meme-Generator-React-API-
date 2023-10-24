import React, {useState} from 'react'
import {memes} from './memesdata'

function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg"
  });
  const [memeData, setmemeData] = useState(memes)
  const getMemeImage = () => {
    const memesArr = memeData.data.memes
    const randomNumber = Math.floor(Math.random() * memesArr.length)
    const url = memesArr[randomNumber].url
    setMeme(preVal => ({
      ...preVal,
      randomImage: url
    }))
  }
  return (
    <>
        <main className='main-frame'>
            <div className='form'>
                <input type='text' className='form-input' placeholder='Top text'></input>
                <input type='text' className='form-input' placeholder='Bottom textx'></input>
                <button onClick={getMemeImage} className='meme-btn'>Get a new meme image  🖼</button>
            </div>
            <div className='img-div'>
                  <img src={meme.randomImage} className='meme-img'/>
            </div>  
        </main>
    </>
  )
}

export default Meme