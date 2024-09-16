import { useEffect, useState } from "react";
import {
  Button,
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
  PopoverFooter,
  PopoverHeader,
  Textarea,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TMDBSearchForm from "./TMDBSearchForm/TMDBSearchForm";
import ImageForm from "./ImageForm/ImageForm";

export default function PopoverCardEditForm({ onClose, isOpen, item }) {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (item.card_settings.img_url) {
      dispatch({
        type: "SET_IMAGE_URL_INPUT",
        payload: item.card_settings.img_url,
      });
    }
  }, [item]);
  const isUsingImageUrl = useSelector((store) => store.isUsingImageUrl);
  const imageUrlInput = useSelector((store) => store.imageUrlInput);

  const [imageFileUploadInput, setImageFileUploadInput] = useState(null);
  const [bodyTextInput, setBodyTextInput] = useState(
    item.card_settings.text || ""
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
    item.card_type !== "image"
      ? dispatch({
          type: "SET_CARD_SETTINGS",
          payload: {
            cardHeader: cardHeaderInput,
            id: item.i,
            settings: {
              ...item.card_settings,
              text: bodyTextInput,
              titleText: titleTextInput,
            },
            backgroundColor,
            projectId,
            h: heightInput,
            w: widthInput,
          },
        })
      : isUsingImageUrl
      ? dispatch({
          type: "SET_CARD_SETTINGS",
          payload: {
            cardHeader: cardHeaderInput,
            id: item.i,
            settings: {
              ...item.card_settings,
              text: bodyTextInput,
              img_url: imageUrlInput,
            },
            backgroundColor,
            projectId,
            h: heightInput,
            w: widthInput,
          },
        })
      : dispatch({
          type: "SET_IMAGE_SETTINGS_WITH_UPLOAD",
          payload: {
            cardHeader: cardHeaderInput,
            id: item.i,
            settings: {
              ...item.card_settings,
            },
            backgroundColor,
            projectId,
            h: heightInput,
            w: widthInput,
            file: imageFileUploadInput,
          },
        });
  };

  return (
    <Popover
      zIndex={99999999}
      isOpen={isOpen}
      onClose={handlePopoverClose}
      closeOnBlur={true}
      isLazy
    >
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
        {item.card_type === "tmdb" && (
          <TMDBSearchForm projectId={projectId} item={item} />
        )}
        {item.card_type === "title" && (
          <>
            <FormLabel htmlFor="titleText">Title Text:</FormLabel>
            <Textarea
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
              placeholder="Body"
              id="bodyText"
              value={bodyTextInput}
              onChange={(e) => setBodyTextInput(e.target.value)}
            />
          </>
        )}

        {item.card_type === "image" && (
          <>
            <ImageForm setImageFileUploadInput={setImageFileUploadInput} />
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
        <PopoverFooter>
          <Button
            onClick={() => {
              handlePopoverClose();
              onClose();
            }}
          >
            Save And Close
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
