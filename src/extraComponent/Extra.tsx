import React, { useState } from "react";
import FeedbackForm from "../feedbackComponent/FeedbackForm";
import extraModel from "../Types/extraItemsModel";
import extraItems from "../utils/extraItem";
import ExtraItemCards from "./extra items/ExtraItemCards";

const Extra = () => {
  const [showFeedback, setShowFeedback] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center mb-[100px]">
      {/* ---------------- here the boredom killer page ---------------- */}
      <div className="mb-[20px]">Beta page 🙈</div>
      {extraItems.map((items: extraModel) => {
        const { title, short_description, link } = items;
        return (
          <div className="w-[100%] extras">
            <ExtraItemCards
              title={title}
              short_description={short_description}
              link={link}
            />
          </div>
        );
      })}
      {/* ---------------- here the boredom killer page ---------------- */}
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
              (Click Me🔥) I'd love to hear your feedbacks and suggestions!
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Extra;
