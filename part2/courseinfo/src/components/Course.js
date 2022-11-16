import Header from './Header'
import Content from './Content'
const Course = ({course}) => {
    return (
        <div>
        {/* <h1>Course</h1> */}
        <Header text={course.name} />
        <Content parts={course.parts} />
        </div>
    )
}

export default Course;