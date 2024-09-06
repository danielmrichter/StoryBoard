import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateProjectForm from "../CreateProjectForm/CreateProjectForm";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
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
  Spacer,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import ProjectItem from "./ProjectItem";

export default function Projects() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "FETCH_PROJECTS" });
  }, []);
  const user = useSelector((store) => store.user);
  const projects = useSelector((store) => store.projects);
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  return (
    <Flex direction="column">
      <CreateProjectForm isOpen={isOpen} onClose={onClose} />
      <Flex align="center" direction="column">
        {projects.map((project) => (
          <ProjectItem key={project.id} project={project}/>
          ))}
      </Flex>
      <Spacer />
      <Button alignSelf="flex-end" onClick={onOpen}>
        New Project
      </Button>
    </Flex>
  );
}
