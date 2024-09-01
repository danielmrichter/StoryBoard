import { useState } from "react";
import { useSelector } from "react-redux";

export default function Projects() {
  const user = useSelector((store) => store.user);
  const [projects, setProjects] = useState([
    {
      id: 1,
      projectTitle: "A Movie",
      user: 1,
    },
    {
      id: 2,
      projectTitle: "The Book",
      user: 2,
    },
  ]);
  return (
    <div>
      {projects.map((project) => (
        <h4 key={project.id}>{project.projectTitle}</h4>
      ))}
    </div>
  );
}
