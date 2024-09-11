import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Container,
  Heading,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { forwardRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PopoverCardEditForm from "./PopoverCardEditForm/PopoverCardEditForm";
import DeleteModal from "./DeleteModal/DeleteModal";

const titleCard = forwardRef(function TitleCard(
  { item, style, className, onMouseDown, onMouseUp, onTouchEnd },
  ref
) {
  const dispatch = useDispatch();

  // Delete Modal Stuff
  const handleDelete = () => {
    dispatch({ type: "DELETE_CARD", payload: item.i });
    setIsDeleteModalOpen(false);
  };
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Edit Form Stuff
  const isEditing = useSelector((store) => store.isEditing);
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
      <Container backgroundColor={item.bg_color} centerContent>
        <Heading>{item.card_settings.text}</Heading>
        <PopoverCardEditForm item={item} isOpen={isOpen} onClose={onClose} />
        <DeleteModal
          isOpen={isDeleteModalOpen}
          handleDelete={handleDelete}
          onCancelFn={() => {
            setIsDeleteModalOpen(false);
          }}
        />
      </Container>
      {isEditing && (
        <>
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
        </>
      )}
    </div>
  );
});

export default titleCard;
