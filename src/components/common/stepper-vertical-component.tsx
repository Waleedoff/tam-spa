import React, { useState } from 'react';
import { StepperProps } from 'src/core/types/user.type';
export interface Iitem {
  items: StepperProps[];
}
const StepperVertical = (props: Iitem) => {
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
      <div className="flex flex-col items-center justify-center">
        {props.items.map((step, index) => (
          <div className="flex justify-center gap-2" key={index}>
            <div className="flex flex-col text-left">
              <div className="text-sm">{step.title}</div>
              <div className="text-xs">{step.desription}</div>
            </div>
            <div className="mb-1 flex flex-col items-center justify-center gap-1">
              <div
                className={`${
                  index < 0 ||
                  index < currentStep ||
                  currentStep === props.items.length - 1
                    ? 'bg-amber-500 text-white'
                    : 'border border-gray-400 bg-white text-gray-400'
                      ? index === currentStep
                        ? 'border-amber-500 border text-white'
                        : 'border border-gray-400 bg-white text-gray-400'
                      : ''
                } flex h-8 w-8 cursor-pointer flex-col items-center justify-center rounded-full p-2`}
              >
                {index < currentStep ||
                currentStep === props.items.length - 1 ? (
                  <div>{index + 1}</div>
                ) : <div></div> ? (
                  index === currentStep ? (
                    <div className="bg-amber-500 flex h-6 w-6 items-center justify-center rounded-full">
                      {index + 1}
                    </div>
                  ) : (
                    index + 1
                  )
                ) : (
                  <div></div>
                )}
              </div>
              <div className="">
                {props.items.length - 1 === index ? (
                  <div></div>
                ) : (
                  <div
                    className={`h-8 w-px ${
                      index <= currentStep
                        ? 'border-amber-500 border'
                        : 'border border-gray-400'
                    }`}
                  ></div>
                )}
              </div>
            </div>
            {index < currentStep || currentStep === props.items.length - 1 ? (
              <div className="flex h-8 w-20 items-center justify-center rounded-2xl bg-green-50">
                <div className="text-sx font-wide font-normal tracking-wide text-green-500">
                  Completed
                </div>
              </div>
            ) : <div></div> ? (
              index === currentStep ? (
                <div className="flex h-8 w-20 items-center justify-center rounded-2xl bg-blue-50">
                  <div className="font-['Cairo'] text-[11px] font-normal tracking-wide text-blue-500">
                    In progress
                  </div>
                </div>
              ) : (
                <div className="flex h-[29px] w-[75px] items-center justify-center rounded-[15px] bg-gray-50">
                  <div className="font-['Cairo'] text-[11px] font-normal tracking-wide text-gray-400">
                    Pending
                  </div>
                </div>
              )
            ) : (
              <div></div>
            )}{' '}
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

export default StepperVertical;
