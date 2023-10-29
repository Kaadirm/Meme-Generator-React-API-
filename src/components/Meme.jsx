import React, {useEffect, useState, useRef} from 'react'
import html2canvas from "html2canvas";


function Meme() {

  // declaring variables

  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: ""
  });
  const [memeData, setMemeData] = useState()


  // api call for images


  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
    .then(res => res.json())
    .then(data => setMemeData(data.data.memes))
  }, [])

  // Button for getting new image by api call

  const getMemeImage = () => {
    const randomNumber = Math.floor(Math.random() * memeData.length)
    const url = memeData[randomNumber].url
    setMeme(preVal => ({
      ...preVal,
      randomImage: url
    }))
  }

  //Input events tracking live for topText and bottomText

  const handleChange = (e) => {
    const {name, value } = e.target
    setMeme(preVal => ({
      ...preVal,
      [name]: value
    }))
  }


  // Using useRef and html2canvas to download image and texts together by clicking download button

  const exportAsImage = async (el, imageFileName) => {
    const canvas = await html2canvas(el, {allowTaint: true, useCORS: true, logging: true});
    const image = canvas.toDataURL("image/png", 1.0);
    downloadImage(image, imageFileName);
    };
    const downloadImage = (blob, fileName) => {
    const fakeLink = window.document.createElement("a");
    fakeLink.style = "display:none;";
    fakeLink.download = fileName;
    fakeLink.href = blob;
    
    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);
    
    fakeLink.remove();
    };
  const exportRef = useRef();

  //Meme main part inputs and images goes here

  return (
    <>
        <main className='main-frame'>
            <div className='form'>
                <input type='text' className='form-input' name='topText' placeholder='Top text' value={meme.topText} onChange={handleChange} />
                <input type='text' className='form-input' name='bottomText' placeholder='Bottom text' value={meme.bottomText} onChange={handleChange} />
                <button onClick={getMemeImage} className='meme-btn'>{meme.randomImage ? "Get a new meme image 🖼" : "Get a meme 🖼"}</button>
            </div>
            <div className='img-div' ref={exportRef}>
                  <img alt={meme.randomImage ? "meme" : ""} src={meme.randomImage} className='meme-img'/>
                  <h2 className="meme-text-top">{meme.topText}</h2>
                  <h2 className="meme-text-bottom">{meme.bottomText}</h2>
            </div >  
            <div className='btn-div'>
              <button onClick={() => exportAsImage(exportRef.current, "test")} className="download-btn">
                Donwload
              </button>
            </div>
        </main>
    </>
  )
}

export default Meme