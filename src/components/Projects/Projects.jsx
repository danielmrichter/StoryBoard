import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Projects() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "FETCH_PROJECTS", payload: user.id });
    console.log(user)
  }, []);
  const user = useSelector((store) => store.user);
  const projects = useSelector((store) => store.projects);
  return (
    <div>
      {projects.map((project) => (
        <h4 key={project.id}>{project.projectTitle}</h4>
      ))}
    </div>
  );
}
