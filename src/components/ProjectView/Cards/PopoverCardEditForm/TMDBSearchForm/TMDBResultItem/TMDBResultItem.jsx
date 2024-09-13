import {
  Card,
  CardBody,
  CardHeader,
  Center,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";

export default function TMDBResultItem({ result, onCloseFn, item, projectId }) {
  const profilePathImageUrl = "http://image.tmdb.org/t/p/w185";
  const dispatch = useDispatch();
  const handleTMDBClick = (image_url) => {
    console.log("image_url is: ", image_url);
    dispatch({
      type: "SET_CARD_SETTINGS",
      payload: {
        projectId,
        ...item,
        id: item.i,
        settings: {
          tmdb_id: result.id,
          media_type: result.media_type,
          tmdb_url: image_url,
        },
      },
    });
    onCloseFn();
  };

  return (
    <Card>
      <CardHeader>
        <Center>
          {result.name && (
            <Heading size="sm" as="h6">
              {result.name}
            </Heading>
          )}
          {result.title && (
            <Heading size="sm" as="h6">
              {result.title}
            </Heading>
          )}
        </Center>
      </CardHeader>
      <CardBody>
        <Center>
          {result.profile_path && (
            <Image
              onClick={() =>
                handleTMDBClick(profilePathImageUrl + result.profile_path)
              }
              src={profilePathImageUrl + result.profile_path}
            />
          )}
          {result.poster_path && (
            <Image
              onClick={() =>
                handleTMDBClick(profilePathImageUrl + result.poster_path)
              }
              src={profilePathImageUrl + result.poster_path}
            />
          )}
        </Center>
      </CardBody>
    </Card>
  );
}
