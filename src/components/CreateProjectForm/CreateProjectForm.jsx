import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CreateProjectForm({ isOpen, onClose }) {
  const [projectName, setProjectName] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_PROJECT", payload: { projectName, user } });
    setProjectName("");
  };
  const firstField = useRef();

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      initialFocusRef={firstField}
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Add A New Project</DrawerHeader>
        <DrawerBody>
          <Stack>
            <Box onSubmit={handleSubmit}>
              <FormLabel htmlFor="projectName">
                <Text>Project Name:</Text>
              </FormLabel>
              <Input
                ref={firstField}
                id="projectName"
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </Box>
          </Stack>
          <DrawerFooter>
            <Button
              mr={5}
              onClick={(e) => {
                handleSubmit(e);
                onClose();
              }}
            >
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </DrawerFooter>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
