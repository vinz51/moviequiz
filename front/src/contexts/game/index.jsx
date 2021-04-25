import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import PropTypes from "prop-types";

import { retrieveRandomMoviesId } from "../../api/reducers/helpers";
import TMBContext from "../tmb";

const GameContext = createContext(null);

const alea = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1];
let currentAlea;

export const GameProvider = ({ children }) => {
  const [randomMovies, setRandomMovies] = useState(null);
  const [historic, setHistoric] = useState([]);
  const {
    fetchNextCasts,
    fetchNextMovies,
    fetchManyCastsByMoviesIds,
    state,
    setNextCurrentMovie,
  } = useContext(TMBContext);

  useEffect(() => {
    fetchNextCasts();
    fetchNextMovies();
  }, [fetchNextCasts, fetchNextMovies]);

  const initializeGame = useCallback(() => {
    if (state.movies) {
      // Let's get fifty/fifty win/lose and sort the array
      currentAlea = alea.sort(() => Math.random() - 0.5);

      // We find the next
      const newRandomMovies = retrieveRandomMoviesId(state);

      // We fetch all the casts and crews from the movie
      fetchManyCastsByMoviesIds(newRandomMovies);

      const moviesToPlayWith = newRandomMovies.map((id, index) => ({
        id,
        needToWin: Boolean(currentAlea[index]),
      }));

      // We set the new randoms movies
      setRandomMovies(moviesToPlayWith);

      // Cleans the historic
      setHistoric([]);

      // We set the first movie to start the game
      setNextCurrentMovie(newRandomMovies[0]);
    }
  }, [state, fetchManyCastsByMoviesIds, setNextCurrentMovie]);

  const addHistoric = useCallback((historic) => {
    setHistoric((previousHistoric) => [...previousHistoric, historic]);
  }, []);

  return (
    <GameContext.Provider
      value={{
        initializeGame,
        randomMovies,
        addHistoric,
        historic,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

GameProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GameContext;
