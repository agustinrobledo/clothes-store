import Navbar from "./components/Navbar"
import Section from "./components/Section"
import "./App.css"

function App() {
    return (
        <div className="bg-yellow-300">
            <Navbar />
            <Section index={1} />
            <Section index={2} />
        </div>
    )
}

export default App
