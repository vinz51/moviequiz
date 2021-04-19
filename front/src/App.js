import { useCallback, useState } from "react";
import "./App.css";
import Genders from "./pages/genders";
import MoviesList from "./pages/movies/list";
import MoviesManage from "./pages/movies/manage";

function App() {
  const [selectedGender, setSelectedGender] = useState(-1);
  const [selectedMovie, setSelectedMovie] = useState(-1);

  const handleClick = useCallback(() => {
    console.log("handleClick !");
  }, []);

  const handleGenderClick = useCallback((event, genderId) => {
    setSelectedGender(genderId);
  }, []);

  console.log("selectedMovie ", selectedMovie);

  return (
    <>
      <Genders onClick={handleGenderClick} />
      <button onClick={handleClick}>Click to play</button>
      {selectedGender >= 0 && (
        <MoviesList
          gender={selectedGender}
          onClick={(_, movieId) => setSelectedMovie(movieId)}
        />
      )}
      {selectedMovie >= 0 && <MoviesManage id={selectedMovie} />}
    </>
  );
}

export default App;
