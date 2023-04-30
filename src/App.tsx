import Navbar from "./components/Navbar"
import Section from "./components/Section"
import "./App.css"

function App() {
    return (
        <>
            <Navbar />
            <Section index={1} />
            <Section index={2} />
        </>
    )
}

export default App
