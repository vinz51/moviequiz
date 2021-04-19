import styles from "../../styles/steps.module.css";
import PropTypes from "prop-types";
import { useCallback, useState } from "react";
import GameCharacter from "./character";
import Timer from "../../components/timer";
import { Header } from "semantic-ui-react";

const GameContainer = ({ cast, movie }) => {
  const [countSucceed, setCountSucceed] = useState(0);
  const [currentCastIndex, setCurrentCastIndex] = useState(0);
  const [isOut, setIsOut] = useState(false);
  const [isSucceed, setIsSucceed] = useState(false);

  const handleResultClick = useCallback((event, succeed) => {
    if (succeed) {
      setIsSucceed(true);
      setCountSucceed((previousSucceed) => previousSucceed + 1);
    } else {
      setIsSucceed(false);
    }

    setCurrentCastIndex((previousCastId) => previousCastId + 1);
  }, []);

  return (
    <div>
      <div className={styles.containerHeaderGame}>
        <Header as="h2">
          {movie.original_title}
          <Header.Subheader>{movie.overview}</Header.Subheader>
        </Header>

        {isOut || currentCastIndex < cast.length ? (
          <GameCharacter
            cast={cast[currentCastIndex]}
            onClick={handleResultClick}
          />
        ) : (
          <Header
            as="h3"
            color={
              countSucceed > 7 ? "green" : countSucceed > 3 ? "orange" : "red"
            }
          >
            The game is over and your score is : {countSucceed}/{cast.length}
          </Header>
        )}
        {!isOut &&
          countSucceed > 0 &&
          currentCastIndex < cast.length &&
          (isSucceed ? (
            <Header as="h4" color="green">
              You rock !
            </Header>
          ) : (
            <Header as="h4" color="orange">
              Sorry another time
            </Header>
          ))}
        {currentCastIndex < cast.length && (
          <Timer start onCallback={() => setIsOut(true)} />
        )}
      </div>
    </div>
  );
};

GameContainer.propTypes = {
  cast: PropTypes.array.isRequired,
  movie: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    original_title: PropTypes.string,
    overview: PropTypes.string,
  }).isRequired,
};

export default GameContainer;
