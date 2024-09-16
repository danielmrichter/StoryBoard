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

const TMDBCard = forwardRef(function TMDBCard(
  { item, style, className, onMouseDown, onMouseUp, onTouchEnd },
  ref
) {
  const dispatch = useDispatch();
  // Edit Form Stuff
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { projectId } = useParams();

  // Delete Modal Stuff
  const handleDelete = () => {
    dispatch({ type: "DELETE_CARD", payload: {id: item.i, projectId} });
    setIsDeleteModalOpen(false);
  };
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // External URL Stuff
  const handleRedirectClick = () => {
    const url = `https://www.themoviedb.org/${item.card_settings.media_type}/${item.card_settings.tmdb_id}`
    !isEditing && window.open(url , '_blank').focus()
  }

  const isEditing = useSelector((store) => store.isEditing);
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
      <Card  bgColor={item.bg_color}>
        {item.card_header && (
          <CardHeader>
            <Container centerContent>
              <Heading as="h5" size="md">
                {item.card_header}
              </Heading>  
            </Container>
          </CardHeader>
        )}
        <CardBody onClick={handleRedirectClick}>
          {item.card_settings.tmdb_url ? (
            <Image src={item.card_settings.tmdb_url} />
          ) : <Text>Click the Edit button to link to TMDB!</Text>}
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
        )}
      </Card>
    </div>
  );
});

export default TMDBCard;
