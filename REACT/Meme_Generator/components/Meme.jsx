import "/styles/Meme.css"
import { useEffect, useState } from "react"

export default function Meme() { 

    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        memeImg: "https://i.imgflip.com/1ur9b0.jpg"
    })

    const [allMemes, setAllMemes] = useState([])

    const handleChange = (e) => {
        const {name, value} = e.target
        setMeme(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const getMemeImage = () => { 
        const memesArr = allMemes.data.memes
        const randomMeme = memesArr[Math.floor(Math.random() * memesArr.length)].url
        setMeme(prevState => ({
            ...prevState,
            memeImg: randomMeme
        }))
    }

    useEffect(() => { 
        fetch('https://api.imgflip.com/get_memes')
            .then(res => res.json())
            .then(data => setAllMemes(data))
    }, [])

    return (
        <main className="meme">
            <div className="meme--form-inside-wrapper">
                <div className="memeTextInputsWrapper">
                    <label className="meme--label" htmlFor="topText">Top text</label>
                    <input className="meme--input" type="text" name="topText" value={meme.topText} onChange={handleChange}/>
                </div>
                <div className="memeTextInputsWrapper">
                    <label className="meme--label" htmlFor="bottomText">Bottom text</label>
                    <input className="meme--input" type="text" name="bottomText" value={meme.bottomText} onChange={handleChange}/>
                </div>
            </div>
            <button className="meme--btn" onClick={getMemeImage}>Get a new meme image 🖼️</button>
            <div className="meme-wrapper">
                <img className="meme--img" src={meme.memeImg} alt="meme" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}