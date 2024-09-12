import {
  Card,
  CardBody,
  CardHeader,
  Center,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";

export default function TMDBResultItem({ result }) {
  const profilePathImageUrl = "http://image.tmdb.org/t/p/w185";
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
            <Image src={profilePathImageUrl + result.profile_path} />
          )}
          {result.poster_path && (
            <Image src={profilePathImageUrl + result.poster_path} />
          )}
        </Center>
      </CardBody>
    </Card>
  );
}
