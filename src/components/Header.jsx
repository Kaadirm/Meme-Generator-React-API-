import React from 'react'

function Header() {
  return (
    <>
        <header className="header">
          <div className="logo">
            <img className="trollImg" src={require("../images/TrolFace.png")} alt="Troll Face" />
            <h2 className="header-title">Meme Generator</h2>
          </div>
          <h4 className="header-project">React - Project</h4>
        </header>
    </>
  )
}

export default Header