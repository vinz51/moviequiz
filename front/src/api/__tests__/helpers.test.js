import { buildImageTMBUrl, buildUrl, normalizr } from "../helpers";

describe("Function normalizr", () => {
  it("renders default", () => {
    expect(normalizr()).toEqual({});
  });

  it("renders the formated data", () => {
    expect(
      normalizr([
        {
          id: 42,
          fullName: "Clark Kent",
        },
        {
          id: 666,
          fullName: "Bruce Wayne",
        },
      ])
    ).toEqual(
      expect.objectContaining({
        42: {
          id: 42,
          fullName: "Clark Kent",
        },
        666: {
          id: 666,
          fullName: "Bruce Wayne",
        },
      })
    );
  });
});

describe("Function buildUrl", () => {
  it("renders full url", () => {
    expect(buildUrl("game/play")).toEqual(
      "https://api.themoviedb.org/3/game/play"
    );
  });
});

describe("Function buildImageTMBUrl", () => {
  it("renders full url", () => {
    expect(buildImageTMBUrl("/1a2z3e5t486ecaa2a789bvfd.png")).toEqual(
      "https://image.tmdb.org/t/p/w200/1a2z3e5t486ecaa2a789bvfd.png"
    );
  });
});
