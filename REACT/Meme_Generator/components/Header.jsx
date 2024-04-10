import "/styles/Header.css"
import trollFace from "/src/assets/TrollFace.png"

export default function Header() { 
    return (
        <header className="header">
            <img className="header--img" src={trollFace} alt="" />
            <h1 className="header--title">Meme Generator</h1>
            <span className="header--description">React Course - Project 3</span>
        </header>    
    )
}