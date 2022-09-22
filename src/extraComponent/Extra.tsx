import React, { useState } from "react";
import FeedbackForm from "../feedbackComponent/FeedbackForm";

const Extra = () => {
  const [showFeedback, setShowFeedback] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center mb-[100px]">
      <div className="mb-[20px]">Coming soon 🔥, Just wait lol</div>
      <div>
        {showFeedback ? (
          <div>
            <FeedbackForm />
            <div className="text-[13px] text-center text-[#0ED3CF] mt-2">
              <button
                onClick={() => {
                  setShowFeedback(!showFeedback);
                }}
              >
                close form
              </button>
            </div>
          </div>
        ) : (
          <div className="text-[13px]  text-[#0ED3CF] mb-3">
            <button
              onClick={() => {
                setShowFeedback(!showFeedback);
              }}
            >
              I want to here your feedback and suggestions!
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Extra;
