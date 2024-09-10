import {
  Button,
  Card,
  CardBody,
  CardFooter,
  FormControl,
  FormLabel,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function ProjectItem({ project }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleProjectView = (id) => {
    history.push(`/projectview/${id}`);
  };
  const [projectName, setProjectName] = useState("");
  const handleDelete = (id) => {
    dispatch({ type: "DELETE_PROJECT", payload: id });
  };
  const initialFocusRef = useRef();
  useEffect(() => {
    setProjectName(project.project_name);
  }, []);
  const handleSave = (e) => {
    e.preventDefault();
    dispatch({
      type: "UPDATE_PROJECT_NAME",
      payload: { project: project.id, projectName },
    });
  };
  const { onOpen, onClose, isOpen } = useDisclosure();
  return (
    <Card
      minWidth="50vw"
      m={5}
      size="lg"
      variant="filled"
      direction="row"
      key={project.id}
    >
      <CardBody
        alignContent="center"
        onClick={() => handleProjectView(project.id)}
      >
        <Text>{project.project_name}</Text>
      </CardBody>
      <CardFooter>
        <Stack>
          <Button onClick={() => handleDelete(project.id)}>Delete</Button>
          <Popover
            onOpen={onOpen}
            onClose={onClose}
            isOpen={isOpen}
            initialFocusRef={initialFocusRef}
          >
            <PopoverTrigger>
              <Button>Edit</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader fontWeight="semi-bold">
                Edit Project Details
              </PopoverHeader>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>
                <FormControl>
                  <FormLabel htmlFor="projectName">Project Name</FormLabel>
                  <Input
                    ref={initialFocusRef}
                    id="projectName"
                    variant="filled"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                  <Button
                    onClick={(e) => {
                      handleSave(e);
                      onClose();
                    }}
                  >
                    Save
                  </Button>
                </FormControl>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Stack>
      </CardFooter>
    </Card>
  );
}
