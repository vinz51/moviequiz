import { useCallback, useContext, useState } from "react";
import { Button, Header, Icon, Image } from "semantic-ui-react";
import moment from "moment";
import PropTypes from "prop-types";

import { buildImageTMBUrl } from "../../api/helpers";
import { findExternalActor } from "../../api/reducers/helpers";
import GameContext from "../../contexts/game";
import styles from "../../styles/steps.module.css";
import Timer from "../../components/timer";
import TMBContext from "../../contexts/tmb";

export const sortRandomActorFromList = (list = {}, limit = 1) =>
  Object.keys(list)
    .sort(() => Math.random() - 0.5)
    .splice(0, limit);

const StepTwo = ({ nextStep }) => {
  const [index, setIndex] = useState(0);
  const { state, setNextCurrentMovie } = useContext(TMBContext);
  const { addHistoric, randomMovies } = useContext(GameContext);

  const currentMovie = state.movies[state.currentMovie];

  const actor = randomMovies[index]?.needToWin
    ? currentMovie.cast[sortRandomActorFromList(currentMovie.cast)[0]]
    : findExternalActor(state, currentMovie);

  const setNext = useCallback(
    (isGoodAnswer = true) => () => {
      addHistoric({
        movie: currentMovie,
        actor,
        isCorrectAnswer: Boolean(
          isGoodAnswer === randomMovies[index].needToWin
        ),
      });

      const newIndex = index + 1;

      if (!randomMovies[newIndex]) {
        nextStep();
      } else {
        setIndex(newIndex);
        setNextCurrentMovie(randomMovies[newIndex].id);
      }
    },
    [
      setNextCurrentMovie,
      randomMovies,
      index,
      currentMovie,
      actor,
      addHistoric,
      nextStep,
    ]
  );

  return (
    <div>
      <div className={styles.containerHeaderGame}>
        <Image
          src={buildImageTMBUrl(currentMovie.poster_path)}
          alt={`The poster of the movie called ${currentMovie.title}`}
          title={`The poster of the movie called ${currentMovie.title}`}
          rounded
          size="medium"
          className={styles.moviePoster}
        />
        <Header as="h2">
          Did {actor.name} played in {currentMovie.title} in{" "}
          {moment(currentMovie.release_date).format("YYYY")}?
          <Header.Subheader>
            <Icon name="time" />
            <Timer start onCallback={() => nextStep()} />
          </Header.Subheader>
        </Header>

        <Button onClick={setNext()}>Yes</Button>
        <Button onClick={setNext(false)}>No</Button>
      </div>
    </div>
  );
};

StepTwo.propTypes = {
  nextStep: PropTypes.func.isRequired,
};

export default StepTwo;

/**
 * <img
   src={buildImageTMBUrl(currentMovie.poster_path)}
   alt={`The poster of the movie called ${currentMovie.title}`}
   title={`The poster of the movie called ${currentMovie.title}`}
 />
 */
