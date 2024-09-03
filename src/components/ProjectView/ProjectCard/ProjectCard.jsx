import { forwardRef, useEffect } from "react";
import TextCard from "../Cards/TextCard";

export default function ProjectCard({ item }, ref) {
  useEffect(() => {
    console.log("Hi: ", item.card_type);
  }, []);
  switch (item.card_type) {
    case "text":
      return <TextCard item={item} />;
    default:
      <></>;
  }
}
