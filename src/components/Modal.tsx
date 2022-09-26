import React from "react";
import TodoButton from "./TodoButton";

interface ModalModel {
  text: string;
  myFunctDel: () => unknown;
  myFunctCancel: () => unknown;
}

const Modal = ({ text, myFunctDel, myFunctCancel }: ModalModel) => {
  return (
    <div className="modal-card flex flex-col justify-center items-center">
      <div className="mb-[10px]">
        <p>{text}</p>
      </div>
      <div className="flex   w-[60%]">
        <TodoButton
          buttonName="delete"
          buttonColor="red"
          buttonFunction={() => {
            myFunctDel();
          }}
        />
        <TodoButton
          buttonName="cancel"
          buttonColor="green"
          buttonFunction={() => {
            myFunctCancel();
          }}
        />
      </div>
    </div>
  );
};

export default Modal;
