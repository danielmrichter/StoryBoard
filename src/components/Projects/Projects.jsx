import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateProjectForm from "../CreateProjectForm/CreateProjectForm";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function Projects() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "FETCH_PROJECTS"});
  }, []);
  const user = useSelector((store) => store.user);
  const projects = useSelector((store) => store.projects);
  const history = useHistory();
  const handleProjectView = (id) => {
    history.push(`/projectview/${id}`)
  }
  return (
    <>
      <CreateProjectForm />
      <div>
        {projects.map((project) => (
          <h4 key={project.id} onClick={() => handleProjectView(project.id)}>{project.project_name}</h4>
        ))}
      </div>
    </>
  );
}
