import { forwardRef } from "react";

const textCard = forwardRef(function TextCard(
  { item, style, className, onMouseDown, onMouseUp, onTouchEnd },
  ref
) {
  return (
    <div
      className={className}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchEnd={onTouchEnd}
      ref={ref}
      key={item.i}
      style={{ ...style, backgroundColor: item.bg_color }}
      data-grid={{ w: item.w, i: item.i, x: item.x, y: item.y, h: item.h }}
    >
      <h1>{item.i}</h1>
    </div>
  );
});

export default textCard;
