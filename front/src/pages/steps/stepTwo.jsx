import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL, API_KEY } from "../../contexts/tmb";
import waterfall from "async/waterfall";
import GameContainer from "../game";

const StepTwo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    waterfall(
      [
        function (callback) {
          axios
            .get(`${BASE_URL}/movie/popular`, {
              params: {
                api_key: API_KEY,
              },
            })
            .then(({ data }) => callback(null, data.results));
        },
        function (movies, callback) {
          axios
            .get(`${BASE_URL}/movie/${movies[8].id}/credits`, {
              params: {
                api_key: API_KEY,
              },
            })
            .then(({ data }) =>
              callback(null, {
                movie: movies[8],
                movieId: movies[7].id,
                credits: data,
              })
            );
        },
        function (result, callback) {
          axios
            .get(`${BASE_URL}/movie/${result.movieId}/credits`, {
              params: {
                api_key: API_KEY,
              },
            })
            .then(({ data }) =>
              callback(null, { ...result, creditsMovie: data })
            );
        },
      ],
      function (err, result) {
        const allCastPlayers = [];

        allCastPlayers.push(
          ...result.credits.cast
            .splice(0, 5)
            .map((cast) => ({ ...cast, isACast: true }))
        );

        allCastPlayers.push(
          ...result.creditsMovie.cast
            .splice(0, 5)
            .map((cast) => ({ ...cast, isACast: false }))
        );

        allCastPlayers.sort(() => Math.random() - 0.5);

        setCast(allCastPlayers);
        setMovie(result.movie);
        setIsLoading(false);
      }
    );
  }, []);

  if (!movie) {
    return null;
  }

  if (isLoading) {
    return "Movie is loading";
  }

  return (
    <div>
      <GameContainer movie={movie} cast={cast} />
    </div>
  );
};

export default StepTwo;
