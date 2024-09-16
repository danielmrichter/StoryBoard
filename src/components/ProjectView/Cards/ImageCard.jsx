import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Heading,
  IconButton,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { forwardRef, useState } from "react";
import PopoverCardEditForm from "./PopoverCardEditForm/PopoverCardEditForm";
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "./DeleteModal/DeleteModal";
import { useParams } from "react-router-dom/cjs/react-router-dom";

const textCard = forwardRef(function TextCard(
  { item, style, className, onMouseDown, onMouseUp, onTouchEnd },
  ref
) {
  const dispatch = useDispatch();
  // Edit Form Stuff
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { projectId } = useParams();

  // Delete Modal Stuff
  const handleDelete = () => {
    dispatch({ type: "DELETE_CARD", payload: { id: item.i, projectId } });
    setIsDeleteModalOpen(false);
  };
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const isEditing = useSelector((store) => store.isEditing);

  const handleImageEditClick = () => {
    onToggle();
    if (item.card_settings.img_url) {
      dispatch({
        type: "SET_IMAGE_URL_INPUT",
        payload: item.card_settings.img_url,
      });
    } else {
      dispatch({
        type: "SET_IMAGE_URL_INPUT",
        payload: "",
      });
    }
  };

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
      <Card bgColor={item.bg_color}>
        {item.card_header && (
          <CardHeader>
            <Container centerContent>
              <Heading as="h5" size="md">
                {item.card_header}
              </Heading>
            </Container>
          </CardHeader>
        )}
        <CardBody>
          {item.card_settings.img_url ? (
            <Image src={item.card_settings.img_url} />
          ) : (
            <Text>Click the Edit button to Add an Image!</Text>
          )}
          <PopoverCardEditForm item={item} isOpen={isOpen} onClose={onClose} />
          <DeleteModal
            isOpen={isDeleteModalOpen}
            handleDelete={handleDelete}
            onCancelFn={() => {
              setIsDeleteModalOpen(false);
            }}
          />
        </CardBody>
        {isEditing && (
          <CardFooter>
            <IconButton
              zIndex={1}
              onClick={handleImageEditClick}
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
        )}
      </Card>
    </div>
  );
});

export default textCard;
