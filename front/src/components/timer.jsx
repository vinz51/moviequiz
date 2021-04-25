import { useEffect, useState } from "react";
import moment from "moment";
import PropTypes from "prop-types";

let intervalID = -1;

const Timer = ({ onCallback, duration, delay, start }) => {
  const [time, setTime] = useState(moment.duration(duration));

  useEffect(() => {
    if (start) {
      intervalID = setInterval(() => {
        if (time.asSeconds() === 0) {
          clearInterval(intervalID);

          if (onCallback) {
            onCallback();
          }
        } else {
          setTime((previousTime) =>
            moment.duration(previousTime.asSeconds() - 1, "seconds")
          );
        }
      }, delay);
    }

    return () => clearInterval(intervalID);
  }, [time, delay, start, onCallback]);

  return time.asSeconds();
};

Timer.propTypes = {
  delay: PropTypes.number,
  duration: PropTypes.object,
  onCallback: PropTypes.func,
  start: PropTypes.bool,
};

Timer.defaultProps = {
  delay: 1000,
  duration: {
    minutes: 1,
  },
  onCallback: null,
  start: false,
};

export default Timer;
