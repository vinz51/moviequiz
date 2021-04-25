import styles from "../../styles/steps.module.css";
import { useCallback, useState } from "react";

import StepOne from "./stepOne";
import StepTwo from "./stepTwo";
import StepThree from "./stepThree";

const steps = [
  {
    component: StepOne,
  },
  {
    component: StepTwo,
  },
  {
    component: StepThree,
  },
];

const MainSteps = () => {
  const [step, setStep] = useState(0);

  const nextStep = useCallback(
    () => setStep((previousStep) => previousStep + 1),
    []
  );

  const goToHomePage = useCallback(() => setStep(0), []);

  const Component = steps[step].component;

  return (
    <div className={styles.container}>
      <Component nextStep={nextStep} goToHomePage={goToHomePage} />
    </div>
  );
};

export default MainSteps;
