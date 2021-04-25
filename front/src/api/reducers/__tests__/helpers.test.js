import { findExternalActor, retrieveRandomMoviesId } from "../helpers";

describe("Function retrieveRandomMoviesId", () => {
  it("renders a movie", () => {
    expect(
      retrieveRandomMoviesId({
        movies: {
          42: {
            id: 42,
            title: "LOTR",
          },
        },
        moviesIdUsed: [],
      })
    ).toEqual(["42"]);
  });
});

describe("Function findExternalActor", () => {
  it("renders a random cast", () => {
    const foundActor = findExternalActor(
      {
        casts: {
          42: {
            id: 42,
            name: "Sarah Conor",
          },
        },
      },
      { cast: {} }
    );

    expect(foundActor).toEqual(
      expect.objectContaining({
        id: 42,
        name: "Sarah Conor",
      })
    );
  });
});
