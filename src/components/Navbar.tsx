import { useState } from "react"
import Button from "./Button"
import Search from "./Search"
import useScrollPosition from "../hooks/useScrollPosition"

const Navbar = () => {
    const [onShowSearch, setOnShowSearch] = useState<boolean | null>(null)
    const scrollPosition = useScrollPosition()

    const handleSearch = () => {
        setOnShowSearch(!onShowSearch)
    }

    return (
        <div className="font-semibold text-black w-100 flex flex-col sticky top-0">
            <div className="bg-red-500">
                <Search onShow={onShowSearch} />
            </div>
            <div
                className={`flex justify-between px-12 py-6 ${
                    scrollPosition > 700 ? "bg-white" : "bg-yellow-400"
                }`}
            >
                <div className="flex gap-2">
                    <Button>SHOP</Button>
                    <Button>ABOUT</Button>
                    <Button onClick={handleSearch} border={false}>
                        🔎
                    </Button>
                </div>
                <h1 className="font-bold text-xl">THE FIGMA STORE</h1>
                <div className="flex gap-2">
                    {/* // this is going to be a dropdown */}
                    <Button>UNITED STATES</Button>
                    <Button>CART</Button>
                </div>
            </div>
        </div>
    )
}

export default Navbar
