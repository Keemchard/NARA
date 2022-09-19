import React from "react";

const NoteButton = ({
  buttontext,
  buttonWidth,
  buttonHeight,
  buttonRadius,
  btnTextSize,
  buttonFunct,
}: any) => {
  return (
    <button
      className="m-[10px] pl-[10px] pr-[10px] pt-[7px] pb-[7px] border-[yellow] border-solid border-[1px]"
      style={{
        borderRadius: `${buttonRadius}`,
        width: `${buttonWidth}`,
        height: `${buttonHeight}`,
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
