import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateProjectForm from "../CreateProjectForm/CreateProjectForm";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Card, CardBody, Flex, Spacer, Text, useDisclosure } from "@chakra-ui/react";

export default function Projects() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "FETCH_PROJECTS" });
  }, []);
  const user = useSelector((store) => store.user);
  const projects = useSelector((store) => store.projects);
  const history = useHistory();
  const handleProjectView = (id) => {
    history.push(`/projectview/${id}`);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex direction='column'>
      <CreateProjectForm isOpen={isOpen} onClose={onClose} />
      <Flex align='flex-end' direction='column' >
        {projects.map((project) => (
          <Card
            m={5}
            size='sm'
            variant='filled'
            direction="row"
            key={project.id}
            onClick={() => handleProjectView(project.id)}
          >
            <CardBody>
              <Text>{project.project_name}</Text>
            </CardBody>
          </Card>
        ))}
      </Flex>
      <Spacer />
      <Button alignSelf='flex-end' onClick={onOpen}>New Project</Button>
    </Flex>
  );
}
