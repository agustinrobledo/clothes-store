import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"

interface typeSearchProps {
    onShow: boolean | null
    setOnShow: () => void
}

const Search = ({ onShow, setOnShow }: typeSearchProps) => {
    const containerRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        if (containerRef.current) {
            if (onShow) {
                gsap.to(containerRef.current, {
                    y: 0,
                    duration: 0.5,
                    ease: "power3.out",
                    height: "100%",
                    transformOrigin: "bottom",
                })
            } else if (onShow === false) {
                gsap.to(containerRef.current, {
                    y: -100,
                    duration: 0.5,
                    ease: "power3.out",
                    height: 0,
                    transformOrigin: "top",
                })
            }
        }
    }, [onShow])

    return (
        <div ref={containerRef} className="bg-white">
            <div className="text-black pl-4 py-6">Search</div>
        </div>
    )
}

export default Search
