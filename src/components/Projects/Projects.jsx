import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateProjectForm from "../CreateProjectForm/CreateProjectForm";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Flex, Spacer, useDisclosure } from "@chakra-ui/react";
import ProjectItem from "./ProjectItem";
import './Projects.css'
import { AddIcon } from "@chakra-ui/icons";

export default function Projects() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "FETCH_PROJECTS" });
  }, []);
  const projects = useSelector((store) => store.projects);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex direction="column">
        <CreateProjectForm isOpen={isOpen} onClose={onClose} />
        <Flex align="center" direction="column">
          {projects.map((project) => (
            <ProjectItem key={project.id} project={project} />
          ))}
        </Flex>
        <Spacer />
      </Flex>
      <div className="newProjectButton">
        <Button leftIcon={< AddIcon/>} onClick={onOpen}>
          New Project
        </Button>
      </div>
    </>
  );
}
