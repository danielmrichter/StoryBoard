import { EditIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  IconButton,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { forwardRef} from "react";
import PopoverCardEditForm from "./PopoverBody/PopoverCardEditForm";

const textCard = forwardRef(function TextCard(
  { item, style, className, onMouseDown, onMouseUp, onTouchEnd },
  ref
) {
  const { isOpen, onToggle, onClose } = useDisclosure();
  return (
    <div
      className={className}
      onMouseDown={isOpen ? undefined : onMouseDown}
      onMouseUp={isOpen ? undefined : onMouseUp}
      onTouchEnd={onTouchEnd}
      ref={ref}
      key={item.i}
      style={{ ...style, backgroundColor: item.bg_color }}
      data-grid={{ w: item.w, i: item.i, x: item.x, y: item.y, h: item.h }}
    >
      <Card>
        {item.card_header && (
          <CardHeader>
            <Text fontSize="lg">{item.card_header}</Text>
          </CardHeader>
        )}
        <CardBody>
          <Image src={item.card_settings.img_url} />
        </CardBody>
        <CardFooter>
          <IconButton
            zIndex={1}
            onClick={onToggle}
            size="sm"
            icon={<EditIcon />}
          />
          <PopoverCardEditForm item={item} isOpen={isOpen} onClose={onClose} />
        </CardFooter>
      </Card>
    </div>
  );
});

export default textCard;
