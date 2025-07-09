import { useState } from 'react';
import { BiCheck } from 'react-icons/bi';
export interface StepperCheckProps {
  steps: string[];
  className?: string;
}
const StepperCheck = (props: StepperCheckProps) => {
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
    <div className="flex w-screen flex-col items-center justify-center">
      <div className="flex w-screen items-center justify-center gap-1 px-4">
        {props.steps.map((step, index) => (
          <div className="flex w-[30%] min-w-min flex-col" key={index}>
            <div
              className={`${
                index < 0 ||
                index < currentStep ||
                currentStep === props.steps.length - 1
                  ? 'bg-gray-500 text-white'
                  : 'bg-gray-200 text-gray-600'
                    ? index === currentStep
                      ? 'bg-amber-400 text-white'
                      : 'bg-gray-200 text-gray-600'
                    : ''
              } h-1 w-full rounded-sm`}
            ></div>
            <div className="flex items-center gap-2 pt-1">
              {index < currentStep || currentStep === props.steps.length - 1 ? (
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-500">
                  <BiCheck className="h-9 w-9 text-white" />
                </div>
              ) : <div></div> ? (
                index === currentStep ? (
                  <div className="border-amber-500 h-4 w-4 rounded-full border-[5px]"></div>
                ) : (
                  <div className="h-4 w-4 rounded-full border-2 border-gray-400"></div>
                )
              ) : (
                <div></div>
              )}
              <div className={props.className}>{step}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <div className="mt-4">
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
    </div>
  );
};

export default StepperCheck;
