import { Link } from "react-router-dom";
import "./Header.css";
import {
  Center,
  IconButton,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import NavBar from "../NavBar/NavBar";

export default function Header() {
  // These two are for controlling the popout nav menu (a ChakraUI Drawer).
  // Has to live here so that the hamburger menu button can control it.
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <SimpleGrid className="header" columns={3}>
        <div>
          <IconButton
            onClick={onOpen}
            size="lg"
            colorScheme="transparent"
            icon={<HamburgerIcon />}
          />
        </div>
        <Center>
          <Link to="/home">
            <h2 className="nav-title">StoryBoard</h2>
          </Link>
        </Center>
      </SimpleGrid>
      <NavBar isOpen={isOpen} onClose={onClose} />
    </>
  );
}
