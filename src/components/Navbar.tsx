import Button from "./Button"

const Navbar = () => {
  return (
    <div className="bg-white px-12 py-6 text-black justify-between w-100 flex">
      <div className="" >
        <Button>Shop</Button>
        <Button>About</Button>
      </div>
      <h1>THE FIGMA STORE</h1>
      <div>
        {/* // this is going to be a dropdown */}
        <Button>UNITED STATES</Button>
        <Button>CART</Button>
      </div>
    </div>
  )
}

export default Navbar
