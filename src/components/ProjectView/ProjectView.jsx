import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import ProjectCard from "./ProjectCard/ProjectCard";
import axios from "axios";
import AddCards from "./AddCards/AddCards";
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
export default function ProjectView() {
  // const GridLayout = WidthProvider(Responsive)
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
  const handleLayoutChange = async (layout) => {
    console.log("handleLayoungChange!", layout);
    try {
      await axios.put("/api/projects/items", { projectId, layout });
      setOldLayout(layout);
    } catch (error) {
      console.log("Error in PUT/api/projects: ", error);
      dispatch({ type: "SET_PROJECT_ITEMS", payload: oldLayout });
    }
  };
  const handleOnDrop = (layout) => {
    console.log("handleOnDrop, layout is: ", layout);
  };
  const { projectId } = useParams();
  const projectItems = useSelector((store) => store.projectItems);
  // THE DATA NEEDS TO BE CALLED FOR FROM THE ONCLICK
  return (
    <>
      <ResponsiveGridLayout
        className="layout"
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        compactType={null}
        layout={projectItems}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={100}
        width={1000}
        onDragStart={(layout) => setOldLayout(layout)}
        onDragStop={handleLayoutChange}
      >
        {projectItems.map((item) => (
          <ProjectCard
            data-grid={{
              w: item.w,
              i: item.i,
              x: item.x,
              y: item.y,
              h: item.h,
            }}
            key={item.i}
            item={item}
          />
        ))}
      </ResponsiveGridLayout>
      <AddCards projectId={projectId} />
    </>
  );
}
