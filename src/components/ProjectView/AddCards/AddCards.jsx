import { useDispatch } from "react-redux";
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
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
  const cards = [
    {
      i: "text",
      x: 1,
      y: 1,
      h: 1,
      w: 1,
    },
  ];
  return (
    // <ResponsiveGridLayout
    //     className="layout"
    //     breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
    //     compactType='vertical'
    //     layout={cards}
    //     cols={{ lg: 1, md: 1, sm: 1, xs: 1, xxs: 1 }}
    //     rowHeight={100}
    //     width={200}
    //   >
    //     {cards.map(card => {
    //         <button style={{backgroundColor: "black"}} key={card.i}>{card.i}</button>
    //     })}
    // </ResponsiveGridLayout>
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
      </DrawerContent>
    </Drawer>
  );
}
