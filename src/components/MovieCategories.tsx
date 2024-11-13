import { useFetchGenreMovies } from "@/hooks/useFetchGenreMovies";
import { useEffect, useRef, useState } from "react";
import MovieSlider from "./MovieSlider";

const MovieCategories = () => {
  const genreMovies = useFetchGenreMovies();

  const movieRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (genreMovies.length > 0) {
        let newIndex = focusedIndex;

        if (focusedIndex === null) {
          newIndex = 0;
          handleFocus(newIndex);
          console.log("Init", focusedIndex);
        } else {
          console.log("in switch");

          switch (event.key) {
            case "ArrowUp":
              newIndex = focusedIndex > 0 ? focusedIndex - 1 : 0;
              handleFocus(newIndex);
              break;
            case "ArrowDown":
              newIndex =
                focusedIndex < genreMovies.length - 1 ? focusedIndex + 1 : 0;
              handleFocus(newIndex);
              break;
            default:
              console.log("Do nothing", event.key);
              break;
          }
        }
      }
    };

    const handleFocus = (index: number) => {
      console.log("set focusindex");

      setFocusedIndex(index);

      const focusedElement = movieRefs.current[index];
      if (focusedElement) {
        focusedElement.focus();
        // Scrolls the element into view smoothly
        focusedElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      console.log("Focusing on", genreMovies[index].genreTitle, index);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [focusedIndex, genreMovies]);

  return (
    <div className="snap-container relative">
      {/* <div className="z-1 sticky top-0 h-[40px] w-full bg-blue-500"></div> */}
      {/* <div className=""> */}
      {genreMovies.map((genreMovie, index) => {
        if (genreMovie.movies) {
          return (
            <MovieSlider
              key={genreMovie.genreId}
              genreTitle={genreMovie.genreTitle}
              movies={genreMovie.movies}
              ref={(el) => {
                movieRefs.current[index] = el;
              }}
            />
          );
        }
      })}
      {/* <div className="z-1 sticky bottom-0 h-[40px] w-full bg-blue-500"></div> */}
    </div>
  );
};

export default MovieCategories;
