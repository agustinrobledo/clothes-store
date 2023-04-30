import { useLayoutEffect, useRef } from "react"
import { gsap } from "gsap"

interface searchProps {
    onShow: boolean | null
}
const Search = ({ onShow }: searchProps) => {
    const showRef = useRef<boolean>(false)
    const searchRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        gsap.set(searchRef.current, { height: 0 })
    }, [])

    useLayoutEffect(() => {
        if (onShow === false) {
            gsap.to(searchRef.current, {
                height: "0",
                duration: 0.3,
            })
            showRef.current = false
        } else if (onShow === true) {
            gsap.to(searchRef.current, {
                height: "auto",
                duration: 0.3,
            })
            showRef.current = true
        }
    }, [onShow])

    return (
        <div ref={searchRef} className={`bg-white overflow-hidden`}>
            <div className="text-black pl-4 py-4 border-b-black border-b-4 text-2xl">
                Search
            </div>
        </div>
    )
}

export default Search
