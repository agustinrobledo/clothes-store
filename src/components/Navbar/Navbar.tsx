import { useState } from "react"
import Button from "../Button"
import Search from "./Search"
import MenuContainer from "./MenuContainer"
import NavContainer from "./NavContainer"

const Navbar = () => {
    const [onShowSearch, setOnShowSearch] = useState<boolean | null>(null)

    const handleSearch = () => {
        setOnShowSearch(!onShowSearch)
    }

    return (
        <NavContainer>
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
        </NavContainer>
    )
}

export default Navbar
