import { Link as ReactRouterLink } from "react-router-dom";
import {
AbsoluteCenter,
  Link as ChakraLink,
  DrawerFooter,
  Stack,
} from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  Divider,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import LogOutButton from "../LoginComponents/LogOutButton/LogOutButton";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import "./NavBar.css";

export default function NavBar({ isOpen, onClose }) {
  const { pathname } = useLocation();
  const user = useSelector((store) => store.user);
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Navigation</DrawerHeader>
        <DrawerBody>
          <AbsoluteCenter>
            <Stack alignItems='center' justifyContent='space-around'>
              <div>
                <ChakraLink
                  as={ReactRouterLink}
                  className={pathname === "/about" ? "active" : "stackElement"}
                  to="/about"
                  onClick={onClose}
                >
                  About
                </ChakraLink>
              </div>
              {!user.id && (
                // If there's no user, show login/registration links
                <div>
                  <ChakraLink
                    as={ReactRouterLink}
                    className={
                      pathname === "/login" ? "active" : "stackElement"
                    }
                    to="/login"
                    onClick={onClose}
                  >
                    Login / Register
                  </ChakraLink>
                </div>
              )}
              {/* If a user is logged in, show these links */}
              {user.id && (
                <div>
                  <ChakraLink
                    as={ReactRouterLink}
                    className={
                      pathname === "/projects" ? "active" : "stackElement"
                    }
                    to="/projects"
                    onClick={onClose}
                  >
                    Projects
                  </ChakraLink>
                  <Divider />
                </div>
              )}
            </Stack>
          </AbsoluteCenter>
        </DrawerBody>
        <DrawerFooter>
          {user.id && <LogOutButton />}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
