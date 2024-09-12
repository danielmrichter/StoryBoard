import { useDispatch } from "react-redux";
import {
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
} from "@chakra-ui/react";

// Currently, this exports a Drawer that has buttons to add stuff.
// In the future, I want this to also have drag and drop ability.

export default function AddCards({ isOpen, onClose, projectId }) {
  const dispatch = useDispatch();
  const handleClick = (cardType) => {
    dispatch({ type: "ADD_CARD", payload: { cardType, projectId } });
  };
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Add a New Card</DrawerHeader>
        <Button
          onClick={() => {
            handleClick("text");
            onClose();
          }}
        >
          Text
        </Button>
        <Button
          onClick={() => {
            handleClick("image");
            onClose();
          }}
        >
          Image
        </Button>
        <Button
          onClick={() => {
            handleClick("title");
            onClose();
          }}
        >
          Title
        </Button>
      </DrawerContent>
    </Drawer>
  );
}
