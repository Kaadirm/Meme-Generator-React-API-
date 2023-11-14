import React, {useEffect, useState, useRef} from 'react'
import html2canvas from "html2canvas";


function Meme() {

  // declaring variables

  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "",
    topTextLength: "100%",
    bottomTextLength: "100%"
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
    const {name, value, type } = e.target
    let numberValue    
    if(type === "number"){
      value < 10 ? numberValue = 10 : value > 100 ? numberValue = 100 : numberValue = value
    }
    setMeme(preVal => ({
      ...preVal,
      [name]: type === "number" ? numberValue : value
    }))
  }

  // To simply changing color of the texts by clicking

  const memeColor = {
    1: "white",
    2: "black",
    3: "blue",
    4: "red",
    5: "green",
    6: "yellow"
  }
  const [colorCount, setColorCount] = useState(1)
  const handleColorCount = () => {
    setColorCount(preVal => {
      return preVal === 6 ? 1 : preVal + 1 
    })
  } 
  console.log(meme.topTextLength)


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


  //            Drag elements TopText and BottomText seperatly
  // So user can choose the position of text on the image
  // To work this out on mobile devices functions created seperatedly


  const [isDraggingTopText, setIsDraggingTopText] = useState(false);
  const [positionTopText, setPositionTopText] = useState({ x: 0, y: 0 });
  const [offsetTopText, setOffsetTopText] = useState({ x: 0, y: 0 });

  const [isDraggingBottomText, setIsDraggingBottomText] = useState(false);
  const [positionBottomText, setPositionBottomText] = useState({ x: 0, y: 0 });
  const [offsetBottomText, setOffsetBottomText] = useState({ x: 0, y: 0 });

  const handleTouchStartTopText = (e) => {
    e.preventDefault();
    setIsDraggingTopText(true);
    setOffsetTopText({
      x: e.touches[0].clientX - positionTopText.x,
      y: e.touches[0].clientY - positionTopText.y
    });
  }

  const handleMouseDownTopText = (e) => {
    setIsDraggingTopText(true);
    setOffsetTopText({
      x: e.clientX - positionTopText.x,
      y: e.clientY - positionTopText.y
    });
  };

  const handleEndTopText = () => {
    setIsDraggingTopText(false);
  };

  const handleTouchMoveTopText = (e) => {
    e.preventDefault();
    if (!isDraggingTopText) return;
    setPositionTopText({
      x: e.touches[0].clientX - offsetTopText.x,
      y: e.touches[0].clientY - offsetTopText.y
    });
  }

  const handleMouseMoveTopText = (e) => {
    if (!isDraggingTopText) return;
    setPositionTopText({
      x: e.clientX - offsetTopText.x,
      y: e.clientY - offsetTopText.y
    });
  };  

  
  const handleTouchStartBottomText = (e) => {
    e.preventDefault();
    setIsDraggingBottomText(true);
    setOffsetBottomText({
      x: e.touches[0].clientX - positionBottomText.x,
      y: e.touches[0].clientY - positionBottomText.y
    });
  }
  
  const handleMouseDownBottomText = (e) => {
    setIsDraggingBottomText(true);
    setOffsetBottomText({
      x: e.clientX - positionBottomText.x,
      y: e.clientY - positionBottomText.y
    });
  };

  const handleEndBottomText = () => {
    setIsDraggingBottomText(false);
  };

  const handleTouchMoveBottomText = (e) => {
    e.preventDefault();
    if (!isDraggingBottomText) return;
    setPositionBottomText({
      x: e.touches[0].clientX - offsetBottomText.x,
      y: e.touches[0].clientY - offsetBottomText.y
    });
  }

  const handleMouseMoveBottomText = (e) => {
    if (!isDraggingBottomText) return;
    setPositionBottomText({
      x: e.clientX - offsetBottomText.x,
      y: e.clientY - offsetBottomText.y
    });
  };


  //Wrapper function to manage mouse movement for topText and bottomText
  //I didn't use handleMouseMove on the elements themselves
  //Cause when mouse moves goes fast and outside of element it'self it stops
  //Dragging event so I need bigger, parent element for this function.

  const handleMouseMove = (e) => {
    e.preventDefault()
    if (isDraggingTopText) {
      handleMouseMoveTopText(e);
    }
    if (isDraggingBottomText) {
      handleMouseMoveBottomText(e);
    }
  };

  

  //Meme main part inputs and images goes here

  return (
    <>
        <main className='main-frame' onMouseMove={handleMouseMove}>
            <div className='form'>
              <div className='form-input-div'>
                <input type='text' 
                className='form-input' 
                name='topText' 
                placeholder='Top text' 
                value={meme.topText} 
                onChange={handleChange} />
                
                <input type="number"  
                className="form-length" 
                name='topTextLength' 
                placeholder={100}    
                onChange={handleChange} />

              </div >
                <button style={{backgroundColor: memeColor[colorCount]}} className="color-btn" onClick={handleColorCount}>C</button>
              <div className='form-input-div'>
                <input type='text' 
                className='form-input' 
                name='bottomText' 
                placeholder='Bottom text' 
                value={meme.bottomText} 
                onChange={handleChange} />
                
                <input type="number" 
                className="form-length" 
                name='bottomTextLength'
                placeholder={100}    
                onChange={handleChange} />

              </div>  
                <button onClick={getMemeImage} className='meme-btn'>{meme.randomImage ? "Get a new meme image 🖼" : "Get a meme 🖼"}</button>
            </div>
            <div className='img-div' ref={exportRef}>
                  <img alt={meme.randomImage ? "meme" : ""} src={meme.randomImage} className='meme-img'/>
                  <h2 className="meme-text-top"
                  style={{
                    transform: `translate(${positionTopText.x}px, ${positionTopText.y}px)`,
                    color: memeColor[colorCount],
                    width: meme.topTextLength+"%"
                  }}
                  onTouchStart={handleTouchStartTopText}
                  onTouchEnd={handleEndTopText}
                  onTouchMove={handleTouchMoveTopText}
                  onMouseDown={handleMouseDownTopText}
                  onMouseUp={handleEndTopText}
                  >{meme.topText}</h2>

                  <h2 className="meme-text-bottom"
                  style={{
                    transform: `translate(${positionBottomText.x}px, ${positionBottomText.y}px)`,
                    color: memeColor[colorCount],
                    width: meme.bottomTextLength+"%"
                  }}
                  onTouchStart={handleTouchStartBottomText}
                  onTouchEnd={handleEndBottomText}
                  onTouchMove={handleTouchMoveBottomText}
                  onMouseDown={handleMouseDownBottomText}
                  onMouseUp={handleEndBottomText}
                  >{meme.bottomText}</h2>
            </div >  
            <div className='btn-div'>
              <button onClick={() => exportAsImage(exportRef.current, "meme")} className="download-btn">
                Donwload
              </button>
            </div>
        </main>
    </>
  )
}

export default Meme