import * as ActionsTypes from "../constants";
import reducer, { initialState } from "../";

describe("TMB reducer", () => {
  it("renders default", () => {
    expect(reducer()).toEqual(initialState);
  });

  describe("Loading actions", () => {
    it.each([
      [ActionsTypes.MOVIES_LOADING, { moviesLoading: true }],
      [ActionsTypes.MOVIES_SET_CURRENT_LOADING, { currentMovieLoading: true }],
      [ActionsTypes.MOVIES_CASTS_LOADING, { castsLoading: true }],
    ])("loads ressources from %type", (type, expected) => {
      expect(reducer(initialState, { type })).toEqual(
        expect.objectContaining(expected)
      );
    });
  });

  describe("Failed actions", () => {
    const options = { message: "Error during the call" };

    it.each([
      [
        ActionsTypes.MOVIES_FETCH_FAILURE,
        { moviesErrors: "Error during the call" },
      ],
      [
        ActionsTypes.MOVIES_CASTS_FAILURE,
        { castsError: "Error during the call" },
      ],
    ])("loads ressources from %type", (type, expected) => {
      expect(reducer(initialState, { type, ...options })).toEqual(
        expect.objectContaining(expected)
      );
    });
  });

  it("success the fetch movies", () => {
    const reducerData = reducer(initialState, {
      type: ActionsTypes.MOVIES_FETCH_SUCCESS,
      movies: { 42: { id: 42, title: "The Lord of the Rings" } },
    });

    expect(reducerData).toEqual(
      expect.objectContaining({
        movies: { 42: { id: 42, title: "The Lord of the Rings" } },
        moviesErrors: null,
      })
    );
  });

  describe("Current movie", () => {
    it("sets the current movie for the first time", () => {
      expect(
        reducer(initialState, {
          type: ActionsTypes.MOVIES_SET_CURRENT,
          id: "42",
        })
      ).toEqual(
        expect.objectContaining({
          currentMovie: "42",
          moviesIdUsed: ["42"],
        })
      );
    });

    it("sets current movie without pushing a new time in array", () => {
      const currentState = { ...initialState, moviesIdUsed: ["42"] };

      expect(
        reducer(currentState, {
          type: ActionsTypes.MOVIES_SET_CURRENT,
          id: "42",
        })
      ).toEqual(
        expect.objectContaining({
          currentMovie: "42",
          moviesIdUsed: ["42"],
        })
      );
    });
  });

  it("sets casts on specific movies", () => {
    const currentState = {
      ...initialState,
      movies: {
        42: {
          id: "42",
          title: "LOTR",
        },
        666: {
          id: "666",
          title: "Star Wars The return of the jedi",
        },
      },
    };

    expect(
      reducer(currentState, {
        type: ActionsTypes.MOVIES_SET_CASTS,
        casts: {
          42: {
            cast: {
              350: {
                id: "340",
                name: "Sean Bean",
              },
            },
            crew: {},
          },
        },
      })
    ).toEqual(
      expect.objectContaining({
        movies: {
          42: {
            id: "42",
            title: "LOTR",
            cast: {
              350: {
                id: "340",
                name: "Sean Bean",
              },
            },
            crew: {},
          },
          666: {
            id: "666",
            title: "Star Wars The return of the jedi",
          },
        },
      })
    );
  });

  it("sets the popular casts", () => {
    expect(
      reducer(initialState, {
        type: ActionsTypes.MOVIES_CASTS_SET,
        casts: {
          350: {
            id: "340",
            name: "Sean Bean",
          },
        },
      })
    ).toEqual(
      expect.objectContaining({
        casts: {
          350: {
            id: "340",
            name: "Sean Bean",
          },
        },
      })
    );
  });
});
