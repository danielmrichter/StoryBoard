import { forwardRef } from "react";
import TextCard from "../Cards/TextCard";
import ImageCard from "../Cards/ImageCard";
import TitleCard from "../Cards/TitleCard";

const projectCard = forwardRef(function ProjectCard(
  { item, style, className, onMouseDown, onMouseUp, onTouchEnd },
  ref
) {
  switch (item.card_type) {
    case "text":
      return (
        <TextCard
          style={style}
          className={className}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onTouchEnd={onTouchEnd}
          ref={ref}
          key={item.i}
          item={item}
        />
      );
    case "image":
      return (
        <ImageCard
          style={style}
          className={className}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onTouchEnd={onTouchEnd}
          ref={ref}
          key={item.i}
          item={item}
        />
      );
    case "title":
      return (
        <TitleCard
          style={style}
          className={className}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onTouchEnd={onTouchEnd}
          ref={ref}
          key={item.i}
          item={item}
        />
      );
    default:
      <></>;
  }
});

export default projectCard;
