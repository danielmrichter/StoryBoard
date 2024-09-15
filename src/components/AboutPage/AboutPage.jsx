import {
  Flex,
  Heading,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";

function AboutPage() {
  return (
    <Flex direction="column" align="center" justify="center">
      <Heading>Technologies Used</Heading>
      <br />
      <List spacing="3">
        <ListItem>
          <Text fontSize="3xl">React</Text>
        </ListItem>
        <ListItem>
          <Text fontSize="3xl">Node.JS</Text>
        </ListItem>
        <ListItem>
          <Text fontSize="3xl">Express</Text>
        </ListItem>
        <ListItem>
          <Text fontSize="3xl">Redux</Text>
        </ListItem>
        <ListItem>
          <Text fontSize="3xl">Redux-Saga</Text>
        </ListItem>
        <ListItem>
          <Text fontSize="3xl">PostGreSQL</Text>
        </ListItem>
        <ListItem>
          <Text fontSize="3xl">Chakra-UI</Text>
        </ListItem>
        <ListItem>
          <Text fontSize="3xl">Amazon S3</Text>
        </ListItem>
      </List>
    </Flex>
  );
}

export default AboutPage;
