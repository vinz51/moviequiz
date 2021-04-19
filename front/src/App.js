import { useCallback, useState } from "react";
import "./App.css";
import Genders from "./pages/genders";
import MoviesList from "./pages/movies/list";
import MoviesManage from "./pages/movies/manage";

function App() {
  const [selectedGender, setSelectedGender] = useState(-1);
  const [selectedMovie, setSelectedMovie] = useState(-1);

  const handleGenderClick = useCallback((event, genderId) => {
    setSelectedGender(genderId);
  }, []);

  return (
    <>
      <Genders onClick={handleGenderClick} />
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
