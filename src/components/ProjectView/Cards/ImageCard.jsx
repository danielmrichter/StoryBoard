import { EditIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Image,
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
  const { projectId } = useParams();
  const isEditing = useSelector((store) => store.isEditing);
  const [backgroundColor, setBackgroundColor] = useState(item.bg_color);
  const handleOnClick = () => {};
  const handlePopoverClose = () => {
    dispatch({
      type: "SET_CARD_SETTINGS",
      payload: {
        id: item.i,
        settings: { ...item.card_settings },
        backgroundColor,
        projectId,
      },
    });
  };
  const { isOpen, onToggle, onClose } = useDisclosure();
  return (
    <div
      className={className}
      onMouseDown={!isEditing ? onMouseDown : undefined}
      onMouseUp={!isEditing ? onMouseUp : undefined}
      onTouchEnd={onTouchEnd}
      onClick={isEditing ? handleOnClick : undefined}
      ref={ref}
      key={item.i}
      style={{ ...style, backgroundColor: item.bg_color }}
      data-grid={{ w: item.w, i: item.i, x: item.x, y: item.y, h: item.h }}
    >
      <Popover isOpen={isOpen} onClose={handlePopoverClose} closeOnBlur={true}>
        <Image src={item.card_settings.img_url} />
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
  );
});

export default textCard;
