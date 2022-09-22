import React from "react";

const FeedbackForm = () => {
  return (
    <div className="bg-[#374151] w-[350px]">
      <form
        name="contact"
        method="post"
        className="p-[10px] flex flex-col items-center"
      >
        <input type="hidden" name="form-name" value="contact" />
        <p className="mb-[10px] w-[100%]">
          <input
            placeholder="Name"
            className="bg-[#1F2937] p-[7px] w-[100%]"
            type="text"
            name="name"
          />
        </p>
        <p className="mb-[10px] w-[100%]">
          <input
            placeholder="Email"
            className="bg-[#1F2937] p-[7px]  w-[100%]"
            type="email"
            name="email"
          />
        </p>
        <p className="mb-[10px]">
          <div> FeedBack</div>
          <textarea
            rows={10}
            cols={40}
            className="bg-[#1F2937] p-[7px]"
            name="feedback"
          ></textarea>
        </p>
        <p className="mb-[10px]">
          <button
            className="border-[2px] border-solid border-[#0ED3CF] rounded p-[5px] w-[100px]"
            type="submit"
          >
            Send
          </button>
        </p>
      </form>
    </div>
  );
};

export default FeedbackForm;
