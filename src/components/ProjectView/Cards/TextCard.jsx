import { EditIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Input,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { forwardRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const textCard = forwardRef(function TextCard(
  { item, style, className, onMouseDown, onMouseUp, onTouchEnd },
  ref
) {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState(item.card_settings.text);
  const [backgroundColor, setBackgroundColor] = useState(item.bg_color);
  const { projectId } = useParams();
  const handlePopoverClose = () => {
    dispatch({
      type: "SET_CARD_SETTINGS",
      payload: {
        id: item.i,
        settings: { ...item.card_settings, text: inputValue },
        backgroundColor,
        projectId,
      },
    });
  };
  const { isOpen, onToggle, onClose } = useDisclosure();
  return (
    <>
      <div
        className={className}
        onMouseDown={isOpen ? undefined : onMouseDown}
        onMouseUp={isOpen ? undefined : onMouseUp}
        onDoubleClick={() => console.log("double click")}
        onTouchEnd={onTouchEnd}
        ref={ref}
        key={item.i}
        style={{ ...style, backgroundColor: item.bg_color }}
        data-grid={{ w: item.w, i: item.i, x: item.x, y: item.y, h: item.h }}
      >
        <Popover isOpen={isOpen} onClose={handlePopoverClose} closeOnBlur={true}>
          <Text>{item.card_settings.text}</Text>
          <PopoverTrigger>
            <IconButton
              zIndex={1}
              onClick={onToggle}
              size="sm"
              icon={<EditIcon />}
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>Edit Contents</PopoverHeader>
            <PopoverCloseButton
              onClick={() => {
                handlePopoverClose();
                onClose();
              }}
            />
            <PopoverBody>
              <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Text>Background Color: </Text>
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
              />
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
});

export default textCard;
