import { useEffect, useState } from "react"

const useScrollPosition = () => {
    const [scrollPosition, setScrollPosition] = useState(0)
    const [previousScrollPosition, setPreviousScrollPosition] = useState(0)

    useEffect(() => {
        const updatePosition = () => {
            setScrollPosition(window.pageYOffset)
            setTimeout(() => setPreviousScrollPosition(window.pageYOffset), 400)
        }
        window.addEventListener("scroll", updatePosition)
        updatePosition()
        return () => window.removeEventListener("scroll", updatePosition)
    }, [])

    return [previousScrollPosition, scrollPosition]
}

export default useScrollPosition
