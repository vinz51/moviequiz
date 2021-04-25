import * as ActionsTypes from "./constants";

export const initialState = {
  movies: null,
  moviesLoading: false,
  moviesErrors: null,
  moviesIdUsed: [],
  currentMovie: -1,
  currentMovieLoading: false,
  casts: null,
  castsLoading: false,
  castsError: null,
};

const tmb = (state = initialState, action) => {
  switch (action?.type) {
    case ActionsTypes.MOVIES_LOADING:
      return { ...state, moviesLoading: !state.moviesLoading };
    case ActionsTypes.MOVIES_FETCH_SUCCESS:
      return {
        ...state,
        movies: { ...(state.movies || {}), ...action.movies },
        moviesErrors: null,
      };
    case ActionsTypes.MOVIES_FETCH_FAILURE:
      return { ...state, moviesErrors: action.message };
    case ActionsTypes.MOVIES_SET_CURRENT_LOADING:
      return { ...state, currentMovieLoading: !state.currentMovieLoading };
    case ActionsTypes.MOVIES_SET_CURRENT: {
      const newMoviesIdUsed = [...state.moviesIdUsed];

      if (!newMoviesIdUsed.includes(action.id)) {
        newMoviesIdUsed.push(action.id);
      }

      return {
        ...state,
        currentMovie: action.id,
        moviesIdUsed: newMoviesIdUsed,
      };
    }
    case ActionsTypes.MOVIES_SET_CASTS: {
      const newMoviesCastAndCrew = Object.keys(action.casts).reduce(
        (accumulator, key) => {
          accumulator[key] = { ...state.movies[key], ...action.casts[key] };
          return accumulator;
        },
        {}
      );
      return { ...state, movies: { ...state.movies, ...newMoviesCastAndCrew } };
    }
    case ActionsTypes.MOVIES_CASTS_LOADING:
      return { ...state, castsLoading: !state.castsLoading };
    case ActionsTypes.MOVIES_CASTS_SET: {
      const newCasts = {
        ...(state.casts || {}),
        ...action.casts,
      };
      return { ...state, casts: newCasts };
    }
    case ActionsTypes.MOVIES_CASTS_FAILURE:
      return { ...state, castsError: action.message };
    default:
      return state;
  }
};

export default tmb;
