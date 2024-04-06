import "/styles/header.css";

export default function Header() {
    return (
        <header className="header">
            <img src="/src/assets/Rectangle 90.png" alt="Profile image" />
            <h1 className="header--name">Laura Smith</h1>
            <h2 className="header--position">Frontend Developer</h2>
            <p className="header--email">laurasmith.website</p>
        </header>
    )
}
    