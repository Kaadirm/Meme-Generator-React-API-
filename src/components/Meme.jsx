import React, {useEffect, useState} from 'react'

function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: ""
  });
  const [memeData, setMemeData] = useState()

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
    .then(res => res.json())
    .then(data => setMemeData(data.data.memes))
  }, [])

  const getMemeImage = () => {
    const randomNumber = Math.floor(Math.random() * memeData.length)
    const url = memeData[randomNumber].url
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
  return (
    <>
        <main className='main-frame'>
            <div className='form'>
                <input type='text' className='form-input' name='topText' placeholder='Top text' value={meme.topText} onChange={handleChange} />
                <input type='text' className='form-input' name='bottomText' placeholder='Bottom text' value={meme.bottomText} onChange={handleChange} />
                <button onClick={getMemeImage} className='meme-btn'>{meme.randomImage ? "Get a new meme image 🖼" : "Get a meme 🖼"}</button>
            </div>
            <div className='img-div'>
                  <img alt={meme.randomImage ? "meme" : ""} src={meme.randomImage} className='meme-img'/>
                  <h2 className="meme-text-top">{meme.topText}</h2>
                  <h2 className="meme-text-bottom">{meme.bottomText}</h2>
            </div>  
        </main>
    </>
  )
}

export default Meme