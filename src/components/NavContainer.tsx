import { useLayoutEffect, useRef, useState } from "react"
import useScrollPosition from "../hooks/useScrollPosition"
import { gsap } from "gsap"

interface navContainerProps {
    children: React.ReactNode
}
const NavContainer = ({ children }: navContainerProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [previousScrollPosition, scrollPosition] = useScrollPosition()
    const [show, setShow] = useState(true)

    useLayoutEffect(() => {
        if (previousScrollPosition > scrollPosition && show === false) {
            gsap.to(containerRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.3,
            })
            setShow(true)
        } else if (previousScrollPosition < scrollPosition && show === true) {
            gsap.to(containerRef.current, {
                y: -100,
                opacity: 0,
                duration: 0.3,
            })
            setShow(false)
        }
    }, [previousScrollPosition, scrollPosition, show])

    return (
        <div
            ref={containerRef}
            className="font-semibold text-black flex flex-col w-full fixed top-0 bg-yellow-300"
        >
            {children}
        </div>
    )
}

export default NavContainer
