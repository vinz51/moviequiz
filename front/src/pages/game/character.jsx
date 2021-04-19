import { Button } from "semantic-ui-react";
import PropTypes from "prop-types";

const GameCharacter = ({ cast, onClick }) => (
  <>
    <p>
      Is {cast.name} alias {cast.character} played in this movie ?
    </p>
    <Button onClick={(event) => onClick(event, Boolean(cast.isACast))}>
      Yes
    </Button>
    <Button onClick={(event) => onClick(event, Boolean(cast.isACast))}>
      No
    </Button>
  </>
);

GameCharacter.propTypes = {
  cast: PropTypes.shape({
    character: PropTypes.string.isRequired,
    isACast: PropTypes.bool,
    name: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default GameCharacter;
