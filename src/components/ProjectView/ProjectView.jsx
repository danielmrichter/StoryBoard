import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import ProjectCard from "./ProjectCard/ProjectCard";
import axios from "axios";
import AddCards from "./AddCards/AddCards";
import { Responsive, WidthProvider } from "react-grid-layout";
import { Button, useDisclosure } from "@chakra-ui/react";
import { AddIcon, EditIcon } from "@chakra-ui/icons";
import "./ProjectView.css";


export default function ProjectView() {
  const dispatch = useDispatch();
  const { projectId } = useParams();

  // This grabs relevent info to the current project.
  const projectItems = useSelector((store) => store.projectItems);
  const user = useSelector((store) => store.user);
  const owner = useSelector((store) => store.projectOwner);

  const ResponsiveGridLayout = WidthProvider(Responsive)

  useEffect(() => {
    dispatch({ type: "FETCH_PROJECT_ITEMS", payload: projectId });
    dispatch({ type: "FETCH_PROJECT_OWNER", payload: projectId });
  }, [projectId]);

  // These functions handle data permanence. They will talk to the server to PUT the updated projectItems.
  // There is a bit of error handling here. See, react-grid-layout doesn't wait for this to resolve, it just
  // mutates the data directly. So, in case of a fail, it'll use a saved state from when the item was
  // first clicked, and then reset it to that.
  let oldLayout
  const handleLayoutChange = async (layout) => {
    console.log('hi')
    try {
      console.log('Changing Layout! ', layout)
      await axios.put("/api/projects/items", { projectId, layout });
      oldLayout = layout
    } catch (error) {
      console.log("Error in PUT/api/projects: ", error);
      dispatch({ type: "SET_PROJECT_ITEMS", payload: oldLayout });
    }
  };

  //This is for handling the Drawer that adds items.
  const { isOpen, onOpen, onClose } = useDisclosure();

  // This is for setting edit mode.
  const handleEditButtonClick = () => {
    dispatch({ type: "SET_IS_EDITING", payload: !isEditing });
  };
  const isEditing = useSelector((store) => store.isEditing);

  return (
    <>
      <ResponsiveGridLayout
        className="layout"
        compactType={null}
        layout={projectItems}
        cols={{ lg: 10, md: 10, sm: 10, xs: 10, xxs: 10 }}
        rowHeight={100}
        onDragStart={(layout) => oldLayout= layout}
        onDragEnd={handleLayoutChange}
        isDraggable={isEditing}
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
      {user.id === owner.user_id && (
        <div className="floatingActionButtons">
          {isEditing && (
            <Button size="lg" onClick={onOpen} leftIcon={<AddIcon />}>
              Add New Card
            </Button>
          )}
          <Button
            size="lg"
            leftIcon={<EditIcon />}
            onClick={handleEditButtonClick}
          >
            Toggle Edit
          </Button>
        </div>
      )}
      <AddCards isOpen={isOpen} onClose={onClose} projectId={projectId} />
    </>
  );
}
