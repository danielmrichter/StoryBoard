import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { forwardRef, useState } from "react";
import PopoverCardEditForm from "./PopoverBody/PopoverCardEditForm";
import { useDispatch } from "react-redux";
import DeleteModal from "./DeleteModal/DeleteModal";

const textCard = forwardRef(function TextCard(
  { item, style, className, onMouseDown, onMouseUp, onTouchEnd },
  ref
) {
  const dispatch = useDispatch();
  // Delete Modal Stuff
  const handleDelete = () => {
    dispatch({ type: "DELETE_CARD", payload: item.i });
    setIsDeleteModalOpen(false)
  };
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Edit Form Stuff
  const { isOpen, onToggle, onClose } = useDisclosure();
  return (
    <div
      className={className}
      onMouseDown={isOpen ? undefined : onMouseDown}
      onMouseUp={isOpen ? undefined : onMouseUp}
      onTouchEnd={onTouchEnd}
      ref={ref}
      key={item.i}
      style={style}
      data-grid={{ w: item.w, i: item.i, x: item.x, y: item.y, h: item.h }}
    >
      <Card bgColor={item.bg_color }>
        {item.card_header && (
          <CardHeader>
            <Text fontSize="lg">{item.card_header}</Text>
          </CardHeader>
        )}
        <CardBody>
          <Text>{item.card_settings.text}</Text>
          <PopoverCardEditForm item={item} isOpen={isOpen} onClose={onClose} />
          <DeleteModal
            isOpen={isDeleteModalOpen}
            handleDelete={handleDelete}
            onCancelFn={() => {
              setIsDeleteModalOpen(false);
            }}
          />
        </CardBody>
        <CardFooter>
          <IconButton
            zIndex={1}
            onClick={onToggle}
            size="sm"
            icon={<EditIcon />}
            mr={2}
          />
          <IconButton
            size="sm"
            icon={<DeleteIcon />}
            zIndex={1}
            onClick={() => setIsDeleteModalOpen(true)}
          />
        </CardFooter>
      </Card>
    </div>
  );
});

export default textCard;
