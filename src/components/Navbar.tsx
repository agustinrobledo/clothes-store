import { useState } from "react"
import Button from "./Button"
import Search from "./Search"
import MenuContainer from "./MenuContainer"

const Navbar = () => {
    const [onShowSearch, setOnShowSearch] = useState<boolean | null>(null)

    const handleSearch = () => {
        setOnShowSearch(!onShowSearch)
    }

    return (
        <div className="font-semibold text-black w-100 flex flex-col sticky top-0">
            <div className="bg-red-500">
                <Search onShow={onShowSearch} />
            </div>
            <MenuContainer className="flex justify-between px-12 py-6 bg-yellow-200">
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
            </MenuContainer>
        </div>
    )
}

export default Navbar
