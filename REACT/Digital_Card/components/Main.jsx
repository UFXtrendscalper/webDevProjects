import "/styles/main.css";

export default function Main() { 
    return (
        <main className="main">
            <div className="main--profile">
                <h3 className="main--title">About</h3>
                <p className="main--description">I am a frontend developer with a particular interest in making things simple and automating daily tasks. I try to keep up with security and best practices, and am always looking for new things to learn.</p>
            </div>
            <div className="main--profile">
                <h3 className="main--title">Interests</h3>
                <p className="main--description">Food expert. Music scholar. Reader. Internet fanatic. Bacon buff. Entrepreneur. Travel geek. Pop culture ninja. Coffee fanatic.</p>
            </div>
        </main>
    )
}