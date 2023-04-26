import { useRef, useState } from "react"
import Button from "./Button"
import Search from "./Search"

const Navbar = () => {
    const [onShowSearch, setOnShowSearch] = useState<boolean | null>(null)
    const searchRef = useRef<HTMLDivElement>(null)

    return (
        <div className="font-semibold text-black w-100 flex flex-col">
            <div ref={searchRef}>
                <Search
                    onShow={onShowSearch}
                    setOnShow={() => setOnShowSearch(false)}
                />
            </div>
            <div className="flex justify-between bg-yellow-500 px-12 py-6 ">
                <div className="flex gap-2">
                    <Button>SHOP</Button>
                    <Button>ABOUT</Button>
                    <Button
                        onClick={() => setOnShowSearch(!onShowSearch)}
                        border={false}
                    >
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
