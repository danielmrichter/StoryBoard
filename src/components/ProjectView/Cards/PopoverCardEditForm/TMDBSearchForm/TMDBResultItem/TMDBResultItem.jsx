import { useEffect } from "react";

export default function TMDBResultItem({ result }) {
  useEffect(() => {
    console.log("TMDB Result item: ", result);
  }, []);

  return (
    <div>
      <p>{result.id}</p>
    </div>
  );
}
