import { forwardRef, useEffect } from "react";
import GridLayout from "react-grid-layout";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import ProjectCard from "./ProjectCard/ProjectCard";

export default function ProjectView() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "FETCH_PROJECT_ITEMS", payload: projectId });
  }, []);
  const { projectId } = useParams();
  const projectItems = useSelector((store) => store.projectItems);
  return (
    <div>
      <GridLayout
        compactType={null}
        layout={projectItems}
        cols={12}
        rowHeight={30}
        width={1800}
      >
        {projectItems[0] &&
          projectItems.map((item) => <ProjectCard key={item.i} item={item} />)}
      </GridLayout>
    </div>
  );
}
