import {
  Flex,
  Heading,
  Image,
  Link,
  List,
  ListItem,
  Spacer,
  Text,
} from "@chakra-ui/react";

function AboutPage() {
  return (
    <Flex direction="column" align="center" justify="center">
      <Heading>About This Site</Heading>
      <br />
      <Text>
        This project was brought about as a{" "}
        <Link href="https://www.primeacademy.io/" isExternal>
          Prime Digital Academy
        </Link>{" "}
        Solo Project.
      </Text>
      <Text>
        I wanted to create something unique, and creative. Something to be
        creative in. I wanted to tackle being able to visually tell stories
        about the creative projects I wanted to work on.
      </Text>
      <Text>I wanted to tell stories, about telling stories.</Text>
      <Text>
        At the end, this is what came out. Play around with it, and I'm excited
        to see what you think.
      </Text>
      <Text>
        Link to the Github Repo:{" "}
        <Link href="https://github.com/danielmrichter/StoryBoard" isExternal>
          Github Repo
        </Link>
      </Text>
      <Text>
        Connect with me on Linked in:{" "}
        <Link
          href="https://www.linkedin.com/in/daniel-richter-5766841b3/"
          isExternal
        >
          LinkedIn
        </Link>
      </Text>
      <Text>Technologies Used:</Text>
      <List>
        <ListItem>
          <Text>React</Text>
        </ListItem>
        <ListItem>
          <Text>Node.JS</Text>
        </ListItem>
        <ListItem>
          <Text>Express</Text>
        </ListItem>
        <ListItem>
          <Text>Redux</Text>
        </ListItem>
        <ListItem>
          <Text>PostGreSQL</Text>
        </ListItem>
        <ListItem>
          <Text>Chakra-UI</Text>
        </ListItem>
        <ListItem>
          <Text>Amazon S3</Text>
        </ListItem>
        <ListItem>
          <Text>TMDB API</Text>
        </ListItem>
      </List>
    </Flex>
  );
}

export default AboutPage;
