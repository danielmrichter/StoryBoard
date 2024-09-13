import { useState } from "react";
import {
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Popover,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  Textarea,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useDispatch } from "react-redux";
import TMDBSearchForm from "./TMDBSearchForm/TMDBSearchForm";

export default function PopoverCardEditForm({ onClose, isOpen, item }) {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const [bodyTextInput, setBodyTextInput] = useState(
    item.card_settings.text || ""
  );
  const [imageUrlInput, setImageUrlInput] = useState(
    item.card_settings.img_url || ""
  );
  const [cardHeaderInput, setCardHeaderInput] = useState(
    item.card_header || ""
  );
  const [backgroundColor, setBackgroundColor] = useState(
    item.bg_color || "#FFFFFF"
  );
  const [widthInput, setWidthInput] = useState(item.w);
  const [heightInput, setHeightInput] = useState(item.h);
  const [titleTextInput, setTitleTextInput] = useState(
    item.card_settings.titleText || ""
  );
  const handlePopoverClose = () => {
    dispatch({
      type: "SET_CARD_SETTINGS",
      payload: {
        cardHeader: cardHeaderInput,
        id: item.i,
        settings: {
          ...item.card_settings,
          text: bodyTextInput,
          image_url: imageUrlInput,
          titleText: titleTextInput
        },
        backgroundColor,
        projectId,
        h: heightInput,
        w: widthInput,
      },
    });
  };

  return (
    <Popover zIndex={999} isOpen={isOpen} onClose={handlePopoverClose} closeOnBlur={true}>
      <PopoverContent>
        <PopoverHeader>Edit Contents</PopoverHeader>
        <PopoverCloseButton
          onClick={() => {
            handlePopoverClose();
            onClose();
          }}
        />
        {item.card_type !== "title" && (
          <>
            <FormLabel htmlFor="cardHeader">Header Text:</FormLabel>
            <Input
              id="cardHeader"
              value={cardHeaderInput}
              onChange={(e) => setCardHeaderInput(e.target.value)}
              placeholder="Header"
            />
          </>
        )}
        {item.card_type === 'tmdb' && (
          <TMDBSearchForm projectId={projectId} item={item} />
        )}
        {item.card_type === "title" && (
          <>
            <FormLabel htmlFor="titleText">Title Text:</FormLabel>
            <Input
              id="titleText"
              value={titleTextInput}
              onChange={(e) => setTitleTextInput(e.target.value)}
            />
          </>
        )}
        {item.card_type === "text" && (
          <>
            <FormLabel htmlFor="bodyText">Body Text:</FormLabel>
            <Textarea
              id="bodyText"
              value={bodyTextInput}
              onChange={(e) => setBodyTextInput(e.target.value)}
            />
          </>
        )}

        {item.card_type === "image" && (
          <>
            <FormLabel htmlFor="imgUrl">Image URL: </FormLabel>
            <Input
              id="imgUrl"
              type="url"
              value={imageUrlInput}
              onChange={(e) => setImageUrlInput(e.target.value)}
            />
          </>
        )}
        <FormLabel htmlFor="colorSelect">Background Color: </FormLabel>
        <input
          id="colorSelect"
          type="color"
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)}
        />
        <FormLabel htmlFor="widthInput">Set the Width (1-10)</FormLabel>
        <NumberInput
          id="widthInput"
          size="md"
          value={widthInput}
          min={1}
          max={10}
          onChange={(e) => setWidthInput(e)}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <FormLabel htmlFor="heightInput">Set the Height (1-10)</FormLabel>
        <NumberInput
          id="heightInput"
          size="md"
          value={heightInput}
          min={1}
          max={10}
          onChange={(e) => setHeightInput(e)}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </PopoverContent>
    </Popover>
  );
}
