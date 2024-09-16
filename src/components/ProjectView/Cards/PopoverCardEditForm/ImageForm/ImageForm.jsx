import { Button, FormLabel, Input } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

export default function ImageForm({ setImageFileUploadInput }) {
  const dispatch = useDispatch();
  const imageUrlInput = useSelector((store) => store.imageUrlInput);
  const isUsingUrl = useSelector((store) => store.isUsingImageUrl);
  const handleUrlToFileToggle = (e) => {
    e.preventDefault();
    dispatch({ type: "TOGGLE_IS_USING_IMAGE_URL" });
  };

  return (
    <>
      <Button onClick={handleUrlToFileToggle}>
        {isUsingUrl ? "Switch To File Upload" : "Switch To URL"}
      </Button>
      {isUsingUrl ? (
        <>
          <FormLabel htmlFor="imgUrl">Image URL: </FormLabel>
          <Input
            id="imgUrl"
            type="url"
            placeholder="Image URL"
            value={imageUrlInput}
            onChange={(e) =>
              dispatch({ type: "SET_IMAGE_URL_INPUT", payload: e.target.value })
            }
          />
        </>
      ) : (
        <>
          <FormLabel htmlFor="fileInput">Upload Image: </FormLabel>
          <Input
            id="fileInput"
            type="file"
            onChange={(e) => setImageFileUploadInput(e.target.files[0])}
          />
        </>
      )}
    </>
  );
}
