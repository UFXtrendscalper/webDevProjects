import Header from "/components/Header.jsx"
import Buttons from "/components/Buttons.jsx"
import Main from "/components/Main.jsx"
import Footer from '/components/Footer.jsx'

import '/styles/app.css'


export default function App() { 
    return (
        <div className="businessCard">
            <Header />
            <Buttons />
            <Main />
            <Footer />
        </div>
    )
}
