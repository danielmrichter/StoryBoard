import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormLabel,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spinner,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TMDBResultItem from "./TMDBResultItem/TMDBResultItem";

export default function TMDBSearchForm() {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch({ type: "SEARCH_TMDB", payload: searchText });
    onOpen();
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const tmdbSearchResults = useSelector((store) => store.tmdbSearchResults);
  useEffect(() => {
    console.log("tmdbSearchResults is: ", tmdbSearchResults);
  }, [tmdbSearchResults]);
  return (
    <>
      <FormLabel htmlFor="">Search TMDB's Api: </FormLabel>
      <Input
        placeholder="Search"
        id="TMDBSearch"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Button onClick={handleSearch}>Search</Button>
      <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Search Results</DrawerHeader>
          <DrawerCloseButton />
          <DrawerBody>
            <Stack>
              {tmdbSearchResults.length === 0 ? (
                <Spinner />
              ) : (
                tmdbSearchResults.map((result) => {
                  return <TMDBResultItem result={result} />;
                })
              )}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
