import React from "react";

const NoteButton = ({
  buttontext,
  buttonWidth,
  buttonHeight,
  buttonRadius,
  btnTextSize,
  buttonFunct,
  buttonColor,
}: any) => {
  return (
    <button
      className=" mr-[10px] mt-[10x] mb-[10px] pl-[9px] pr-[9px] pt-[4px] pb-[4px] border-[#0ED3CF] border-solid border-[2px]"
      style={{
        borderRadius: `${buttonRadius}`,
        width: `${buttonWidth}`,
        height: `${buttonHeight}`,
        backgroundColor: `${buttonColor}`,
      }}
      onClick={() => {
        buttonFunct();
      }}
    >
      <p style={{ fontSize: `${btnTextSize}` }}>{buttontext}</p>
    </button>
  );
};

export default NoteButton;
