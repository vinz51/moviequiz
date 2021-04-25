import styles from "../../styles/steps.module.css";
import { Header, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";
import { useContext, useEffect, useRef } from "react";

import GameContext from "../../contexts/game";
import TMBContext from "../../contexts/tmb";

const StepOne = ({ nextStep }) => {
  const { initializeGame } = useContext(GameContext);
  const { state } = useContext(TMBContext);
  const initialiseGameRef = useRef(false);

  useEffect(() => {
    if (state.movies && !state.moviesLoading && !initialiseGameRef.current) {
      initializeGame();
      initialiseGameRef.current = true;
    }
  }, [state, initializeGame]);

  return (
    <div className={styles.containerHeader}>
      <Header as="h2" icon>
        <>
          <div
            role="button"
            tabIndex={0}
            onClick={!state?.moviesLoading ? nextStep : undefined}
            className={styles.playIcon}
            onKeyPress={!state?.moviesLoading ? nextStep : undefined}
          >
            <Icon name="video play" size="huge" color="teal" />
          </div>
          DaMovie Quiz
          <Header.Subheader>A game to guess them all</Header.Subheader>
          {state?.moviesLoading ?? (
            <Header.Subheader>Please wait, the game loading</Header.Subheader>
          )}
        </>
      </Header>
    </div>
  );
};

StepOne.propTypes = {
  nextStep: PropTypes.func.isRequired,
};

export default StepOne;
