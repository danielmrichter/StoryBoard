import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateProjectForm from "../CreateProjectForm/CreateProjectForm";

export default function Projects() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "FETCH_PROJECTS"});
  }, []);
  const user = useSelector((store) => store.user);
  const projects = useSelector((store) => store.projects);
  return (
    <>
      <CreateProjectForm />
      <div>
        {projects.map((project) => (
          <h4 key={project.id}>{project.project_name}</h4>
        ))}
      </div>
    </>
  );
}
