import { forwardRef, useEffect } from "react";
import TextCard from "../Cards/TextCard";

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
      case 'image':
        return(
          <img ref={ref} src="https://pyxis.nymag.com/v1/imgs/09c/923/65324bb3906b6865f904a72f8f8a908541-16-spongebob-explainer.2x.rhorizontal.w700.jpg">
          </img>
        )
    default:
      <></>;
  }
});

export default projectCard;
