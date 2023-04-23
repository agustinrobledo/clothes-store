import Button from "./Button"

const Navbar = () => {
  return (
    <div className="bg-white px-12 py-6 font-semibold text-black justify-between w-100 flex">
      <div className="flex gap-2" >
        <Button>Shop</Button>
        <Button>About</Button>
        <Button border={false}>🔎</Button>
      </div>
      <h1 className="font-bold text-xl">THE FIGMA STORE</h1>
      <div className="flex gap-2">
        {/* // this is going to be a dropdown */}
        <Button>UNITED STATES</Button>
        <Button>Cart</Button>
      </div>
    </div>
  )
}

export default Navbar
