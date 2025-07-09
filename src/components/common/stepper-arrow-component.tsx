import { useState } from 'react';
import { StepperProps } from 'src/core/types/user.type';

interface Iitem {
  items: StepperProps[];
}
const StepperArrow = (props: Iitem) => {
  const [currentStep, setCurrentStep] = useState(-1);
  const handleNext = () => {
    if (currentStep < props.items.length - 1) {
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
      <ul className="flex w-screen list-none items-center justify-center px-4">
        {props.items.map((step, index) => (
          <div className="container w-full" key={index}>
            <div
              className={` ${
                index < 0 ||
                index < currentStep ||
                currentStep === props.items.length - 1
                  ? ''
                  : 'bg-amber-600'
                    ? index === currentStep
                      ? 'bg-amber-600'
                      : 'bg-gray-400'
                    : 'bg-gray-400'
              } center3 absolute flex w-[370.9px] rounded`}
            ></div>
            <li
              key={index}
              className={`stepper h-[78px] w-[370px] ${index === props.items.length - 1 ? 'last' : 'first'} ${index !== props.items.length - 1 && index !== 0 ? 'center' : ''} flex cursor-pointer flex-col ${
                index < 0 ||
                index < currentStep ||
                currentStep === props.items.length - 1
                  ? 'bg-gray-500 text-white'
                  : 'border border-gray-400 bg-white'
                    ? index === currentStep
                      ? 'bg-amber-50 text-amber-600 border-amber-600 border'
                      : 'border border-gray-400 bg-white'
                    : ''
              } `}
            >
              <div className="text-left text-sm">{step.title}</div>
              <div className="text-left text-xs">{step.desription}</div>
            </li>
          </div>
        ))}
      </ul>
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
          {currentStep < props.items.length - 1 && (
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

export default StepperArrow;
