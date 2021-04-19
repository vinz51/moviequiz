import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { BASE_URL, API_KEY } from "../../../contexts/tmb";

import GameContainer from "../../game/index";

const MoviesManage = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${BASE_URL}/movie/${id}`, {
        params: {
          api_key: API_KEY,
        },
      })
      .then(({ data }) => setMovie(data));

    Promise.all([
      axios.get(`${BASE_URL}/movie/${id}/credits`, {
        params: {
          api_key: API_KEY,
        },
      }),
      axios.get(`${BASE_URL}/movie/324786/credits`, {
        params: {
          api_key: API_KEY,
        },
      }),
    ])
      .then((results) => {
        const allCastPlayers = [];

        allCastPlayers.push(
          ...results[0].data.cast
            .splice(0, 5)
            .map((cast) => ({ ...cast, isACast: true }))
        );

        allCastPlayers.push(
          ...results[1].data.cast
            .splice(0, 5)
            .map((cast) => ({ ...cast, isACast: false }))
        );

        allCastPlayers.sort(() => Math.random() - 0.5);
        setCast(allCastPlayers);
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return "The movie is loading";
  }

  if (!movie || !cast) {
    return "The movie doesn't exist";
  }

  return <GameContainer movie={movie} cast={cast} />;
};

MoviesManage.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default MoviesManage;
