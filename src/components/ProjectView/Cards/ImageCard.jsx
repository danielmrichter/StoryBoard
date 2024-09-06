import { Image } from "@chakra-ui/react";
import connectPgSimple from "connect-pg-simple";
import { forwardRef } from "react";
import { useSelector } from "react-redux";


const textCard = forwardRef(function TextCard(
    { item, style, className, onMouseDown, onMouseUp, onTouchEnd },
    ref
  ) {
    const isEditing = useSelector((store) => store.isEditing);
    const handleOnClick = () => {
        
    }
    return (
        <div
          className={className}
          onMouseDown={!isEditing ? onMouseDown : undefined}
          onMouseUp={!isEditing ? onMouseUp : undefined}
          onTouchEnd={onTouchEnd}
          onClick={isEditing ? handleOnClick: undefined}
          ref={ref}
          key={item.i}
          style={{ ...style, backgroundColor: item.bg_color }}
          data-grid={{ w: item.w, i: item.i, x: item.x, y: item.y, h: item.h }}
        >
          <Image src={item.card_settings.img_url}/>
        </div>
      );
    });
    
    export default textCard;
    