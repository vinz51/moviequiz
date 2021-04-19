import styles from "../../styles/steps.module.css";
import { useCallback, useState } from "react";

import StepOne from "./stepOne";
import StepTwo from "./stepTwo";

const steps = [
  {
    component: StepOne,
  },
  {
    component: StepTwo,
  },
];

const MainSteps = () => {
  const [step, setStep] = useState(0);

  const nextStep = useCallback(
    () => setStep((previousStep) => previousStep + 1),
    []
  );

  const Component = steps[step].component;

  return (
    <div className={styles.container}>
      <Component nextStep={nextStep} />
    </div>
  );
};

export default MainSteps;
