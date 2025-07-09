import { useState } from 'react';
import { BiCheck } from 'react-icons/bi';
export interface StepperProps {
  steps: string[];
}
const Stepper = (props: StepperProps) => {
  const [currentStep, setCurrentStep] = useState(-1);
  const handleNext = () => {
    if (currentStep < props.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div>
      {props.steps.map((step, index) => (
        <div key={index}>
          <div className="flex items-center">
            <div
              className={`${
                index < 0 ||
                index < currentStep ||
                currentStep === props.steps.length - 1
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-200 text-gray-600'
                    ? index === currentStep
                      ? 'bg-amber-400 text-white'
                      : 'bg-gray-200 text-gray-600'
                    : ''
              } flex h-6 w-6 cursor-pointer items-center justify-center rounded-full p-2`}
            >
              {index + 1 ? (
                index < currentStep ||
                currentStep === props.steps.length - 1 ? (
                  <div>
                    <BiCheck />
                  </div>
                ) : (
                  index + 1
                )
              ) : (
                <div>
                  <BiCheck />
                </div>
              )}
            </div>
            <div className="px-3">
              {props.steps.length - 1 === index ? (
                <div></div>
              ) : (
                <div
                  className={`${
                    index <= currentStep
                      ? 'border-amber-500 h-px w-14 border border-solid'
                      : 'h-px w-14 border-spacing-52 border border-dashed border-gray-400'
                  }`}
                ></div>
              )}
            </div>
          </div>
          <div className="mt-2">{step}</div>
        </div>
      ))}
      <div className="mt-8">
        {currentStep > 0 && (
          <button
            onClick={handlePrevious}
            className="mr-4 rounded-lg bg-blue-500 px-4 py-2 text-white"
          >
            Previous
          </button>
        )}
        {currentStep < props.steps.length - 1 && (
          <button
            onClick={handleNext}
            className="rounded-lg bg-blue-500 px-4 py-2 text-white"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Stepper;
