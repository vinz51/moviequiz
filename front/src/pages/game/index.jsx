import PropTypes from "prop-types";
import { useCallback, useState } from "react";
import GameCharacter from "./character";

const GameContainer = ({ cast, movie }) => {
  const [countSucceed, setCountSucceed] = useState(0);
  const [currentCastIndex, setCurrentCastIndex] = useState(0);

  const handleResultClick = useCallback((event, succeed) => {
    if (succeed) {
      window.confirm("success !");
      setCountSucceed((previousSucceed) => previousSucceed + 1);
    } else {
      window.confirm("failed !");
    }

    setCurrentCastIndex((previousCastId) => previousCastId + 1);
  }, []);

  return (
    <>
      <div>
        {movie.original_title} - {movie.id}
      </div>
      {currentCastIndex < cast.length ? (
        <GameCharacter
          cast={cast[currentCastIndex]}
          onClick={handleResultClick}
        />
      ) : (
        <p>
          The game is over and your score is : {countSucceed}/{cast.length}
        </p>
      )}
    </>
  );
};

GameContainer.propTypes = {
  cast: PropTypes.array.isRequired,
  movie: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    original_title: PropTypes.string,
  }).isRequired,
};

export default GameContainer;
