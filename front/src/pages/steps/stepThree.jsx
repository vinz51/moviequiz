import { useCallback, useContext } from "react";
import { Button, Header, List } from "semantic-ui-react";
import PropTypes from "prop-types";

import GameContext from "../../contexts/game";
import styles from "../../styles/steps.module.css";
import TMBContext from "../../contexts/tmb";

export const Historic = () => {
  const { historic } = useContext(GameContext);

  const goodAnswers = (historic || []).filter(
    ({ isCorrectAnswer }) => isCorrectAnswer
  );

  return (
    <>
      <Header as="h2">
        Your score on time was {goodAnswers.length}/{historic.length}
      </Header>
      <List divided relaxed>
        {(historic || []).map(({ movie, actor, isCorrectAnswer }, index) => (
          <List.Item key={index}>
            <List.Icon
              name={isCorrectAnswer ? "check" : "close"}
              verticalAlign="middle"
              color={isCorrectAnswer ? "green" : "red"}
            />
            <List.Content>
              <List.Header>
                The actor <u>{actor.name}</u>{" "}
                {isCorrectAnswer ? "played" : "doesn't played"} in the movie:{" "}
                {movie.title}.
              </List.Header>
            </List.Content>
          </List.Item>
        ))}
      </List>
    </>
  );
};

export const StepContainer = ({ children, goToHomePage }) => {
  const { fetchNextCasts, fetchNextMovies } = useContext(TMBContext);

  const handleClick = useCallback(() => {
    fetchNextCasts();
    fetchNextMovies();
    goToHomePage();
  }, [fetchNextCasts, fetchNextMovies, goToHomePage]);

  return (
    <>
      {children}
      <Button color="teal" onClick={handleClick}>
        Play again ?
      </Button>
    </>
  );
};

StepContainer.propTypes = {
  children: PropTypes.node.isRequired,
  goToHomePage: PropTypes.func.isRequired,
};

const StepThree = (props) => (
  <div>
    <div className={styles.containerHeaderGame}>
      <StepContainer {...props}>
        <Historic />
      </StepContainer>
    </div>
  </div>
);

export default StepThree;
