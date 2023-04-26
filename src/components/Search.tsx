import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"

interface typeSearchProps {
    onShow: boolean
    setOnShow: () => void
}

const Search = ({ onShow, setOnShow }: typeSearchProps) => {
    const containerRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        if (containerRef.current) {
            let ctx = gsap.context(() => {
                console.log("start")

                gsap.fromTo(
                    ".search",
                    {
                        y: -100,
                        opacity: 0,
                        backgroundColor: "white",
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.3,
                    }
                )
            }, containerRef)

            return () => ctx.revert()
        }
    }, [])

    return (
        <div ref={containerRef} className="bg-white">
            <div className="search text-black py-6">
                <input placeholder="Search" />
            </div>
        </div>
    )
}

export default Search
