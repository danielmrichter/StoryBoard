import { forwardRef, useEffect, useState } from "react";
import GridLayout from "react-grid-layout";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import ProjectCard from "./ProjectCard/ProjectCard";
import axios from "axios";

export default function ProjectView() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "FETCH_PROJECT_ITEMS", payload: projectId });
  }, []);
  // These functions handle data permanence. They will dispatch to redux to PUT the updated projectItems.
  // There is some error handling, and that's what I'm probably working on if you're reading this right now.
  // The layout is handled by react-grid-layout. It directly mutates it once the array is set, and I don't think
  // There's a way to intercept it and prevent that behavior. So, The workaround is to instead let it do it's thing,
  // Then PUT the updated item. Then, if there's an error... reset it somehow.
  const [oldLayout, setOldLayout] = useState([]);
  const  handleLayoutChange = async (layout) => {
    try {
      await axios.put("/api/projects/items", { projectId, layout });
      setOldLayout(layout)
    } catch (error) {
      console.log("Error in PUT/api/projects: ", error);
      dispatch({type: 'SET_PROJECT_ITEMS', payload: oldLayout})
    }
  };
  const handleOnDrop = (layout) =>{
    console.log('handleOnDrop, layout is: ', layout)
  }
  const { projectId } = useParams();
  const projectItems = useSelector((store) => store.projectItems);
  return (
    <div>
      <GridLayout
        onLayoutChange={handleLayoutChange}
        compactType={null}
        layout={projectItems}
        cols={12}
        rowHeight={30}
        width={1800}
        onDragStart={(layout) => setOldLayout(layout)}
        onDrop={handleOnDrop}
      >
        {projectItems.map((item) => (
          <ProjectCard key={item.i} item={item} />
        ))}
      </GridLayout>
    </div>
  );
}
