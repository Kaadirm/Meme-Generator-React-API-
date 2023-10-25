import React, {useState} from 'react'
import {memes} from './memesdata'

function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg"
  });
  const [memeData, setMemeData] = useState(memes)
  const getMemeImage = () => {
    const memesArr = memeData.data.memes
    const randomNumber = Math.floor(Math.random() * memesArr.length)
    const url = memesArr[randomNumber].url
    setMeme(preVal => ({
      ...preVal,
      randomImage: url
    }))
  }
  const handleChange = (e) => {
    const {name, value } = e.target
    setMeme(preVal => ({
      ...preVal,
      [name]: value
    }))
  }
  console.log(meme)

  return (
    <>
        <main className='main-frame'>
            <div className='form'>
                <input type='text' className='form-input' name='topText' placeholder='Top text' value={meme.topText} onChange={handleChange} />
                <input type='text' className='form-input' name='bottomText' placeholder='Bottom text' value={meme.bottomText} onChange={handleChange} />
                <button onClick={getMemeImage} className='meme-btn'>Get a new meme image  🖼</button>
            </div>
            <div className='img-div'>
                  <img src={meme.randomImage} className='meme-img'/>
                  <h2 className="meme-text-top">{meme.topText}</h2>
                  <h2 className="meme-text-bottom">{meme.bottomText}</h2>
            </div>  
        </main>
    </>
  )
}

export default Meme