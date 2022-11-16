import Part from './Part'
const Content = ({ parts }) => {
    const totalExercises = parts
        .map(part => part.exercises)
        .reduce((prev, curr) => prev + curr);

    return (
        <div>
            {parts.map(part => (
                <Part key={part.id} part={part} />
            ))}
            <p><b>total of {totalExercises} exercises</b></p>
        </div>
    )
}

export default Content;