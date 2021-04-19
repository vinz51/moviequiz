import styles from "../../styles/steps.module.css";
import { Header, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";

const StepOne = ({ nextStep }) => (
  <div className={styles.containerHeader}>
    <Header as="h2" icon>
      <div
        role="button"
        tabIndex={0}
        onClick={nextStep}
        className={styles.playIcon}
        onKeyPress={nextStep}
      >
        <Icon name="video play" size="huge" color="teal" />
      </div>
      DaMovie Quiz
      <Header.Subheader>A game to guess them all</Header.Subheader>
    </Header>
  </div>
);

StepOne.propTypes = {
  nextStep: PropTypes.func.isRequired,
};

export default StepOne;
