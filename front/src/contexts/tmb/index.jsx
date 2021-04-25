import { createContext, useCallback, useReducer } from "react";
import PropTypes from "prop-types";

import {
  getMoviesByParams,
  getCastsCrews,
  getCastCrewByMoviesId,
  setCurrentMovie,
} from "../../api/reducers/actions";
import reducer, { initialState } from "../../api/reducers";

const TMBContext = createContext(null);

let moviePage = 0;
let castsPage = 0;

export const TMBProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchNextMovies = useCallback(
    (params = {}) => {
      if (
        !state.movies ||
        state.moviesIdUsed.length >= Object.keys(state.movies || {}).length - 10
      ) {
        ++moviePage;
        getMoviesByParams(dispatch, { ...params, page: moviePage });
      }
    },
    [state, dispatch]
  );

  const fetchNextCasts = useCallback(() => {
    if (!state.casts || moviePage % 2 === 0) {
      ++castsPage;
      getCastsCrews(dispatch, { page: castsPage });
    }
  }, [state, dispatch]);

  const fetchManyCastsByMoviesIds = useCallback(
    (ids = [], options = {}) =>
      getCastCrewByMoviesId(dispatch, { ids, ...options }),
    [dispatch]
  );

  const setNextCurrentMovie = useCallback(
    (id) => setCurrentMovie(dispatch, id),
    [dispatch]
  );

  return (
    <TMBContext.Provider
      value={{
        fetchNextMovies,
        fetchNextCasts,
        fetchManyCastsByMoviesIds,
        state,
        setNextCurrentMovie,
      }}
    >
      {children}
    </TMBContext.Provider>
  );
};

TMBProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TMBContext;
