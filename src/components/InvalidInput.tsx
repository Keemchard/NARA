import React, { useEffect, useState } from "react";

interface invalidModel {
  text: string;
}
const InvalidInput = ({ text }: invalidModel) => {
  return <div className="text-[#0ED3CF] text-[20px] mb-[10px]">{text}</div>;
};

export default InvalidInput;
