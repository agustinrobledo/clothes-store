interface sectionProps {
    index: number
}

const Section = ({ index }: sectionProps) => {
    return (
        <div
            className={`h-screen w-100 ${
                index % 2 === 0 ? "bg-red-600" : "bg-blue-500"
            }`}
        ></div>
    )
}

export default Section
