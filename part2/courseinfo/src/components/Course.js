import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

const Course = ({ course }) => {
	return (
		<div>
			<Header course={course} />
      <Content course={course} />
      <Total parts={course.parts} />
		</div>
	);
}

export default Course