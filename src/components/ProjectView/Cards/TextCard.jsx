import { Input, Text } from "@chakra-ui/react";
import { forwardRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const textCard = forwardRef(function TextCard(
  { item, style, className, onMouseDown, onMouseUp, onTouchEnd },
  ref
) {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState(item.card_settings.text);
  const isEditing = useSelector((store) => store.isEditing);
  const { projectId } = useParams();
  const handleTextChange = (e) => {
    dispatch({
      type: "SET_CARD_SETTINGS",
      payload: {
        id: item.i,
        settings: { ...item.card_settings, text: e.target.value },
        projectId
      },
    });
    setInputValue(e.target.value);
  };
  return (
    <div
      className={className}
      onMouseDown={!isEditing ? onMouseDown : undefined}
      onMouseUp={!isEditing ? onMouseUp : undefined}
      onTouchEnd={onTouchEnd}
      ref={ref}
      key={item.i}
      style={{ ...style, backgroundColor: item.bg_color }}
      data-grid={{ w: item.w, i: item.i, x: item.x, y: item.y, h: item.h }}
    >
      {isEditing && (
        <Input
          onChange={handleTextChange}
          variant="unstyled"
          value={inputValue}
        />
      )}
      {!isEditing && <Text>{item.card_settings.text}</Text>}
    </div>
  );
});

export default textCard;
