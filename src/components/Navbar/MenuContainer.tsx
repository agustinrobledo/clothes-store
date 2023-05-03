import React, { useLayoutEffect, useRef } from "react"
import useScrollPosition from "../../hooks/useScrollPosition"
import { gsap } from "gsap"

interface menuContainerProps {
    children: React.ReactNode
    className: string
}

const MenuContainer = ({ children, className }: menuContainerProps) => {
    const [_, scrollPosition] = useScrollPosition()
    const containerRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        gsap.set(containerRef.current, { backgroundColor: "#ffc700" })
    }, [])

    useLayoutEffect(() => {
        if (scrollPosition > 10) {
            gsap.to(containerRef.current, {
                backgroundColor: "#ffffff",
                duration: 0.3,
            })
        } else if (scrollPosition < 10) {
            gsap.to(containerRef.current, {
                backgroundColor: "#ffc700",
                duration: 0.3,
            })
        }
    }, [scrollPosition])

    return (
        <div ref={containerRef} className={className}>
            {children}
        </div>
    )
}

export default MenuContainer
